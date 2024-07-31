export default SystemVibration;
/**
 * Creates vibration systems.
 *
 * @example
 *
 * const system = new SystemVibration();
 */
export class SystemVibration {
    /**
     * Stores the delay before a vibration ends.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    public static readonly DELAYVIBRATIONEND: number;
    /**
     * Stores the mapping between the playing vibrations and their elapsed time.
     * @type {Map<import('../index.js').Vibration, number>}
     * @private
     */
    private $mappingVibrationsPlaying;
    /**
     * Terminates the system.
     * @public
     */
    public terminate(): void;
    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    public tick({ $stage, $timetick }: {
        $stage: import("../index.js").Stage;
        $timetick: number;
    }): void;
}
