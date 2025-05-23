export class Player {
    /**
     * Game boundaries constants
     * @type {Object}
     * @private
     */
    static #GAME_BOUNDARIES = {
        MIN_X: 0,
        MAX_X: 370,
        MIN_Y: 0,
        MAX_Y: 370
    };

    /**
     * Movement constants
     * @type {Object}
     * @private
     */
    static #MOVEMENT = {
        RATE: 5
    };

    #position;
    #moveRate;
    #angle;

    /**
     * Creates a new player instance
     * @param {number} x - Initial X position
     * @param {number} y - Initial Y position
     */
    constructor(x = 200, y = 200) {
        this.#position = { x, y };
        this.#moveRate = Player.#MOVEMENT.RATE;
        this.#angle = 0;
    }

    /**
     * Gets the current position of the player
     * @returns {Object} The current position
     * @returns {number} returns.x - X coordinate
     * @returns {number} returns.y - Y coordinate
     */
    get position() {
        return { ...this.#position };
    }

    /**
     * Gets the current angle of the player
     * @returns {number} The current angle in degrees
     */
    get angle() {
        return this.#angle;
    }

    /**
     * Moves the player upward
     */
    moveUp() {
        this.#updatePosition(0, -this.#moveRate);
    }

    /**
     * Moves the player downward
     */
    moveDown() {
        this.#updatePosition(0, this.#moveRate);
    }

    /**
     * Moves the player to the left
     */
    moveLeft() {
        this.#updatePosition(-this.#moveRate, 0);
    }

    /**
     * Moves the player to the right
     */
    moveRight() {
        this.#updatePosition(this.#moveRate, 0);
    }

    /**
     * Updates the player's position while respecting game boundaries
     * @param {number} offsetX - X-axis movement
     * @param {number} offsetY - Y-axis movement
     * @private
     */
    #updatePosition(offsetX, offsetY) {
        const newX = this.#position.x + offsetX;
        const newY = this.#position.y + offsetY;

        this.#position.x = Math.max(
            Player.#GAME_BOUNDARIES.MIN_X,
            Math.min(Player.#GAME_BOUNDARIES.MAX_X, newX)
        );
        this.#position.y = Math.max(
            Player.#GAME_BOUNDARIES.MIN_Y,
            Math.min(Player.#GAME_BOUNDARIES.MAX_Y, newY)
        );
    }

    /**
     * Gets the current position of the player
     * @deprecated Use position getter instead
     * @returns {Object} The current position
     */
    getPosition() {
        console.warn('getPosition() is deprecated, use position getter instead');
        return this.position;
    }
}