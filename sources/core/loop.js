/**
 * Creates update loops.
 *
 * @example
 *
 * const loop = new Loop(handler);
 * loop.update();
 */
class Loop {

    /**
     * Stores the handler to execute with the update loop.
     * @type {Function}
     * @private
     */
    $handler;

    /**
     * Stores the identifier of the last requestAnimationFrame call.
     * @type {number}
     * @private
     */
    $identifier;

    /**
     * Stores the time value of the last tick call.
     * @type {number}
     * @private
     */
    $lastTime;

    /**
     * Stores the global scope used.
     * @type {typeof globalThis}
     * @private
     */
    $scope;

    /**
     * Creates a new update loop.
     * @param {Function} $handler The handler to execute with the update loop.
     * @param {typeof globalThis} $scope The global scope to use.
     */
    constructor($handler, $scope = window) {

        this.$handler = $handler;
        this.$scope = $scope;
    }

    /**
     * Stops the update loop.
     * @public
     */
    stop() {

        if (typeof this.$identifier !== 'undefined') {

            this.$scope.cancelAnimationFrame(this.$identifier);

            this.$lastTime = undefined;
        }
    }

    /**
     * Updates the update loop.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    update($tickrateMinimum = 60) {

        this.$identifier = this.$scope.requestAnimationFrame(this.update.bind(this, $tickrateMinimum));

        const currentTime = performance.now();

        if (typeof this.$lastTime === 'undefined') {

            this.$lastTime = currentTime;

            return;
        }

        const timetickCurrent = currentTime - this.$lastTime;
        const timetickMinimum = 1000 / $tickrateMinimum;
        const timetickSafe = Math.min(timetickCurrent, timetickMinimum);

        this.$handler(timetickSafe);
    }
}

export {

    Loop
};

export default Loop;
