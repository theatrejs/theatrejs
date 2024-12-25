/**
 * Creates pointer digital events.
 *
 * @example
 *
 * const event = new EventPointerDigital(type, code);
 */
class EventPointerDigital extends Event {

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
     * Creates a new pointer digital event.
     * @param {('pointerdown' | 'pointerup')} $type The event type.
     * @param {string} $code The event code.
     */
    constructor($type, $code) {

        super($type);

        this.$code = $code;
    }
}

export {

    EventPointerDigital
};

export default EventPointerDigital;