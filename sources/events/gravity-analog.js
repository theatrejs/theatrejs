import {EVENT_TYPES} from '../index.js';

/**
 * Creates gravity analog events.
 *
 * @example
 *
 * const event = new EventGravityAnalog(type, code, value);
 */
class EventGravityAnalog extends Event {

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
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the analog value.
     * @type {number}
     * @public
     */
    get value() {

        return this.$value;
    }

    /**
     * Creates a new gravity analog event.
     * @param {(EVENT_TYPES.GRAVITY.GRAVITY_ANALOG)} $type The event type.
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

    EventGravityAnalog
};

export default EventGravityAnalog;
