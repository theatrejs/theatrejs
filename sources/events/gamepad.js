/**
 * Creates gamepad events.
 *
 * @example
 *
 * const event = new EventGamepad(type, code, data);
 */
class EventGamepad extends Event {

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
    $code;

    /**
     * Stores the data.
     * @type {typedatavibration}
     * @private
     */
    $data;

    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the data.
     * @type {typedatavibration}
     * @public
     */
    get data() {

        return this.$data;
    }

    /**
     * Creates a new gamepad event.
     * @param {('gamepadvibrate')} $type The event type.
     * @param {string} $code The event code.
     * @param {typedatavibration} $data The data.
     */
    constructor($type, $code, $data) {

        super($type);

        this.$code = $code;
        this.$data = $data;
    }
}

export {

    EventGamepad
};

export default EventGamepad;
