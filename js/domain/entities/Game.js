/**
 * Represents a game with state management, scoring, level progression and Star Wars enemies.
 */
export class Game {
    /**
     * Game state constants
     * @type {Object}
     * @private
     */
    static #GAME_STATES = {
        NOT_STARTED: 'notStarted',
        RUNNING: 'running',
        FINISHED: 'finished'
    };

    /**
     * Score thresholds for level progression
     * @type {Object}
     * @private
     */
    static #SCORE_THRESHOLDS = {
        LEVEL_UP: 100
    };

    /**
     * List of available Star Wars enemies per level
     * @type {Object}
     * @private
     */
    #starWarsEnemies = {
        1: ['Stormtrooper', 'TIE Fighter', 'Probe Droid'],
        2: ['Dark Trooper', 'AT-ST Walker', 'Imperial Officer'],
        3: ['Bounty Hunter', 'Royal Guard', 'AT-AT Walker'],
        4: ['Inquisitor', 'Star Destroyer', 'Death Trooper'],
        5: ['Darth Vader', 'Emperor Palpatine', 'Grand Moff Tarkin']
    };

    #state;
    #score;
    #level;
    #enemies;

    constructor() {
        this.#state = Game.#GAME_STATES.NOT_STARTED;
        this.#score = 0;
        this.#level = 1;
        this.#enemies = [];
    }

    /**
     * Gets the current state of the game
     * @returns {string} Current game state
     */
    get currentState() {
        return this.#state;
    }

    /**
     * Gets the current score
     * @returns {number} Current score
     */
    get currentScore() {
        return this.#score;
    }

    /**
     * Gets the current level
     * @returns {number} Current level
     */
    get currentLevel() {
        return this.#level;
    }

    /**
     * Gets the current enemies
     * @returns {Array<string>} Current enemies list
     */
    get currentEnemies() {
        return [...this.#enemies];
    }

    /**
     * Starts the game if it's not already running.
     * @returns {boolean} True if the game was successfully started, false otherwise.
     */
    start() {
        if (this.#state !== Game.#GAME_STATES.RUNNING) {
            this.#state = Game.#GAME_STATES.RUNNING;
            this.#score = 0;
            this.#level = 1;
            this.#enemies = this.#starWarsEnemies[1] || [];
            return true;
        }
        return false;
    }

    /**
     * Ends the game if it's currently running.
     * @returns {Object|null} An object containing final score and level if game was running, null otherwise.
     * @returns {number} returns.finalScore - The final score of the game.
     * @returns {number} returns.finalLevel - The final level reached.
     */
    end() {
        if (this.#state === Game.#GAME_STATES.RUNNING) {
            this.#state = Game.#GAME_STATES.FINISHED;
            return {
                finalScore: this.#score,
                finalLevel: this.#level
            };
        }
        return null;
    }

    /**
     * Updates the game score and potentially increases the level.
     * Level increases every 100 points.
     * @param {number} points - The points to add to the current score.
     * @throws {TypeError} If points is not a valid number.
     * @returns {Object|null} An object containing current score and level if game is running, null otherwise.
     * @returns {number} returns.score - The current score.
     * @returns {number} returns.level - The current level.
     * @returns {Array<string>} returns.enemies - The current level enemies.
     */
    updateScore(points) {
        if (typeof points !== 'number' || isNaN(points)) {
            throw new TypeError('Points must be a valid number');
        }

        if (this.#state === Game.#GAME_STATES.RUNNING) {
            this.#score += points;
            if (this.#score % Game.#SCORE_THRESHOLDS.LEVEL_UP === 0) {
                this.#level++;
                this.#enemies = this.#starWarsEnemies[this.#level] || this.#enemies;
            }
            return { 
                score: this.#score, 
                level: this.#level,
                enemies: [...this.#enemies]
            };
        }
        return null;
    }

    /**
     * Gets the current state of the game.
     * @returns {Object} The current game state.
     * @returns {string} returns.state - Current state ('notStarted', 'running', or 'finished').
     * @returns {number} returns.score - Current score.
     * @returns {number} returns.level - Current level.
     * @returns {Array<string>} returns.enemies - Current enemies list.
     */
    getState() {
        return {
            state: this.#state,
            score: this.#score,
            level: this.#level,
            enemies: [...this.#enemies]
        };
    }
}