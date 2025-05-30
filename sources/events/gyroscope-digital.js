import {EVENT_TYPES} from '../index.js';

/**
 * Creates gyroscope digital events.
 *
 * @example
 *
 * const event = new EventGyroscopeDigital(type, code);
 */
class EventGyroscopeDigital extends Event {

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
     * Creates a new gyroscope digital event.
     * @param {(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN | EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP)} $type The event type.
     * @param {string} $code The event code.
     */
    constructor($type, $code) {

        super($type);

        this.$code = $code;
    }
}

export {

    EventGyroscopeDigital
};

export default EventGyroscopeDigital;
