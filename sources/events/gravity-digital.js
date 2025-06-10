import {EVENT_TYPES} from '../index.js';

/**
 * Creates gravity digital events.
 *
 * @example
 *
 * const event = new EventGravityDigital(type, code);
 */
class EventGravityDigital extends Event {

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
     * Creates a new gravity digital event.
     * @param {(EVENT_TYPES.GRAVITY.GRAVITY_DOWN | EVENT_TYPES.GRAVITY.GRAVITY_UP)} $type The event type.
     * @param {string} $code The event code.
     */
    constructor($type, $code) {

        super($type);

        this.$code = $code;
    }
}

export {

    EventGravityDigital
};

export default EventGravityDigital;
