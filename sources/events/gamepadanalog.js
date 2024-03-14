/**
 * Creates gamepad events.
 * @example
 * const event = new EventGamepadAnalog(type, code, value);
 */
class EventGamepadAnalog extends Event {

    /**
     * Stores the gamepad event code.
     * @type {string}
     * @private
     */
    $code;

    /**
     * Stores the gamepad event analog value.
     * @type {number}
     * @private
     */
    $value;

    /**
     * Gets the gamepad event code.
     * @type {string}
     * @public
     * @readonly
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the gamepad event analog value.
     * @type {number}
     * @public
     * @readonly
     */
    get value() {

        return this.$value;
    }

    /**
     * Creates a new gamepad event.
     * @param {('gamepadanalog')} $type The gamepad event type.
     * @param {string} $code The gamepad event code.
     * @param {number} $value The gamepad event analog value.
     */
    constructor($type, $code, $value) {

        super($type);

        this.$code = $code;
        this.$value = $value;
    }
}

export {

    EventGamepadAnalog
};

export default EventGamepadAnalog;
