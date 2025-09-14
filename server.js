require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const gameService = require('./server/gameService');
const matchService = require('./server/matchService');

const app = express();
const server = http.createServer(app);

// CORS configuration for development
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Matchmaking endpoints
app.post('/match/enqueue', (req, res) => {
  const { mode, username, preferences } = req.body;
  const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const ticketId = matchService.enqueuePlayer({ 
      playerId, 
      username, 
      mode: mode || 'Classic',
      preferences: preferences || {}
    });
    
    console.log(`Player ${username} (${playerId}) enqueued for ${mode} mode`);
    res.json({ ticketId, playerId });
  } catch (error) {
    console.error('Enqueue error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/match/ticket/:id', (req, res) => {
  const ticket = matchService.getTicketStatus(req.params.id);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.json(ticket);
});

app.delete('/match/ticket/:id', (req, res) => {
  const success = matchService.dequeuePlayer(req.params.id);
  res.json({ success });
});

app.get('/match/stats', (req, res) => {
  const stats = matchService.getQueueStats();
  res.json(stats);
});

// Socket.io setup
const io = socketIo(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

// Game namespace
const gameNamespace = io.of('/game');

// Rate limiting: max 8 guesses per second per player
const rateLimiter = new Map();
const RATE_LIMIT = 8; // guesses per second
const RATE_WINDOW = 1000; // 1 second

function isRateLimited(playerId) {
  const now = Date.now();
  const playerLimits = rateLimiter.get(playerId) || { count: 0, resetTime: now + RATE_WINDOW };
  
  if (now > playerLimits.resetTime) {
    playerLimits.count = 0;
    playerLimits.resetTime = now + RATE_WINDOW;
  }
  
  if (playerLimits.count >= RATE_LIMIT) {
    return true;
  }
  
  playerLimits.count++;
  rateLimiter.set(playerId, playerLimits);
  return false;
}

gameNamespace.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  let playerId = null;
  let username = null;
  
  // Require authentication first
  socket.emit('auth_required');

  // Handle authentication
  socket.on('authenticate', ({ playerId: clientPlayerId, username: clientUsername, token }) => {
    try {
      // Simple authentication - in production, validate token
      playerId = clientPlayerId || `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      username = clientUsername || `Player${Math.floor(Math.random() * 1000)}`;
      
      socket.playerId = playerId;
      socket.username = username;
      socket.authenticated = true;
      
      socket.emit('authenticated', { playerId, username });
      console.log(`Player authenticated: ${username} (${playerId})`);
    } catch (error) {
      socket.emit('auth_error', { message: error.message });
    }
  });

  // Middleware to check authentication
  const requireAuth = (handler) => {
    return (...args) => {
      if (!socket.authenticated) {
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      handler(...args);
    };
  };

  // Handle matchmaking
  socket.on('find_match', requireAuth(({ preferences }) => {
    try {
      const ticketId = matchService.enqueuePlayer({
        playerId: socket.playerId,
        username: socket.username,
        mode: preferences.mode || 'Classic',
        preferences: preferences || {}
      });
      
      socket.ticketId = ticketId;
      socket.emit('match_queued', { ticketId });
      
      // Try to create a match immediately
      const matchResult = matchService.tryCreateMatch(preferences.mode || 'Classic');
      if (matchResult && matchResult.ticketId === ticketId) {
        socket.emit('match_found', { gameId: matchResult.gameId });
      }
      
    } catch (error) {
      socket.emit('match_error', { message: error.message });
    }
  }));

  // Handle join game
  socket.on('join_game', requireAuth(async ({ gameId, playerId: clientPlayerId, username: clientUsername }) => {
    try {
      console.log(`Player ${socket.username} joining game ${gameId}`);
      
      // Leave previous game if any
      if (socket.currentGameId) {
        socket.leave(socket.currentGameId);
        gameService.removePlayer(socket.currentGameId, socket.playerId);
      }
      
      // Join new game room
      socket.join(gameId);
      socket.currentGameId = gameId;
      
      // Add player to game
      const success = gameService.addPlayer(gameId, { 
        playerId: socket.playerId, 
        username: socket.username, 
        socketId: socket.id 
      });
      
      if (success) {
        // Send current game state
        const snapshot = gameService.getSnapshot(gameId);
        socket.emit('game_joined', { gameId, snapshot });
        
        // Notify room about new player
        socket.to(gameId).emit('player_joined', { 
          playerId: socket.playerId, 
          username: socket.username 
        });
        
        console.log(`Player ${socket.username} successfully joined game ${gameId}`);
      } else {
        socket.emit('game_error', { message: 'Failed to join game' });
      }
    } catch (error) {
      console.error('Join game error:', error);
      socket.emit('game_error', { message: error.message });
    }
  }));
  // Handle player guess
  socket.on('player_guess', requireAuth(async ({ gameId, slotIndex, itemId }) => {
    try {
      // Rate limiting
      if (isRateLimited(socket.playerId)) {
        socket.emit('guess_error', { message: 'Rate limit exceeded' });
        return;
      }
      
      console.log(`Player ${socket.playerId} guessing slot ${slotIndex} = ${itemId} in game ${gameId}`);
      
      const result = gameService.tryGuess({ 
        gameId, 
        playerId: socket.playerId, 
        slotIndex, 
        itemId 
      });
      
      if (result.success) {
        // Send result to the guesser
        socket.emit('guess_result', {
          success: true,
          correct: result.correct,
          slotIndex,
          itemId,
          lockedSlots: result.lockedSlots,
          score: result.score,
          gameEnded: result.gameEnded
        });
        
        // Send score update to all players in the game
        gameNamespace.to(gameId).emit('score_update', {
          gameId,
          scores: result.scores
        });
        
        // Check if game ended
        if (result.gameEnded) {
          const endResult = gameService.endGame(gameId);
          gameNamespace.to(gameId).emit('game_ended', endResult);
          console.log(`Game ${gameId} ended. Winner: ${endResult.winner?.username || 'None'}`);
        }
      } else {
        socket.emit('guess_result', { 
          success: false, 
          error: result.error 
        });
      }
    } catch (error) {
      console.error('Guess error:', error);
      socket.emit('guess_result', { 
        success: false, 
        error: error.message 
      });
    }
  }));

  // Handle leave game
  socket.on('leave_game', requireAuth(({ gameId }) => {
    if (socket.currentGameId === gameId) {
      console.log(`Player ${socket.playerId} leaving game ${gameId}`);
      socket.leave(gameId);
      gameService.removePlayer(gameId, socket.playerId);
      socket.currentGameId = null;
      
      // Notify room
      socket.to(gameId).emit('player_left', { 
        playerId: socket.playerId, 
        username: socket.username 
      });
    }
  }));

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id} (${socket.playerId})`);
    
    if (socket.currentGameId) {
      gameService.removePlayer(socket.currentGameId, socket.playerId);
      socket.to(socket.currentGameId).emit('player_left', { 
        playerId: socket.playerId, 
        username: socket.username 
      });
    }
    
    // Clean up rate limiter
    if (socket.playerId) {
      rateLimiter.delete(socket.playerId);
    }
    
    // Clean up matchmaking if queued
    if (socket.ticketId) {
      matchService.dequeuePlayer(socket.ticketId);
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎯 Guess Master server running on port ${PORT}`);
  console.log(`🌐 Game available at http://localhost:${PORT}`);
  console.log(`🔗 Socket.io namespace: /game`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { app, server, io };
