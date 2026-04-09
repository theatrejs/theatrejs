import {EVENT_TYPES} from '../index.js';

/**
 * Creates MIDI digital events.
 *
 * @example
 *
 * const event = new EventMidiDigital(type, code);
 */
class EventMidiDigital extends Event {

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
     * Creates a new MIDI digital event.
     * @param {(EVENT_TYPES.MIDI.MIDI_INPUT_DOWN | EVENT_TYPES.MIDI.MIDI_INPUT_UP)} $type The event type.
     * @param {string} $code The event code.
     */
    constructor($type, $code) {

        super($type);

        this.$code = $code;
    }
}

export {

    EventMidiDigital
};

export default EventMidiDigital;
