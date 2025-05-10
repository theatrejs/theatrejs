import {EVENT_TYPES} from '../index.js';

/**
 * Creates pointer analog events.
 *
 * @example
 *
 * const event = new EventPointerAnalog(type, code, value);
 */
class EventPointerAnalog extends Event {

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
     * Creates a new pointer analog event.
     * @param {(EVENT_TYPES.POINTER.POINTER_ANALOG)} $type The event type.
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

    EventPointerAnalog
};

export default EventPointerAnalog;
