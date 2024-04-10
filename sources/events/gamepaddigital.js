/**
 * Creates gamepad events.
 * @example
 * const event = new EventGamepadDigital(type, code);
 */
class EventGamepadDigital extends Event {

    /**
     * Stores the gamepad event code.
     * @type {string}
     * @private
     */
    $code;

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
     * Creates a new gamepad event.
     * @param {('gamepadconnect' | 'gamepaddown' | 'gamepadup')} $type The gamepad event type.
     * @param {string} $code The gamepad event code.
     */
    constructor($type, $code) {

        super($type);

        this.$code = $code;
    }
}

export {

    EventGamepadDigital
};

export default EventGamepadDigital;
