import {EVENT_TYPES, Midi} from '../index.js';

/**
 * Creates MIDI events.
 *
 * @example
 *
 * const event = new EventMidi(type, code, midi);
 */
class EventMidi extends Event {

    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    $code;

    /**
     * Stores the MIDI message.
     * @type {Midi}
     * @private
     */
    $midi;

    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    get code() {

        return this.$code;
    }

    /**
     * Gets the MIDI message.
     * @type {Midi}
     * @public
     */
    get midi() {

        return this.$midi;
    }

    /**
     * Creates a new MIDI event.
     * @param {(EVENT_TYPES.MIDI.MIDI_OUTPUT)} $type The event type.
     * @param {string} $code The event code.
     * @param {Midi} $midi The MIDI message.
     */
    constructor($type, $code, $midi) {

        super($type);

        this.$code = $code;
        this.$midi = $midi;
    }
}

export {

    EventMidi
};

export default EventMidi;
