/**
 * Creates gamepad analog events.
 *
 * @example
 *
 * const event = new EventGamepadAnalog(type, code, value);
 */
class EventGamepadAnalog extends Event {

    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    $code;

    /**
     * Stores the analog value.
     * @type {number}
     * @private
     */
    $value;

    /**
     * Gets the event code.
     * @type {string}
     * @public
     * @readonly
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the analog value.
     * @type {number}
     * @public
     * @readonly
     */
    get value() {

        return this.$value;
    }

    /**
     * Creates a new gamepad analog event.
     * @param {('gamepadanalog')} $type The event type.
     * @param {string} $code The event code.
     * @param {number} $value The analog value.
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
