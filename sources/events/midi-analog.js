import {EVENT_TYPES} from '../index.js';

/**
 * Creates MIDI analog events.
 *
 * @example
 *
 * const event = new EventMidiAnalog(type, code, value);
 */
class EventMidiAnalog extends Event {

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
     * Creates a new MIDI analog event.
     * @param {(EVENT_TYPES.MIDI.MIDI_INPUT_ANALOG)} $type The event type.
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

    EventMidiAnalog
};

export default EventMidiAnalog;
