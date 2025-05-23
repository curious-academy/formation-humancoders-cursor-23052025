import { Game } from '../domain/entities/Game.js';
import { Player } from '../domain/entities/Player.js';

export class GameController {
    #game;
    #player;
    #gameView;

    constructor(gameView) {
        this.#game = new Game();
        this.#player = null;
        this.#gameView = gameView;
        this.#setupEventListeners();
    }

    /**
     * Sets up event listeners for game controls
     * @private
     */
    #setupEventListeners() {
        this.#gameView.onStartGame(() => this.#startGame());
        this.#gameView.onKeyPress(this.#handleKeyPress.bind(this));
    }

    /**
     * Starts a new game
     * @private
     */
    #startGame() {
        if (this.#game.start()) {
            this.#player = new Player();
            this.#gameView.updateGameState(this.#game.getState());
            this.#gameView.showPlayer(this.#player.position);
        }
    }

    /**
     * Ends the current game
     * @private
     */
    #endGame() {
        const result = this.#game.end();
        if (result) {
            this.#gameView.updateGameState(this.#game.getState());
            this.#player = null;
        }
    }

    /**
     * Handles keyboard input for player movement
     * @param {string} key - The key that was pressed
     * @private
     */
    #handleKeyPress(key) {
        if (!this.#player || this.#game.getState().state !== 'running') return;

        switch (key) {
            case 'ArrowUp':
                this.#player.moveUp();
                break;
            case 'ArrowDown':
                this.#player.moveDown();
                break;
            case 'ArrowLeft':
                this.#player.moveLeft();
                break;
            case 'ArrowRight':
                this.#player.moveRight();
                break;
        }

        this.#gameView.showPlayer(this.#player.position);
    }

    /**
     * Updates the game score
     * @param {number} points - Points to add
     * @private
     */
    #updateScore(points) {
        try {
            const result = this.#game.updateScore(points);
            if (result) {
                this.#gameView.updateGameState(this.#game.getState());
            }
        } catch (error) {
            console.error('Error updating score:', error.message);
        }
    }
}