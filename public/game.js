// Theme Registry System
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
            {id: "orange", label: "Orange", color: "#e67e22"},
            {id: "pink", label: "Pink", color: "#e91e63"},
            {id: "cyan", label: "Cyan", color: "#1abc9c"},
            {id: "lime", label: "Lime", color: "#8bc34a"},
            {id: "indigo", label: "Indigo", color: "#3f51b5"},
            {id: "brown", label: "Brown", color: "#8d6e63"},
            {id: "teal", label: "Teal", color: "#009688"},
            {id: "magenta", label: "Magenta", color: "#e91e63"},
            {id: "gold", label: "Gold", color: "#ffd700"},
            {id: "silver", label: "Silver", color: "#c0c0c0"},
            {id: "coral", label: "Coral", color: "#ff7f50"}
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
            {id: "grape", label: "Grape", emoji: "🍇", color: "#9b59b6"},
            {id: "strawberry", label: "Strawberry", emoji: "🍓", color: "#e74c3c"},
            {id: "watermelon", label: "Watermelon", emoji: "🍉", color: "#27ae60"},
            {id: "pineapple", label: "Pineapple", emoji: "🍍", color: "#f39c12"},
            {id: "peach", label: "Peach", emoji: "🍑", color: "#e74c3c"},
            {id: "lemon", label: "Lemon", emoji: "🍋", color: "#f1c40f"},
            {id: "kiwi", label: "Kiwi", emoji: "🥝", color: "#27ae60"},
            {id: "mango", label: "Mango", emoji: "🥭", color: "#f39c12"},
            {id: "avocado", label: "Avocado", emoji: "🥑", color: "#27ae60"}
        ]
    },
    gems: {
        name: "Gems",
        icon: "💎",
        rarity: "rare",
        items: [
            {id: "diamond", label: "Diamond", emoji: "💎", color: "#ecf0f1"},
            {id: "ruby", label: "Ruby", emoji: "🔴", color: "#e11d48"},
            {id: "emerald", label: "Emerald", emoji: "🟢", color: "#059669"},
            {id: "sapphire", label: "Sapphire", emoji: "🔵", color: "#2563eb"},
            {id: "topaz", label: "Topaz", emoji: "🟡", color: "#eab308"},
            {id: "amethyst", label: "Amethyst", emoji: "🟣", color: "#9333ea"},
            {id: "pearl", label: "Pearl", emoji: "⚪", color: "#f8fafc"},
            {id: "garnet", label: "Garnet", emoji: "🔴", color: "#7f1d1d"},
            {id: "jade", label: "Jade", emoji: "🟢", color: "#166534"},
            {id: "opal", label: "Opal", emoji: "🌈", color: "#a855f7"},
            {id: "crystal", label: "Crystal", emoji: "💠", color: "#06b6d4"},
            {id: "obsidian", label: "Obsidian", emoji: "⚫", color: "#1f2937"}
        ]
    },
    shapes: {
        name: "Shapes",
        icon: "🔷",
        rarity: "rare",
        items: [
            {id: "circle", label: "Circle", svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`, color: "#3b82f6"},
            {id: "square", label: "Square", svg: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" fill="currentColor"/></svg>`, color: "#ef4444"},
            {id: "triangle", label: "Triangle", svg: `<svg viewBox="0 0 24 24"><polygon points="12,2 22,20 2,20" fill="currentColor"/></svg>`, color: "#22c55e"},
            {id: "diamond", label: "Diamond", svg: `<svg viewBox="0 0 24 24"><polygon points="12,2 22,12 12,22 2,12" fill="currentColor"/></svg>`, color: "#a855f7"},
            {id: "star", label: "Star", svg: `<svg viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="currentColor"/></svg>`, color: "#f59e0b"},
            {id: "heart", label: "Heart", svg: `<svg viewBox="0 0 24 24"><path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" fill="currentColor"/></svg>`, color: "#ec4899"},
            {id: "hexagon", label: "Hexagon", svg: `<svg viewBox="0 0 24 24"><polygon points="6,2 18,2 22,12 18,22 6,22 2,12" fill="currentColor"/></svg>`, color: "#06b6d4"},
            {id: "pentagon", label: "Pentagon", svg: `<svg viewBox="0 0 24 24"><polygon points="12,2 22,8 18,20 6,20 2,8" fill="currentColor"/></svg>`, color: "#84cc16"}
        ]
    },
    emoji: {
        name: "Emoji",
        icon: "😊",
        rarity: "legendary",
        items: [
            {id: "smile", label: "Smile", emoji: "😊", color: "#f59e0b"},
            {id: "laugh", label: "Laugh", emoji: "😂", color: "#eab308"},
            {id: "heart_eyes", label: "Heart Eyes", emoji: "😍", color: "#ec4899"},
            {id: "cool", label: "Cool", emoji: "😎", color: "#3b82f6"},
            {id: "wink", label: "Wink", emoji: "😉", color: "#f97316"},
            {id: "thinking", label: "Thinking", emoji: "🤔", color: "#6b7280"},
            {id: "surprised", label: "Surprised", emoji: "😮", color: "#8b5cf6"},
            {id: "happy", label: "Happy", emoji: "😄", color: "#22c55e"},
            {id: "sleepy", label: "Sleepy", emoji: "😴", color: "#64748b"},
            {id: "party", label: "Party", emoji: "🥳", color: "#f43f5e"},
            {id: "robot", label: "Robot", emoji: "🤖", color: "#06b6d4"},
            {id: "alien", label: "Alien", emoji: "👽", color: "#84cc16"}
        ]
    },
    spring: {
        name: "Spring Flowers",
        icon: "🌸",
        rarity: "rare",
        season: "spring",
        items: [
            {id: "cherry_blossom", label: "Cherry Blossom", emoji: "🌸", color: "#ffc0cb"},
            {id: "tulip", label: "Tulip", emoji: "🌷", color: "#ff69b4"},
            {id: "daffodil", label: "Daffodil", emoji: "🌼", color: "#ffff00"},
            {id: "rose", label: "Rose", emoji: "🌹", color: "#dc143c"},
            {id: "sunflower", label: "Sunflower", emoji: "🌻", color: "#ffa500"},
            {id: "blossom", label: "Blossom", emoji: "🌺", color: "#ff1493"},
            {id: "hibiscus", label: "Hibiscus", emoji: "🌺", color: "#ff6347"},
            {id: "lotus", label: "Lotus", emoji: "🪷", color: "#db7093"}
        ]
    },
    summer: {
        name: "Summer Vibes",
        icon: "☀️",
        rarity: "rare",
        season: "summer",
        items: [
            {id: "sun", label: "Sun", emoji: "☀️", color: "#ffd700"},
            {id: "beach_ball", label: "Beach Ball", emoji: "🏐", color: "#ff4500"},
            {id: "ice_cream", label: "Ice Cream", emoji: "🍦", color: "#ffe4e1"},
            {id: "watermelon_slice", label: "Watermelon", emoji: "🍉", color: "#ff69b4"},
            {id: "sunglasses", label: "Sunglasses", emoji: "🕶️", color: "#2f4f4f"},
            {id: "palm_tree", label: "Palm Tree", emoji: "🌴", color: "#228b22"},
            {id: "surfboard", label: "Surfboard", emoji: "🏄", color: "#00bfff"},
            {id: "flamingo", label: "Flamingo", emoji: "🦩", color: "#ff1493"}
        ]
    },
    autumn: {
        name: "Autumn Leaves",
        icon: "🍂",
        rarity: "rare", 
        season: "fall",
        items: [
            {id: "maple_leaf", label: "Maple Leaf", emoji: "🍁", color: "#ff4500"},
            {id: "fallen_leaf", label: "Fallen Leaf", emoji: "🍂", color: "#daa520"},
            {id: "pumpkin", label: "Pumpkin", emoji: "🎃", color: "#ff8c00"},
            {id: "acorn", label: "Acorn", emoji: "🌰", color: "#8b4513"},
            {id: "corn", label: "Corn", emoji: "🌽", color: "#ffff00"},
            {id: "mushroom", label: "Mushroom", emoji: "🍄", color: "#dc143c"},
            {id: "chestnut", label: "Chestnut", emoji: "🌰", color: "#a0522d"},
            {id: "turkey", label: "Turkey", emoji: "🦃", color: "#8b4513"}
        ]
    },
    winter: {
        name: "Winter Wonderland",
        icon: "❄️",
        rarity: "legendary",
        season: "winter",
        items: [
            {id: "snowflake", label: "Snowflake", emoji: "❄️", color: "#e6f3ff"},
            {id: "snowman", label: "Snowman", emoji: "⛄", color: "#ffffff"},
            {id: "christmas_tree", label: "Christmas Tree", emoji: "🎄", color: "#228b22"},
            {id: "gift", label: "Gift", emoji: "🎁", color: "#ff0000"},
            {id: "santa", label: "Santa", emoji: "🎅", color: "#dc143c"},
            {id: "reindeer", label: "Reindeer", emoji: "🦌", color: "#8b4513"},
            {id: "bell", label: "Bell", emoji: "🔔", color: "#ffd700"},
            {id: "candy_cane", label: "Candy Cane", emoji: "🍭", color: "#ff1493"},
            {id: "mittens", label: "Mittens", emoji: "🧤", color: "#4169e1"},
            {id: "hot_chocolate", label: "Hot Chocolate", emoji: "☕", color: "#8b4513"}
        ]
    }
};

// Season Detection Utility
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer"; 
    if (month >= 9 && month <= 11) return "fall";
    return "winter";
}

function isCurrentSeason(themeSeason) {
    if (!themeSeason) return true; // Non-seasonal themes always available
    return getCurrentSeason() === themeSeason;
}

// Sound Effects Service
class SfxService {
    constructor() {
        this.muted = false;
        this.context = null;
        this.initAudio();
    }

    initAudio() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    playSfx(type) {
        if (this.muted || !this.context) return;
        
        const frequencies = {
            unlock: [523, 659, 784], // C, E, G
            tick: [800],
            success: [523, 659, 784, 1047] // C, E, G, C
        };

        const freq = frequencies[type];
        if (!freq) return;

        freq.forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.1), i * 100);
        });
    }

    playTone(frequency, duration) {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    toggle() {
        this.muted = !this.muted;
        return !this.muted;
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.unlockedThemes = new Set(['colors']); // Colors always unlocked
        this.activeTheme = 'colors';
        this.milestones = {
            timeAttackWins: 0,
            roundsReached: 1
        };
        this.load();
    }

    load() {
        const saved = localStorage.getItem('guessMaster_themes');
        if (saved) {
            const data = JSON.parse(saved);
            this.unlockedThemes = new Set(data.unlocked || ['colors']);
            this.activeTheme = data.active || 'colors';
            this.milestones = data.milestones || { timeAttackWins: 0, roundsReached: 1 };
        }
    }

    save() {
        localStorage.setItem('guessMaster_themes', JSON.stringify({
            unlocked: Array.from(this.unlockedThemes),
            active: this.activeTheme,
            milestones: this.milestones
        }));
    }

    updateMilestones(roundNumber, mode, isWin) {
        this.milestones.roundsReached = Math.max(this.milestones.roundsReached, roundNumber);
        
        if (isWin && mode === 'TimeAttack') {
            this.milestones.timeAttackWins++;
        }
        
        this.save();
    }

    isThemeUnlockable(themeId) {
        const theme = ThemeRegistry[themeId];
        if (!theme) return false;

        // Check seasonal availability
        if (!isCurrentSeason(theme.season)) return false;

        // Check rarity requirements
        switch (theme.rarity) {
            case 'common':
                return true;
            case 'rare':
                return this.milestones.roundsReached >= 15;
            case 'legendary':
                return this.milestones.roundsReached >= 20 && this.milestones.timeAttackWins >= 3;
            default:
                return true;
        }
    }

    unlock(themeId) {
        if (!this.unlockedThemes.has(themeId) && ThemeRegistry[themeId] && this.isThemeUnlockable(themeId)) {
            this.unlockedThemes.add(themeId);
            this.save();
            return true;
        }
        return false;
    }

    setActive(themeId) {
        if (this.unlockedThemes.has(themeId) && ThemeRegistry[themeId]) {
            this.activeTheme = themeId;
            this.save();
            return true;
        }
        return false;
    }

    getActiveTheme() {
        return ThemeRegistry[this.activeTheme] || ThemeRegistry.colors;
    }

    getUnlockedThemes() {
        return Array.from(this.unlockedThemes).map(id => ({
            id,
            ...ThemeRegistry[id]
        }));
    }

    getAvailableThemes() {
        return Object.keys(ThemeRegistry)
            .filter(id => isCurrentSeason(ThemeRegistry[id].season))
            .map(id => ({
                id,
                ...ThemeRegistry[id],
                unlocked: this.unlockedThemes.has(id),
                unlockable: this.isThemeUnlockable(id)
            }));
    }

    getUnlockRequirement(themeId) {
        const theme = ThemeRegistry[themeId];
        if (!theme) return null;

        if (!isCurrentSeason(theme.season)) {
            const seasonName = theme.season.charAt(0).toUpperCase() + theme.season.slice(1);
            return `Available in ${seasonName}`;
        }

        switch (theme.rarity) {
            case 'rare':
                const roundsNeeded = Math.max(0, 15 - this.milestones.roundsReached);
                return roundsNeeded > 0 ? `Reach Round ${15}` : null;
            case 'legendary':
                const roundReq = this.milestones.roundsReached >= 20;
                const timeAttackReq = this.milestones.timeAttackWins >= 3;
                
                if (!roundReq && !timeAttackReq) {
                    return `Reach Round 20 & Win 3 Time Attack rounds`;
                } else if (!roundReq) {
                    return `Reach Round 20`;
                } else if (!timeAttackReq) {
                    const winsNeeded = 3 - this.milestones.timeAttackWins;
                    return `Win ${winsNeeded} more Time Attack round${winsNeeded > 1 ? 's' : ''}`;
                }
                return null;
            default:
                return null;
        }
    }

    checkUnlocks(roundNumber) {
        const unlockSchedule = {
            5: 'fruits',
            10: 'gems', 
            15: 'shapes',
            20: 'emoji'
        };

        const newThemes = [];
        
        // Check basic unlocks
        const basicTheme = unlockSchedule[roundNumber];
        if (basicTheme && this.unlock(basicTheme)) {
            newThemes.push(basicTheme);
        }

        // Check seasonal themes
        Object.keys(ThemeRegistry).forEach(themeId => {
            const theme = ThemeRegistry[themeId];
            if (theme.season && !this.unlockedThemes.has(themeId) && this.isThemeUnlockable(themeId)) {
                if (this.unlock(themeId)) {
                    newThemes.push(themeId);
                }
            }
        });

        return newThemes;
    }
}

// Toast Notification System
class ToastManager {
    constructor() {
        this.toastEl = document.getElementById('toast');
        if (!this.toastEl) {
            this.createToastElement();
        }
    }

    createToastElement() {
        this.toastEl = document.createElement('div');
        this.toastEl.id = 'toast';
        this.toastEl.className = 'toast';
        document.body.appendChild(this.toastEl);
    }

    show(message, type = 'info', duration = 3000) {
        this.toastEl.textContent = message;
        this.toastEl.className = `toast ${type} show`;
        
        setTimeout(() => {
            this.toastEl.classList.remove('show');
        }, duration);
    }

    showUnlock(themeName, themeIcon) {
        this.show(`🎉 New theme unlocked: ${themeIcon} ${themeName}!`, 'success', 4000);
    }
}

// Main Game Class
class GuessMaster {
    constructor() {
        this.sfx = new SfxService();
        this.themeManager = new ThemeManager();
        this.toastManager = new ToastManager();
        
        // Game mode state
        this.isOnlineMode = false;
        this.socketClient = null;
        
        this.modes = ['Classic', 'Limited', 'TimeAttack'];
        this.currentModeIndex = 0;
        
        // Game state
        this.roundNumber = 1;
        this.score = 0;
        this.gems = 0;
        this.streak = 0;
        this.failedRounds = 0;
        this.adaptiveDifficulty = false;
        
        // Round state
        this.itemPool = [];
        this.decoyChips = [];
        this.allChips = [];
        this.numSlots = 4;
        this.selectedSlot = null;
        this.arrangement = [];
        this.playerGuesses = [];
        this.solvedSlots = [];
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.timeLeft = 45;
        this.timeBonus = 3;
        this.timerInterval = null;
        this.gameActive = true;
        this.autoAdvanceTimeout = null;

        this.initializeElements();
        this.bindEvents();
        this.loadGameData();
        this.updateThemeSelector();
        this.startRound(1);
    }

    initializeElements() {
        this.gameBoard = document.getElementById('game-board');
        this.colorPalette = document.getElementById('color-palette');
        this.messageArea = document.getElementById('message');
        this.roundNumberElement = document.getElementById('round-number');
        this.scoreElement = document.getElementById('score');
        this.gemsElement = document.getElementById('gems');
        this.timerElement = document.getElementById('timer');
        this.progressFill = document.getElementById('progress-fill');
        this.progressCompleted = document.getElementById('progress-completed');
        this.progressTotal = document.getElementById('progress-total');
        this.slotCountSlider = document.getElementById('slot-count');
        this.slotCountDisplay = document.getElementById('slot-count-display');
        this.startGameBtn = document.getElementById('start-game');
        this.resetGameBtn = document.getElementById('reset-game');
        this.nextRoundBtn = document.getElementById('next-round');
        
        // Mode toggle elements
        this.localModeBtn = document.getElementById('local-mode');
        this.onlineModeBtn = document.getElementById('online-mode');
        this.connectionStatus = document.getElementById('connection-status');
    }

    bindEvents() {
        // Mode toggle
        this.localModeBtn?.addEventListener('click', () => this.switchToLocalMode());
        this.onlineModeBtn?.addEventListener('click', () => this.switchToOnlineMode());
        
        // Theme selector event
        document.getElementById('theme-selector')?.addEventListener('change', (e) => {
            if (this.themeManager.setActive(e.target.value)) {
                this.generateItemPool();
                this.renderPalette();
                this.renderSlots();
            }
        });

        // Slot count slider
        this.slotCountSlider?.addEventListener('input', (e) => {
            this.numSlots = parseInt(e.target.value);
            this.slotCountDisplay.textContent = this.numSlots;
            this.createSlots();
        });

        // Game controls
        this.startGameBtn?.addEventListener('click', () => this.startGame());
        this.resetGameBtn?.addEventListener('click', () => this.resetGame());
        this.nextRoundBtn?.addEventListener('click', () => this.nextRound());

        // Mode selector radios
        document.querySelectorAll('input[name="mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentModeIndex = this.modes.indexOf(e.target.value);
                this.updateModeDisplay();
            });
        });

        // Touch and click events for mobile compatibility
        this.bindTouchEvents();
    }

    bindTouchEvents() {
        // Handle both touch and mouse events for better mobile support
        const addTouchAndClickEvent = (element, handler) => {
            if (element) {
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    handler(e);
                }, { passive: false });
                element.addEventListener('click', handler);
            }
        };

        // Prevent zoom on double tap for better mobile experience
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    switchToLocalMode() {
        this.isOnlineMode = false;
        this.localModeBtn?.classList.add('active');
        this.onlineModeBtn?.classList.remove('active');
        this.connectionStatus?.classList.add('hidden');
        
        if (this.socketClient) {
            this.socketClient.disconnect();
            this.socketClient = null;
        }
        
        this.showMessage('Switched to Local Play mode', 'info');
    }

    switchToOnlineMode() {
        this.isOnlineMode = true;
        this.onlineModeBtn?.classList.add('active');
        this.localModeBtn?.classList.remove('active');
        this.connectionStatus?.classList.remove('hidden');
        
        // Initialize socket client
        if (window.SocketClient && !this.socketClient) {
            this.socketClient = new SocketClient(this);
            this.socketClient.connect();
        } else {
            this.showMessage('Socket.io not available. Please check server connection.', 'error');
        }
    }

    updateConnectionStatus(status, text) {
        const indicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        if (indicator && statusText) {
            indicator.className = `status-indicator ${status}`;
            statusText.textContent = text;
        }
    }

    startGame() {
        this.resetGame();
        this.startRound(1);
    }

    resetGame() {
        this.roundNumber = 1;
        this.score = 0;
        this.gems = 0;
        this.streak = 0;
        this.failedRounds = 0;
        this.adaptiveDifficulty = false;
        this.nextRoundBtn.style.display = 'none';
        this.clearAutoAdvance();
    }

    updateThemeSelector() {
        const themeSelect = document.getElementById('theme-selector');
        if (!themeSelect) return;
        
        themeSelect.innerHTML = '';
        
        // Get all available themes (seasonal + unlocked)
        const availableThemes = this.themeManager.getAvailableThemes();
        
        availableThemes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            
            // Build option text with badges
            let optionText = `${theme.icon} ${theme.name}`;
            
            // Add rarity indicator
            if (theme.rarity === 'rare') optionText += ' ⭐';
            if (theme.rarity === 'legendary') optionText += ' 🏆';
            
            // Add season indicator
            if (theme.season) {
                const seasonEmoji = {
                    spring: '🌸',
                    summer: '☀️', 
                    fall: '🍂',
                    winter: '❄️'
                };
                optionText += ` ${seasonEmoji[theme.season]}`;
            }
            
            // Add lock indicator
            if (!theme.unlocked) {
                optionText += ' 🔒';
                option.disabled = true;
                option.style.opacity = '0.5';
                
                const requirement = this.themeManager.getUnlockRequirement(theme.id);
                if (requirement) {
                    optionText += ` (${requirement})`;
                }
            }
            
            option.textContent = optionText;
            
            if (theme.id === this.themeManager.activeTheme) {
                option.selected = true;
            }
            
            themeSelect.appendChild(option);
        });
    }

    generateItemPool() {
        const activeTheme = this.themeManager.getActiveTheme();
        const numItems = Math.min(this.numSlots + 2, activeTheme.items.length);
        
        // Shuffle and select items
        const shuffled = [...activeTheme.items].sort(() => Math.random() - 0.5);
        this.itemPool = shuffled.slice(0, numItems);
        
        // Generate decoy chips for visual variety
        const remainingItems = shuffled.slice(numItems);
        this.decoyChips = remainingItems.slice(0, Math.min(4, remainingItems.length));
        
        // Combine all chips for display
        this.allChips = [...this.itemPool, ...this.decoyChips]
            .sort(() => Math.random() - 0.5);
    }

    // Round Configuration System
    getRoundConfig(roundNumber) {
        const activeTheme = this.themeManager.getActiveTheme();
        const maxItems = activeTheme.items.length;
        
        const config = {
            slots: Math.max(3, Math.min(8, 3 + Math.floor(roundNumber / 2))),
            poolSize: Math.max(4, Math.min(8, Math.min(maxItems, 4 + Math.floor(roundNumber / 3)))),
            maxWrongGuesses: Math.max(4, 8 - Math.floor(roundNumber / 3)),
            timeAttackDuration: Math.max(25, Math.min(60, 60 - 2 * roundNumber)),
            timeBonus: Math.max(1, Math.min(3, 3 - Math.floor(roundNumber / 5)))
        };
        
        // Adaptive difficulty adjustment
        if (this.adaptiveDifficulty) {
            config.slots = Math.max(3, config.slots - 1);
            config.timeAttackDuration += 10;
        }
        
        return config;
    }

    buildItemPool(roundNumber) {
        const activeTheme = this.themeManager.getActiveTheme();
        const config = this.getRoundConfig(roundNumber);
        
        // Shuffle theme items and select needed amount
        const shuffled = this.shuffleArray([...activeTheme.items]);
        return shuffled.slice(0, config.poolSize);
    }

    buildArrangement(config) {
        const arrangement = [];
        for (let i = 0; i < config.slots; i++) {
            arrangement.push(this.itemPool[Math.floor(Math.random() * this.itemPool.length)]);
        }
        return arrangement;
    }

    startRound(roundNumber) {
        this.clearAutoAdvance();
        this.roundNumber = roundNumber;
        
        // Check for theme unlocks
        const newThemes = this.themeManager.checkUnlocks(roundNumber);
        if (newThemes.length > 0) {
            newThemes.forEach(themeId => {
                const theme = ThemeRegistry[themeId];
                this.toastManager.showUnlock(theme.name, theme.icon);
                this.sfx.playSfx('unlock');
            });
            this.updateThemeSelector();
        }
        
        const config = this.getRoundConfig(roundNumber);
        
        // Build round components
        this.itemPool = this.buildItemPool(roundNumber);
        this.numSlots = config.slots;
        this.arrangement = this.buildArrangement(config);
        
        // Build decoy chips
        const activeTheme = this.themeManager.getActiveTheme();
        const usedItemIds = new Set(this.arrangement.map(item => item.id));
        const availableDecoys = activeTheme.items.filter(item => 
            !this.itemPool.some(poolItem => poolItem.id === item.id) && 
            !usedItemIds.has(item.id)
        );
        
        const numDecoys = Math.min(3, Math.max(1, availableDecoys.length));
        this.decoyChips = this.shuffleArray(availableDecoys).slice(0, numDecoys);
        this.allChips = [...this.itemPool, ...this.decoyChips];
        
        // Reset game state
        this.gameActive = true;
        this.wrongGuesses = 0;
        this.selectedSlot = null;
        this.playerGuesses = new Array(this.numSlots).fill(null);
        this.solvedSlots = new Array(this.numSlots).fill(false);
        
        // Set mode-specific parameters
        const mode = this.getCurrentMode();
        this.maxWrongGuesses = config.maxWrongGuesses;
        this.timeLeft = config.timeAttackDuration;
        this.timeBonus = config.timeBonus;
        
        // Create UI
        this.createSlots();
        this.createColorPalette();
        this.updateAllDisplays();
        
        // Start timer for Time Attack mode
        if (mode === 'TimeAttack') {
            this.startTimer();
        }
        
        this.showMessage(`Round ${roundNumber} started! ${this.numSlots} slots, ${this.itemPool.length} colors available.`, 'info');
    }

    createSlots() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < this.numSlots; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.dataset.slot = i;
            slot.innerHTML = `<div class="slot-number">${i + 1}</div>`;
            
            // Add both touch and click events for mobile compatibility
            const selectSlotHandler = (e) => {
                e.preventDefault();
                this.selectSlot(i);
            };
            
            slot.addEventListener('touchstart', selectSlotHandler, { passive: false });
            slot.addEventListener('click', selectSlotHandler);
            
            this.gameBoard.appendChild(slot);
        }
        
        // Update progress
        this.progressTotal.textContent = this.numSlots;
        this.progressCompleted.textContent = '0';
        this.progressFill.style.width = '0%';
    }

    createColorPalette() {
        this.colorPalette.innerHTML = '';
        this.shuffleArray([...this.allChips]).forEach(item => {
            const chip = this.renderChip(item);
            
            // Add both touch and click events for mobile compatibility
            const chipHandler = (e) => {
                e.preventDefault();
                if (this.selectedSlot !== null && this.gameActive) {
                    this.animateChipClick(chip);
                    this.makeGuess(item);
                }
            };
            
            chip.addEventListener('touchstart', chipHandler, { passive: false });
            chip.addEventListener('click', chipHandler);
            
            this.colorPalette.appendChild(chip);
        });
    }

    renderChip(item) {
        const chip = document.createElement('div');
        chip.className = 'color-chip';
        chip.dataset.color = item.id;
        
        if (item.emoji) {
            chip.innerHTML = `<span class="chip-emoji">${item.emoji}</span>`;
            chip.style.backgroundColor = item.color + '20'; // 20% opacity
            chip.style.borderColor = item.color;
        } else if (item.svg) {
            chip.innerHTML = `<div class="chip-svg" style="color: ${item.color}">${item.svg}</div>`;
            chip.style.backgroundColor = item.color + '20';
            chip.style.borderColor = item.color;
        } else {
            // Color theme
            chip.style.backgroundColor = item.color;
            chip.title = item.label;
        }
        
        return chip;
    }

    selectSlot(slotIndex) {
        if (this.solvedSlots[slotIndex] || !this.gameActive) return;

        // Remove previous selection
        document.querySelectorAll('.slot').forEach(slot => {
            slot.classList.remove('selected');
        });

        // Select new slot
        document.querySelector(`[data-slot="${slotIndex}"]`).classList.add('selected');
        this.selectedSlot = slotIndex;
        
        this.showMessage(`Slot ${slotIndex + 1} selected. Choose a color!`, 'info');
    }

    makeGuess(item) {
        if (this.selectedSlot === null || !this.gameActive) return;

        const slotIndex = this.selectedSlot;
        const correctItem = this.arrangement[slotIndex];

        if (this.isOnlineMode && this.socketClient) {
            // Send guess to server
            this.socketClient.sendGuess(slotIndex, item.id);
        } else {
            // Local mode - process immediately
            if (item.id === correctItem.id) {
                this.handleCorrectGuess(slotIndex, item);
            } else {
                this.handleWrongGuess(slotIndex, item, correctItem);
            }

            // Clear selection
            document.querySelector(`[data-slot="${slotIndex}"]`).classList.remove('selected');
            this.selectedSlot = null;

            // Check win condition
            if (this.solvedSlots.every(solved => solved)) {
                this.handleWin();
            }
        }
    }

    handleCorrectGuess(slotIndex, item) {
        const slot = document.querySelector(`[data-slot="${slotIndex}"]`);
        
        // Clear any existing content
        slot.innerHTML = `<div class="slot-number">${slotIndex + 1}</div>`;
        
        // Render item in slot
        const itemContent = this.renderChip(item);
        itemContent.className = 'slot-content';
        
        // Style the slot content properly
        if (item.emoji) {
            itemContent.style.fontSize = '2em';
            itemContent.style.backgroundColor = item.color + '30';
            itemContent.style.borderRadius = '10px';
            itemContent.style.width = '100%';
            itemContent.style.height = '100%';
            itemContent.style.display = 'flex';
            itemContent.style.alignItems = 'center';
            itemContent.style.justifyContent = 'center';
        } else if (item.svg) {
            itemContent.style.backgroundColor = item.color + '30';
            itemContent.style.borderRadius = '10px';
            itemContent.style.width = '100%';
            itemContent.style.height = '100%';
            itemContent.style.display = 'flex';
            itemContent.style.alignItems = 'center';
            itemContent.style.justifyContent = 'center';
        } else {
            // Color theme - fill the entire slot
            slot.style.backgroundColor = item.color;
        }
        
        if (item.emoji || item.svg) {
            slot.appendChild(itemContent);
        }
        
        slot.classList.add('solved');
        this.solvedSlots[slotIndex] = true;
        this.playerGuesses[slotIndex] = item.id;

        // Calculate score
        const basePoints = 10;
        const streakBonus = 5 * this.streak;
        const points = basePoints + streakBonus;
        this.score += points;
        this.streak++;

        this.showMessage(`🎉 Correct! Slot ${slotIndex + 1} is ${item.label}! +${points} points`, 'success');

        // Update progress
        const completed = this.solvedSlots.filter(solved => solved).length;
        this.progressCompleted.textContent = completed;
        this.progressFill.style.width = `${(completed / this.numSlots) * 100}%`;

        // Time Attack bonus
        if (this.getCurrentMode() === 'TimeAttack') {
            this.timeLeft = Math.min(this.getRoundConfig(this.roundNumber).timeAttackDuration, this.timeLeft + this.timeBonus);
            this.updateTimer();
        }
        
        this.updateScoreDisplay();
    }

    handleWrongGuess(slotIndex, guessedItem, correctItem) {
        this.wrongGuesses++;
        this.streak = 0; // Reset streak on wrong guess
        
        // Animate wrong guess
        const slot = document.querySelector(`[data-slot="${slotIndex}"]`);
        slot.classList.add('shake');
        setTimeout(() => slot.classList.remove('shake'), 500);
        
        let message = `❌ Wrong! Slot ${slotIndex + 1} is not ${guessedItem.label}.`;
        
        if (this.getCurrentMode() === 'Limited') {
            const remaining = this.maxWrongGuesses - this.wrongGuesses;
            message += ` ${remaining} guesses left.`;
            
            if (this.wrongGuesses >= this.maxWrongGuesses) {
                this.handleLoss('Out of guesses!');
                return;
            }
        }
        
        this.showMessage(message, 'error');
    }

    handleWin() {
        this.gameActive = false;
        this.clearTimer();
        this.failedRounds = 0;
        this.adaptiveDifficulty = false;
        
        const currentMode = this.getCurrentMode();
        
        // Update theme milestones
        this.themeManager.updateMilestones(this.roundNumber, currentMode, true);
        
        // Calculate round completion bonus
        const roundBonus = 10 * this.roundNumber;
        this.score += roundBonus;
        
        // Award gems every 3 rounds
        if (this.roundNumber % 3 === 0) {
            this.gems++;
            this.updateGemsDisplay();
        }
        
        // Check for theme unlocks
        const newThemes = this.themeManager.checkUnlocks(this.roundNumber);
        if (newThemes.length > 0) {
            newThemes.forEach(themeId => {
                const theme = ThemeRegistry[themeId];
                this.toastManager.showUnlock(theme.name, theme.icon);
                this.sfx.playSfx('unlock');
            });
            this.updateThemeSelector();
        }
        
        // Save progress
        this.saveGameData();
        
        let message = `🏆 Round ${this.roundNumber} completed! +${roundBonus} bonus points!`;
        if (currentMode === 'TimeAttack') {
            message += ` ⚡ Time Attack Victory!`;
        }
        
        this.showMessage(message, 'success');
        this.updateScoreDisplay();
        
        // Show next round button
        this.nextRoundBtn.style.display = 'inline-block';
        this.autoAdvanceTimeout = setTimeout(() => {
            this.nextRound();
        }, 2000);
    }

    handleLoss(reason) {
        this.gameActive = false;
        this.clearTimer();
        this.clearAutoAdvance();
        this.failedRounds++;
        this.streak = 0;
        
        // Enable adaptive difficulty if failed 2 rounds in a row
        if (this.failedRounds >= 2) {
            this.adaptiveDifficulty = true;
        }
        
        // Reveal solution
        this.arrangement.forEach((item, index) => {
            if (!this.solvedSlots[index]) {
                const slot = document.querySelector(`[data-slot="${index}"]`);
                slot.innerHTML = `<div class="slot-number">${index + 1}</div>`;
                
                if (item.emoji) {
                    const itemContent = document.createElement('div');
                    itemContent.innerHTML = `<span class="chip-emoji">${item.emoji}</span>`;
                    itemContent.style.fontSize = '2em';
                    itemContent.style.backgroundColor = item.color + '30';
                    itemContent.style.borderRadius = '10px';
                    itemContent.style.width = '100%';
                    itemContent.style.height = '100%';
                    itemContent.style.display = 'flex';
                    itemContent.style.alignItems = 'center';
                    itemContent.style.justifyContent = 'center';
                    itemContent.style.opacity = '0.7';
                    slot.appendChild(itemContent);
                } else if (item.svg) {
                    const itemContent = document.createElement('div');
                    itemContent.innerHTML = `<div class="chip-svg" style="color: ${item.color}; font-size: 1.5em;">${item.svg}</div>`;
                    itemContent.style.backgroundColor = item.color + '30';
                    itemContent.style.borderRadius = '10px';
                    itemContent.style.width = '100%';
                    itemContent.style.height = '100%';
                    itemContent.style.display = 'flex';
                    itemContent.style.alignItems = 'center';
                    itemContent.style.justifyContent = 'center';
                    itemContent.style.opacity = '0.7';
                    slot.appendChild(itemContent);
                } else {
                    slot.style.backgroundColor = item.color;
                    slot.style.opacity = '0.7';
                }
                
                slot.style.border = '3px solid #e74c3c';
            }
        });
        
        const solutionText = this.arrangement.map(item => item.label).join(', ');
        this.showMessage(`💔 Game Over! ${reason} The solution was: ${solutionText}`, 'error');
        this.saveGameData();
    }

    nextRound() {
        this.clearAutoAdvance();
        this.nextRoundBtn.style.display = 'none';
        this.startRound(this.roundNumber + 1);
    }

    getCurrentMode() {
        return this.modes[this.currentModeIndex];
    }

    // UI Update Methods
    updateAllDisplays() {
        this.updateRoundDisplay();
        this.updateModeDisplay();
        this.updateScoreDisplay();
        this.updateGemsDisplay();
        this.updateTimer();
    }

    updateRoundDisplay() {
        this.roundNumberElement.textContent = this.roundNumber;
    }

    updateModeDisplay() {
        const mode = this.getCurrentMode();
        // Update the selected radio button
        const radioButton = document.querySelector(`input[name="mode"][value="${mode}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
    }

    updateScoreDisplay() {
        const element = this.scoreElement;
        if (element.textContent !== this.score.toString()) {
            element.textContent = this.score;
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 500);
        }
    }

    updateGemsDisplay() {
        const element = this.gemsElement;
        if (element.textContent !== this.gems.toString()) {
            element.textContent = this.gems;
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 500);
        }
    }

    updateTimer() {
        const mode = this.getCurrentMode();
        if (mode === 'TimeAttack') {
            const newValue = `${this.timeLeft}s`;
            if (this.timerElement.textContent !== newValue) {
                this.timerElement.textContent = newValue;
                this.timerElement.classList.add('updated');
                setTimeout(() => this.timerElement.classList.remove('updated'), 300);
            }
        } else {
            this.timerElement.textContent = '--';
        }
    }

    clearAutoAdvance() {
        if (this.autoAdvanceTimeout) {
            clearTimeout(this.autoAdvanceTimeout);
            this.autoAdvanceTimeout = null;
        }
    }

    startTimer() {
        this.clearTimer();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.handleLoss('Time\'s up!');
            }
        }, 1000);
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // Persistence Methods
    saveGameData() {
        const gameData = {
            highestRound: Math.max(this.roundNumber, this.getStoredValue('highestRound', 1)),
            bestScore: Math.max(this.score, this.getStoredValue('bestScore', 0)),
            totalGems: this.gems + this.getStoredValue('totalGems', 0)
        };
        
        Object.keys(gameData).forEach(key => {
            localStorage.setItem(`guessMaster_${key}`, gameData[key]);
        });
    }

    loadGameData() {
        const highestRound = this.getStoredValue('highestRound', 1);
        const bestScore = this.getStoredValue('bestScore', 0);
        
        if (highestRound > 1 || bestScore > 0) {
            console.log(`Previous best: Round ${highestRound}, Score ${bestScore}`);
        }
    }

    getStoredValue(key, defaultValue) {
        const stored = localStorage.getItem(`guessMaster_${key}`);
        return stored ? parseInt(stored) : defaultValue;
    }

    // Utility Methods
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    animateChipClick(chip) {
        chip.classList.add('clicked');
        setTimeout(() => chip.classList.remove('clicked'), 200);
    }

    showMessage(text, type = 'info') {
        this.messageArea.textContent = text;
        this.messageArea.className = `message ${type}`;
    }
}
