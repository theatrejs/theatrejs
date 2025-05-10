import {EVENTTYPES, Vibration} from '../index.js';

/**
 * Creates gamepad events.
 *
 * @example
 *
 * const event = new EventGamepad(type, code, vibration);
 */
class EventGamepad extends Event {

    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    $code;

    /**
     * Stores the vibration.
     * @type {Vibration}
     * @private
     */
    $vibration;

    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the vibration.
     * @type {Vibration}
     * @public
     */
    get vibration() {

        return this.$vibration;
    }

    /**
     * Creates a new gamepad event.
     * @param {(EVENTTYPES.GAMEPAD.GAMEPAD_VIBRATE)} $type The event type.
     * @param {string} $code The event code.
     * @param {Vibration} $vibration The vibration.
     */
    constructor($type, $code, $vibration) {

        super($type);

        this.$code = $code;
        this.$vibration = $vibration;
    }
}

export {

    EventGamepad
};

export default EventGamepad;
