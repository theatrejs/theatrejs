export default Vibration;
/**
 * Creates vibrations.
 *
 * @example
 *
 * const vibration = new Vibration({
 *
 *     $duration: 200,
 *     $intensityFrequencyHigh: 0.8,
 *     $intensityFrequencyLow: 0.2
 * });
 */
export class Vibration {
    /**
     * Creates a new vibration.
     * @param {Object} $parameters The given parameters.
     * @param {number} $parameters.$duration The duration (in ms).
     * @param {number} $parameters.$intensityFrequencyHigh The intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
     * @param {number} $parameters.$intensityFrequencyLow The intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
     */
    constructor({ $duration, $intensityFrequencyHigh, $intensityFrequencyLow }: {
        $duration: number;
        $intensityFrequencyHigh: number;
        $intensityFrequencyLow: number;
    });
    /**
     * Stores the duration.
     * @type {number}
     * @private
     */
    private $duration;
    /**
     * Stores the intensity of the high-frequency (weak) rumble motors.
     * @type {number}
     * @private
     */
    private $intensityFrequencyHigh;
    /**
     * Stores the intensity of the low-frequency (strong) rumble motors.
     * @type {number}
     * @private
     */
    private $intensityFrequencyLow;
    /**
     * Gets the duration (in ms).
     * @type {number}
     * @public
     */
    public get duration(): number;
    /**
     * Gets the intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
     * @type {number}
     * @public
     */
    public get intensityFrequencyHigh(): number;
    /**
     * Gets the intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
     * @type {number}
     * @public
     */
    public get intensityFrequencyLow(): number;
}
