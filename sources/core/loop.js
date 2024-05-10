/**
 * Creates update loops.
 *
 * @example
 *
 * const loop = new Loop(handler);
 * loop.initiate();
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
     * Stores the time value of the previous tick call.
     * @type {number}
     * @private
     */
    $timePrevious;

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
     * Loops the update loop.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    $loop($timetick) {

        const timeCurrent = performance.now();

        if (typeof this.$timePrevious !== 'undefined') {

            const timetickCurrent = timeCurrent - this.$timePrevious;
            const timetickMinimum = $timetick;
            const timetickSafe = Math.min(timetickMinimum, timetickCurrent);

            this.$handler(timetickSafe);
        }

        this.$identifier = this.$scope.requestAnimationFrame(this.$loop.bind(this, $timetick));

        this.$timePrevious = timeCurrent;
    }

    /**
     * Initiates the update loop.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    initiate($tickrateMinimum = 60) {

        this.$loop(1000 / $tickrateMinimum);
    }

    /**
     * Terminates the update loop.
     * @public
     */
    terminate() {

        if (typeof this.$identifier !== 'undefined') {

            this.$scope.cancelAnimationFrame(this.$identifier);

            this.$timePrevious = undefined;
        }
    }
}

export {

    Loop
};

export default Loop;
