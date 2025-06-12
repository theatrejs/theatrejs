import {Stage} from '../index.js';

/**
 * Abstract systems.
 *
 * @example
 *
 * class SystemExample extends System {}
 */
class System {

    /**
     * Stores the initiated status.
     * @type {boolean}
     * @protected
     */
    $initiated;

    /**
     * Creates a new system.
     * @protected
     */
    constructor() {

        this.$initiated = false;
    }

    /**
     * Initiates the system.
     * @public
     */
    initiate() {

        if (this.$initiated === true) {

            return;
        }

        this.onInitiate();

        this.$initiated = true;
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {}

    /**
     * Called when the system is being terminated.
     * @returns {(void | Promise<void>)}
     * @public
     */
    onTerminate() {}

    /**
     * Called when the system is being updated by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage, $timetick}) {

        void $stage;
        void $timetick;
    }

    /**
     * Terminates the system.
     * @public
     */
    terminate() {

        if (this.$initiated === false) {

            return;
        }

        const terminated = this.onTerminate();

        if (typeof terminated === 'undefined') {

            this.$initiated = false;

            return;
        }

        terminated.then(() => {

            this.$initiated = false;
        });
    }

    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    tick({$stage, $timetick}) {

        if (this.$initiated === false) {

            this.initiate();
        }

        this.onTick({$stage, $timetick});
    }
}

export {

    System
};

export default System;
