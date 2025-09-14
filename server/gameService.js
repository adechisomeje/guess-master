/**
 * Game Service - Server-authoritative game logic
 * Handles game creation, state management, and guess validation
 */

// TODO: Replace with MongoDB/Redis for persistence
const gameStore = new Map(); // gameId -> GameSession

// Theme Registry (copied from client for server validation)
const ThemeRegistry = {
    colors: {
        name: "Colors",
        icon: "🎨",
        rarity: "common",
        items: [
            {id: "red", label: "Red", color: "#e74c3c"},
            {id: "blue", label: "Blue", color: "#3498db"},
            {id: "green", label: "Green", color: "#2ecc71"},
            {id: "yellow", label: "Yellow", color: "#f1c40f"},
            {id: "purple", label: "Purple", color: "#9b59b6"},
            {id: "orange", label: "Orange", color: "#e67e22"}
        ]
    },
    fruits: {
        name: "Fruits",
        icon: "🍎",
        rarity: "common",
        items: [
            {id: "apple", label: "Apple", emoji: "🍎", color: "#c0392b"},
            {id: "banana", label: "Banana", emoji: "🍌", color: "#f1c40f"},
            {id: "orange", label: "Orange", emoji: "🍊", color: "#e67e22"},
            {id: "grape", label: "Grape", emoji: "🍇", color: "#9b59b6"}
        ]
    }
};

/**
 * Create a new game session
 * @param {Object} config
 * @param {string} config.mode - Game mode (Classic, Limited, TimeAttack)
 * @param {number} config.slots - Number of slots (3-8)
 * @param {string} config.theme - Theme ID
 * @returns {Object} Game creation result
 */
function createGame({ mode = 'Classic', slots = 4, theme = 'colors' }) {
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get theme and build item pool
    const selectedTheme = ThemeRegistry[theme] || ThemeRegistry.colors;
    const itemPool = selectedTheme.items.slice(0, Math.min(slots + 2, selectedTheme.items.length));
    
    // Generate secret arrangement
    const arrangement = [];
    for (let i = 0; i < slots; i++) {
        const randomItem = itemPool[Math.floor(Math.random() * itemPool.length)];
        arrangement.push(randomItem);
    }
    
    const gameSession = {
        gameId,
        mode,
        slots,
        theme,
        itemPool,
        arrangement, // Server-only secret
        locked: new Array(slots).fill(false),
        players: [],
        status: 'waiting',
        createdAt: Date.now()
    };
    
    gameStore.set(gameId, gameSession);
    
    console.log(`Created game ${gameId} with ${slots} slots, theme: ${theme}, mode: ${mode}`);
    
    return {
        gameId,
        snapshot: getSnapshot(gameId)
    };
}

/**
 * Add a player to a game
 * @param {string} gameId
 * @param {Object} player
 * @returns {boolean} Success
 */
function addPlayer(gameId, player) {
    const game = gameStore.get(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    
    if (game.status === 'ended') {
        throw new Error('Game has ended');
    }
    
    // Check if player already in game
    const existingPlayer = game.players.find(p => p.playerId === player.playerId);
    if (existingPlayer) {
        // Update socket ID for reconnection
        existingPlayer.socketId = player.socketId;
        console.log(`Player ${player.username} reconnected to game ${gameId}`);
        return true;
    }
    
    // Add new player
    game.players.push({
        ...player,
        score: 0
    });
    
    // Start game if we have players
    if (game.status === 'waiting' && game.players.length > 0) {
        game.status = 'active';
        console.log(`Game ${gameId} started with ${game.players.length} player(s)`);
    }
    
    return true;
}

/**
 * Remove a player from a game
 * @param {string} gameId
 * @param {string} playerId
 */
function removePlayer(gameId, playerId) {
    const game = gameStore.get(gameId);
    if (!game) return;
    
    const playerIndex = game.players.findIndex(p => p.playerId === playerId);
    if (playerIndex !== -1) {
        game.players.splice(playerIndex, 1);
        console.log(`Player ${playerId} removed from game ${gameId}`);
        
        // End game if no players left
        if (game.players.length === 0 && game.status === 'active') {
            game.status = 'ended';
            game.endedAt = Date.now();
        }
    }
}

/**
 * Process a player's guess
 * @param {Object} guess
 * @param {string} guess.gameId
 * @param {string} guess.playerId
 * @param {number} guess.slotIndex
 * @param {string} guess.itemId
 * @returns {Object} Guess result
 */
function tryGuess({ gameId, playerId, slotIndex, itemId }) {
    const game = gameStore.get(gameId);
    if (!game) {
        return { success: false, error: 'Game not found' };
    }
    
    if (game.status !== 'active') {
        return { success: false, error: 'Game is not active' };
    }
    
    const player = game.players.find(p => p.playerId === playerId);
    if (!player) {
        return { success: false, error: 'Player not in game' };
    }
    
    // Validate slot index
    if (slotIndex < 0 || slotIndex >= game.slots) {
        return { success: false, error: 'Invalid slot index' };
    }
    
    // Check if slot is already locked
    if (game.locked[slotIndex]) {
        return { success: false, error: 'Slot already solved' };
    }
    
    // Validate item exists in pool
    const itemExists = game.itemPool.some(item => item.id === itemId);
    if (!itemExists) {
        return { success: false, error: 'Invalid item' };
    }
    
    // Check guess against arrangement
    const correctItem = game.arrangement[slotIndex];
    const isCorrect = correctItem.id === itemId;
    
    if (isCorrect) {
        // Lock the slot
        game.locked[slotIndex] = true;
        
        // Award points
        const points = 10; // Base points, could be more sophisticated
        player.score += points;
        
        console.log(`Correct guess by ${player.username}: slot ${slotIndex} = ${itemId}`);
    } else {
        console.log(`Wrong guess by ${player.username}: slot ${slotIndex} = ${itemId} (correct: ${correctItem.id})`);
    }
    
    // Check if all slots are solved
    const allSolved = game.locked.every(locked => locked);
    let gameEnded = false;
    
    if (allSolved) {
        game.status = 'ended';
        game.endedAt = Date.now();
        gameEnded = true;
        console.log(`Game ${gameId} completed - all slots solved`);
    }
    
    return {
        success: true,
        correct: isCorrect,
        lockedSlots: game.locked.map((locked, index) => locked ? index : -1).filter(i => i !== -1),
        score: player.score,
        scores: game.players.map(p => ({ playerId: p.playerId, username: p.username, score: p.score })),
        gameEnded
    };
}

/**
 * Get sanitized game snapshot (without arrangement)
 * @param {string} gameId
 * @returns {Object} Game snapshot
 */
function getSnapshot(gameId) {
    const game = gameStore.get(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    
    return {
        gameId: game.gameId,
        mode: game.mode,
        theme: game.theme,
        slots: game.slots,
        itemPool: game.itemPool, // Available items (no secret arrangement)
        locked: game.locked,
        scores: game.players.map(p => ({ 
            playerId: p.playerId, 
            username: p.username, 
            score: p.score 
        })),
        status: game.status,
        playerCount: game.players.length
    };
}

/**
 * End a game and compute final results
 * @param {string} gameId
 * @returns {Object} Game end result
 */
function endGame(gameId) {
    const game = gameStore.get(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    
    game.status = 'ended';
    game.endedAt = Date.now();
    
    // Sort players by score
    const scoreboard = game.players
        .map(p => ({ playerId: p.playerId, username: p.username, score: p.score }))
        .sort((a, b) => b.score - a.score);
    
    const winner = scoreboard[0] || null;
    
    // TODO: Add to MongoDB for persistence/stats
    console.log(`Game ${gameId} ended. Final scores:`, scoreboard);
    
    return {
        gameId,
        winner,
        scoreboard,
        arrangement: game.arrangement // Reveal the secret arrangement
    };
}

/**
 * Get game by ID
 * @param {string} gameId
 * @returns {Object|null} Game session
 */
function getGame(gameId) {
    return gameStore.get(gameId) || null;
}

/**
 * Clean up old games (run periodically)
 */
function cleanupOldGames() {
    const now = Date.now();
    const maxAge = 2 * 60 * 60 * 1000; // 2 hours
    
    for (const [gameId, game] of gameStore.entries()) {
        const age = now - game.createdAt;
        if (age > maxAge || (game.status === 'ended' && game.endedAt && (now - game.endedAt) > 30 * 60 * 1000)) {
            gameStore.delete(gameId);
            console.log(`Cleaned up old game: ${gameId}`);
        }
    }
}

// Run cleanup every 30 minutes
setInterval(cleanupOldGames, 30 * 60 * 1000);

module.exports = {
    createGame,
    addPlayer,
    removePlayer,
    tryGuess,
    getSnapshot,
    endGame,
    getGame,
    cleanupOldGames
};
