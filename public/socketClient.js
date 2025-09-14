/**
 * Socket.io Client for Guess Master Multiplayer
 * Handles real-time communication with the game server
 */

class SocketClient {
    constructor(game) {
        this.game = game;
        this.socket = null;
        this.gameId = null;
        this.playerId = null;
        this.ticketId = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
    }

    connect() {
        try {
            // Connect to the game namespace
            this.socket = io('/game', {
                transports: ['websocket', 'polling'],
                timeout: 10000,
                forceNew: true
            });

            this.bindSocketEvents();
            this.game.updateConnectionStatus('connecting', 'Connecting...');
            
        } catch (error) {
            console.error('Failed to initialize socket connection:', error);
            this.game.updateConnectionStatus('disconnected', 'Connection failed');
            this.game.showMessage('Failed to connect to server', 'error');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.gameId = null;
        this.playerId = null;
        this.ticketId = null;
        this.game.updateConnectionStatus('disconnected', 'Disconnected');
    }

    bindSocketEvents() {
        // Connection events
        this.socket.on('connect', () => {
            console.log('Connected to game server');
            this.reconnectAttempts = 0;
            this.game.updateConnectionStatus('connected', 'Connected');
            this.game.showMessage('Connected to server!', 'success');
            
            // Generate player ID if not exists
            if (!this.playerId) {
                this.playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            this.game.updateConnectionStatus('disconnected', 'Disconnected');
            this.game.showMessage('Connection lost. Attempting to reconnect...', 'warning');
            
            // Attempt to reconnect
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.connect();
                }, this.reconnectDelay * this.reconnectAttempts);
            } else {
                this.game.showMessage('Failed to reconnect. Please refresh the page.', 'error');
            }
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            this.game.updateConnectionStatus('disconnected', 'Connection error');
            this.game.showMessage('Unable to connect to server', 'error');
        });

        // Authentication events
        this.socket.on('auth_required', () => {
            console.log('Authentication required');
            this.authenticate();
        });

        this.socket.on('authenticated', (data) => {
            console.log('Authenticated successfully:', data);
            this.game.showMessage('Authenticated successfully!', 'success');
        });

        this.socket.on('auth_error', (error) => {
            console.error('Authentication error:', error);
            this.game.showMessage(`Authentication failed: ${error.message}`, 'error');
        });

        // Matchmaking events
        this.socket.on('match_found', (data) => {
            console.log('Match found:', data);
            this.gameId = data.gameId;
            this.game.showMessage('Match found! Joining game...', 'success');
            this.joinGame(data.gameId);
        });

        this.socket.on('match_error', (error) => {
            console.error('Matchmaking error:', error);
            this.game.showMessage(`Matchmaking failed: ${error.message}`, 'error');
        });

        // Game events
        this.socket.on('game_joined', (data) => {
            console.log('Joined game:', data);
            this.gameId = data.gameId;
            this.updateGameFromSnapshot(data.snapshot);
            this.game.showMessage('Joined game successfully!', 'success');
        });

        this.socket.on('game_snapshot', (snapshot) => {
            console.log('Game snapshot received:', snapshot);
            this.updateGameFromSnapshot(snapshot);
        });

        this.socket.on('guess_result', (result) => {
            console.log('Guess result:', result);
            this.handleGuessResult(result);
        });

        this.socket.on('game_ended', (data) => {
            console.log('Game ended:', data);
            this.handleGameEnd(data);
        });

        this.socket.on('player_joined', (data) => {
            console.log('Player joined:', data);
            this.game.showMessage(`${data.username} joined the game`, 'info');
        });

        this.socket.on('player_left', (data) => {
            console.log('Player left:', data);
            this.game.showMessage(`${data.username} left the game`, 'info');
        });

        // Error handling
        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
            this.game.showMessage(`Server error: ${error.message}`, 'error');
        });

        this.socket.on('game_error', (error) => {
            console.error('Game error:', error);
            this.game.showMessage(`Game error: ${error.message}`, 'error');
        });
    }

    authenticate() {
        if (!this.socket || !this.playerId) return;

        const username = localStorage.getItem('guessMaster_username') || 
                        `Player${Math.floor(Math.random() * 1000)}`;
        
        console.log('Authenticating as:', username);
        
        this.socket.emit('authenticate', {
            playerId: this.playerId,
            username: username,
            token: null // No token-based auth for now
        });
    }

    findMatch(preferences = {}) {
        if (!this.socket || !this.playerId) {
            this.game.showMessage('Not connected to server', 'error');
            return;
        }

        const defaultPreferences = {
            mode: this.game.getCurrentMode(),
            slots: this.game.numSlots,
            theme: this.game.themeManager.activeTheme,
            maxPlayers: 1 // Single player for now
        };

        const matchPreferences = { ...defaultPreferences, ...preferences };
        
        console.log('Finding match with preferences:', matchPreferences);
        this.game.showMessage('Finding match...', 'info');
        
        this.socket.emit('find_match', {
            playerId: this.playerId,
            preferences: matchPreferences
        });
    }

    joinGame(gameId) {
        if (!this.socket || !this.playerId) {
            this.game.showMessage('Not connected to server', 'error');
            return;
        }

        console.log('Joining game:', gameId);
        
        const username = localStorage.getItem('guessMaster_username') || 
                        `Player${Math.floor(Math.random() * 1000)}`;
        
        this.socket.emit('join_game', {
            gameId: gameId,
            playerId: this.playerId,
            username: username
        });
    }

    sendGuess(slotIndex, itemId) {
        if (!this.socket || !this.gameId || !this.playerId) {
            this.game.showMessage('Not connected to game', 'error');
            return;
        }

        console.log('Sending guess:', { slotIndex, itemId });
        
        this.socket.emit('player_guess', {
            gameId: this.gameId,
            playerId: this.playerId,
            slotIndex: slotIndex,
            itemId: itemId
        });
    }

    leaveGame() {
        if (!this.socket || !this.gameId || !this.playerId) return;

        console.log('Leaving game:', this.gameId);
        
        this.socket.emit('leave_game', {
            gameId: this.gameId,
            playerId: this.playerId
        });
        
        this.gameId = null;
    }

    updateGameFromSnapshot(snapshot) {
        if (!snapshot) return;

        console.log('Updating game from snapshot:', snapshot);
        
        // Update game state
        if (snapshot.mode) {
            const modeIndex = this.game.modes.indexOf(snapshot.mode);
            if (modeIndex !== -1) {
                this.game.currentModeIndex = modeIndex;
            }
        }
        
        if (snapshot.theme) {
            this.game.themeManager.setActive(snapshot.theme);
        }
        
        if (snapshot.slots) {
            this.game.numSlots = snapshot.slots;
        }
        
        if (snapshot.itemPool) {
            this.game.itemPool = snapshot.itemPool;
            this.game.allChips = [...snapshot.itemPool];
        }
        
        if (snapshot.locked) {
            this.game.solvedSlots = [...snapshot.locked];
        }
        
        // Update UI
        this.game.createSlots();
        this.game.createColorPalette();
        this.game.updateAllDisplays();
        
        // Update solved slots display
        if (snapshot.locked) {
            snapshot.locked.forEach((isLocked, index) => {
                if (isLocked && snapshot.itemPool) {
                    // Find the correct item for this slot (server should provide this)
                    const slot = document.querySelector(`[data-slot="${index}"]`);
                    if (slot) {
                        slot.classList.add('solved');
                    }
                }
            });
        }
        
        // Update scores if provided
        if (snapshot.scores) {
            const myScore = snapshot.scores.find(s => s.playerId === this.playerId);
            if (myScore) {
                this.game.score = myScore.score;
                this.game.updateScoreDisplay();
            }
            
            // Show other players' scores
            const otherPlayers = snapshot.scores.filter(s => s.playerId !== this.playerId);
            if (otherPlayers.length > 0) {
                const scoresText = otherPlayers.map(p => `${p.username}: ${p.score}`).join(', ');
                this.game.showMessage(`Other players: ${scoresText}`, 'info');
            }
        }
    }

    handleGuessResult(result) {
        console.log('Handling guess result:', result);
        
        if (result.success) {
            if (result.correct) {
                // Find the item from our item pool
                const item = this.game.allChips.find(item => item.id === result.itemId);
                if (item) {
                    this.game.handleCorrectGuess(result.slotIndex, item);
                }
            } else {
                // Wrong guess
                const guessedItem = this.game.allChips.find(item => item.id === result.itemId);
                const correctItem = { id: 'unknown', label: 'unknown' }; // Server doesn't reveal correct answer
                this.game.handleWrongGuess(result.slotIndex, guessedItem, correctItem);
            }
            
            // Update locked slots
            if (result.lockedSlots) {
                result.lockedSlots.forEach(slotIndex => {
                    this.game.solvedSlots[slotIndex] = true;
                });
            }
            
            // Update score
            if (result.score !== undefined) {
                this.game.score = result.score;
                this.game.updateScoreDisplay();
            }
            
            // Check for game end
            if (result.gameEnded) {
                this.game.handleWin();
            }
            
            // Clear selection
            document.querySelectorAll('.slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            this.game.selectedSlot = null;
            
        } else {
            // Server rejected the guess
            this.game.showMessage(`Invalid guess: ${result.error}`, 'error');
        }
    }

    handleGameEnd(data) {
        console.log('Handling game end:', data);
        
        // Show final results
        if (data.winner) {
            if (data.winner.playerId === this.playerId) {
                this.game.showMessage('🏆 You won the game!', 'success');
            } else {
                this.game.showMessage(`🏆 ${data.winner.username} won the game!`, 'info');
            }
        }
        
        // Show scoreboard
        if (data.scoreboard && data.scoreboard.length > 0) {
            const scoresText = data.scoreboard
                .map((player, index) => `${index + 1}. ${player.username}: ${player.score}`)
                .join('\n');
            
            setTimeout(() => {
                this.game.showMessage(`Final Scores:\n${scoresText}`, 'info');
            }, 2000);
        }
        
        // Reveal arrangement if provided
        if (data.arrangement) {
            this.game.arrangement = data.arrangement;
            // The game will handle revealing the solution
        }
        
        // Reset game state
        this.gameId = null;
        this.game.gameActive = false;
        
        // Enable starting a new game
        setTimeout(() => {
            this.game.showMessage('Game ended. You can start a new game.', 'info');
        }, 5000);
    }

    // Utility methods
    isConnected() {
        return this.socket && this.socket.connected;
    }

    isInGame() {
        return this.gameId !== null;
    }

    getConnectionStatus() {
        if (!this.socket) return 'disconnected';
        if (this.socket.connecting) return 'connecting';
        if (this.socket.connected) return 'connected';
        return 'disconnected';
    }
}

// Make SocketClient available globally
window.SocketClient = SocketClient;
