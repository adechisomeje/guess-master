/**
 * @typedef {Object} GuessIn
 * @property {string} gameId
 * @property {string} guessId
 * @property {number} slotIndex
 * @property {string} itemId
 */

/**
 * @typedef {Object} GuessOut
 * @property {string} gameId
 * @property {string} playerId
 * @property {number} slotIndex
 * @property {string} itemId
 * @property {boolean} correct
 * @property {number[]} [lockedSlots]
 * @property {number} score
 */

/**
 * @typedef {Object} PlayerScore
 * @property {string} playerId
 * @property {string} username
 * @property {number} score
 */

/**
 * @typedef {Object} Snapshot
 * @property {string} gameId
 * @property {string} mode
 * @property {number} slots
 * @property {string[]} itemPool
 * @property {boolean[]} locked
 * @property {PlayerScore[]} scores
 * @property {'active'|'ended'} status
 */

/**
 * @typedef {Object} GameEnd
 * @property {string} gameId
 * @property {PlayerScore} winner
 * @property {PlayerScore[]} scoreboard
 */

/**
 * @typedef {Object} Player
 * @property {string} playerId
 * @property {string} username
 * @property {string} socketId
 * @property {number} score
 */

/**
 * @typedef {Object} GameSession
 * @property {string} gameId
 * @property {string} mode
 * @property {number} slots
 * @property {Object[]} itemPool
 * @property {Object[]} arrangement
 * @property {boolean[]} locked
 * @property {Player[]} players
 * @property {'waiting'|'active'|'ended'} status
 * @property {number} createdAt
 * @property {number} [endedAt]
 */

/**
 * @typedef {Object} MatchTicket
 * @property {string} ticketId
 * @property {string} playerId
 * @property {string} username
 * @property {string} mode
 * @property {'pending'|'matched'|'expired'} status
 * @property {string} [gameId]
 * @property {number} createdAt
 */

module.exports = {};
