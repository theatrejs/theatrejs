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
class Vibration {

    /**
     * Stores the duration.
     * @type {number}
     * @private
     */
    $duration;

    /**
     * Stores the intensity of the high-frequency (weak) rumble motors.
     * @type {number}
     * @private
     */
    $intensityFrequencyHigh;

    /**
     * Stores the intensity of the low-frequency (strong) rumble motors.
     * @type {number}
     * @private
     */
    $intensityFrequencyLow;

    /**
     * Gets the duration (in ms).
     * @type {number}
     * @public
     * @readonly
     */
    get duration() {

        return this.$duration;
    }

    /**
     * Gets the intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
     * @type {number}
     * @public
     * @readonly
     */
    get intensityFrequencyHigh() {

        return this.$intensityFrequencyHigh;
    }

    /**
     * Gets the intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
     * @type {number}
     * @public
     * @readonly
     */
    get intensityFrequencyLow() {

        return this.$intensityFrequencyLow;
    }

    /**
     * Creates a new vibration.
     * @param {Object} $parameters The given parameters.
     * @param {number} $parameters.$duration The duration (in ms).
     * @param {number} $parameters.$intensityFrequencyHigh The intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
     * @param {number} $parameters.$intensityFrequencyLow The intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
     */
    constructor({$duration, $intensityFrequencyHigh, $intensityFrequencyLow}) {

        this.$duration = $duration;
        this.$intensityFrequencyHigh = $intensityFrequencyHigh;
        this.$intensityFrequencyLow = $intensityFrequencyLow;
    }
}

export {

    Vibration
};

export default Vibration;
