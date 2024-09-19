import {EVENTCODES, EventGamepad, EventGamepadDigital, Stage, UTILS, Vibration} from '../index.js';

/**
 * Creates vibration systems.
 *
 * @example
 *
 * const system = new SystemVibration();
 */
class SystemVibration {

    /**
     * Stores the delay before a vibration ends.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    static DELAYVIBRATIONEND = 1000;

    /**
     * Stores the mapping between the playing vibrations and their elapsed time.
     * @type {Map<Vibration, number>}
     * @private
     */
    $mappingVibrationsPlaying;

    /**
     * Creates a new vibration system.
     */
    constructor() {

        this.$mappingVibrationsPlaying = new Map();
    }

    /**
     * Terminates the system.
     * @public
     */
    terminate() {

        window.dispatchEvent(new EventGamepadDigital('gamepadvibrate', EVENTCODES.GAMEPADXBOX.VIBRATEEND));
    }

    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    tick({$stage, $timetick}) {

        /**
         * @type {Array<Vibration>}
         */
        const previous = Array.from(this.$mappingVibrationsPlaying.keys());

        $stage.actors.forEach(($actor) => {

            /**
             * @type {Array<Vibration>}
             */
            const finished = [];

            $actor.vibrations.forEach(($vibration) => {

                if (this.$mappingVibrationsPlaying.has($vibration) === false) {

                    this.$mappingVibrationsPlaying.set($vibration, 0);

                    return;
                }

                const elapsedTime = this.$mappingVibrationsPlaying.get($vibration) + $timetick;

                if (elapsedTime >= $vibration.duration) {

                    finished.push($vibration);

                    return;
                }

                this.$mappingVibrationsPlaying.set($vibration, elapsedTime);

                UTILS.extract($vibration, previous);
            });

            finished.forEach(($vibration) => {

                $actor.removeVibration($vibration);
            });
        });

        previous.forEach(($vibration) => {

            this.$mappingVibrationsPlaying.delete($vibration);
        });

        /**
         * @type {Array<Vibration>}
         */
        const current = Array.from(this.$mappingVibrationsPlaying.keys());

        let intensityFrequencyHigh = 0;
        let intensityFrequencyLow = 0;

        current.forEach(($vibration) => {

            intensityFrequencyHigh = Math.max(intensityFrequencyHigh, $vibration.intensityFrequencyHigh);
            intensityFrequencyLow = Math.max(intensityFrequencyLow, $vibration.intensityFrequencyLow);
        });

        window.dispatchEvent(new EventGamepad('gamepadvibrate', EVENTCODES.GAMEPADXBOX.VIBRATESTART, new Vibration({

            $duration: SystemVibration.DELAYVIBRATIONEND,
            $intensityFrequencyHigh: intensityFrequencyHigh,
            $intensityFrequencyLow: intensityFrequencyLow
        })));
    }
}

export {

    SystemVibration
};

export default SystemVibration;
