export default EventGamepad;
/**
 * Creates gamepad events.
 *
 * @example
 *
 * const event = new EventGamepad(type, code, data);
 */
export class EventGamepad extends Event {
    /**
     * Creates a new gamepad event.
     * @param {('gamepadvibrate')} $type The event type.
     * @param {string} $code The event code.
     * @param {typedatavibration} $data The data.
     */
    constructor($type: ("gamepadvibrate"), $code: string, $data: {
        /**
         * The duration of the vibration (in ms).
         */
        $duration: number;
        /**
         * The intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
         */
        $intensityFrequencyHigh: number;
        /**
         * The intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
         */
        $intensityFrequencyLow: number;
    });
    /**
     * @typedef {Object} typedatavibration The event data.
     * @property {number} typedatavibration.$duration The duration of the vibration (in ms).
     * @property {number} typedatavibration.$intensityFrequencyHigh The intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
     * @property {number} typedatavibration.$intensityFrequencyLow The intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
     */
    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    private $code;
    /**
     * Stores the data.
     * @type {typedatavibration}
     * @private
     */
    private $data;
    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    public get code(): string;
    /**
     * Gets the data.
     * @type {typedatavibration}
     * @public
     */
    public get data(): {
        /**
         * The duration of the vibration (in ms).
         */
        $duration: number;
        /**
         * The intensity of the high-frequency (weak) rumble motors (with value in [0, 1] range).
         */
        $intensityFrequencyHigh: number;
        /**
         * The intensity of the low-frequency (strong) rumble motors (with value in [0, 1] range).
         */
        $intensityFrequencyLow: number;
    };
}
