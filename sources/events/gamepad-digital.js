import {EVENT_TYPES} from '../index.js';

/**
 * Creates gamepad digital events.
 *
 * @example
 *
 * const event = new EventGamepadDigital(type, code);
 */
class EventGamepadDigital extends Event {

    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    $code;

    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    get code() {

        return this.$code;
    }

    /**
     * Creates a new gamepad digital event.
     * @param {(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT | EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN | EVENT_TYPES.GAMEPAD.GAMEPAD_UP | EVENT_TYPES.GAMEPAD.GAMEPAD_VIBRATE)} $type The event type.
     * @param {string} $code The event code.
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
