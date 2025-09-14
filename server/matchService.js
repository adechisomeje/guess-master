/**
 * Match Service - Matchmaking for multiplayer games
 * Handles queue management and game creation
 */

const gameService = require('./gameService');

// In-memory matchmaking queue
// TODO: Replace with Redis for scalability
const matchQueue = new Map(); // mode -> array of MatchTickets

/**
 * Add player to matchmaking queue
 * @param {Object} ticket
 * @param {string} ticket.playerId
 * @param {string} ticket.username
 * @param {string} ticket.mode - Game mode
 * @param {Object} ticket.preferences - Game preferences
 * @returns {string} Ticket ID
 */
function enqueuePlayer(ticket) {
    const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const matchTicket = {
        ticketId,
        playerId: ticket.playerId,
        username: ticket.username,
        mode: ticket.mode || 'Classic',
        preferences: {
            slots: ticket.preferences?.slots || 4,
            theme: ticket.preferences?.theme || 'colors',
            maxPlayers: ticket.preferences?.maxPlayers || 1
        },
        queuedAt: Date.now(),
        status: 'queued'
    };
    
    // Add to appropriate queue
    if (!matchQueue.has(matchTicket.mode)) {
        matchQueue.set(matchTicket.mode, []);
    }
    
    matchQueue.get(matchTicket.mode).push(matchTicket);
    
    console.log(`Player ${ticket.username} queued for ${matchTicket.mode} mode (ticket: ${ticketId})`);
    
    // Try to create a match immediately
    tryCreateMatch(matchTicket.mode);
    
    return ticketId;
}

/**
 * Remove player from queue
 * @param {string} ticketId
 * @returns {boolean} Success
 */
function dequeuePlayer(ticketId) {
    for (const [mode, queue] of matchQueue.entries()) {
        const ticketIndex = queue.findIndex(t => t.ticketId === ticketId);
        if (ticketIndex !== -1) {
            const ticket = queue[ticketIndex];
            queue.splice(ticketIndex, 1);
            console.log(`Player ${ticket.username} removed from ${mode} queue`);
            return true;
        }
    }
    return false;
}

/**
 * Get ticket status
 * @param {string} ticketId
 * @returns {Object|null} Ticket info
 */
function getTicketStatus(ticketId) {
    for (const queue of matchQueue.values()) {
        const ticket = queue.find(t => t.ticketId === ticketId);
        if (ticket) {
            return {
                ticketId: ticket.ticketId,
                status: ticket.status,
                gameId: ticket.gameId || null,
                queuePosition: queue.indexOf(ticket) + 1,
                estimatedWait: calculateEstimatedWait(ticket.mode)
            };
        }
    }
    return null;
}

/**
 * Try to create a match from queued players
 * @param {string} mode
 */
function tryCreateMatch(mode) {
    const queue = matchQueue.get(mode) || [];
    if (queue.length === 0) return;
    
    // For now, just start games immediately (1 player per game)
    // TODO: Implement proper matchmaking logic for multiplayer
    
    const ticket = queue.shift(); // Take first player
    
    try {
        // Create game with player preferences
        const { gameId, snapshot } = gameService.createGame({
            mode: ticket.mode,
            slots: ticket.preferences.slots,
            theme: ticket.preferences.theme
        });
        
        // Update ticket
        ticket.status = 'matched';
        ticket.gameId = gameId;
        ticket.matchedAt = Date.now();
        
        console.log(`Match created: ${ticket.username} -> game ${gameId}`);
        
        // Return match info for socket notification
        return {
            ticketId: ticket.ticketId,
            gameId,
            snapshot
        };
        
    } catch (error) {
        console.error('Failed to create match:', error);
        ticket.status = 'error';
        ticket.error = error.message;
    }
}

/**
 * Calculate estimated wait time (rough estimation)
 * @param {string} mode
 * @returns {number} Estimated wait in seconds
 */
function calculateEstimatedWait(mode) {
    const queue = matchQueue.get(mode) || [];
    // Simple estimation: 30 seconds per player ahead in queue
    return queue.length * 30;
}

/**
 * Get queue statistics
 * @returns {Object} Queue stats
 */
function getQueueStats() {
    const stats = {};
    
    for (const [mode, queue] of matchQueue.entries()) {
        stats[mode] = {
            playersQueued: queue.length,
            averageWait: calculateEstimatedWait(mode),
            oldestTicket: queue.length > 0 ? Date.now() - queue[0].queuedAt : 0
        };
    }
    
    return stats;
}

/**
 * Clean up old tickets
 */
function cleanupOldTickets() {
    const now = Date.now();
    const maxAge = 10 * 60 * 1000; // 10 minutes
    
    for (const [mode, queue] of matchQueue.entries()) {
        const before = queue.length;
        
        // Remove old tickets
        const validTickets = queue.filter(ticket => {
            const age = now - ticket.queuedAt;
            return age < maxAge;
        });
        
        matchQueue.set(mode, validTickets);
        
        if (validTickets.length < before) {
            console.log(`Cleaned up ${before - validTickets.length} old tickets from ${mode} queue`);
        }
    }
}

/**
 * Process matchmaking batch (run periodically)
 */
function processMatchmaking() {
    for (const mode of matchQueue.keys()) {
        tryCreateMatch(mode);
    }
}

// Run cleanup every 5 minutes
setInterval(cleanupOldTickets, 5 * 60 * 1000);

// Run matchmaking every 10 seconds
setInterval(processMatchmaking, 10 * 1000);

module.exports = {
    enqueuePlayer,
    dequeuePlayer,
    getTicketStatus,
    tryCreateMatch,
    getQueueStats,
    cleanupOldTickets,
    processMatchmaking
};
