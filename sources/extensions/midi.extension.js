import {EVENT_CODES, EVENT_TYPES, EventMidi, EventMidiAnalog, EventMidiDigital, MIDI_STATUSES} from '../index.js';

/**
 * Creates MIDI extensions.
 *
 * @example
 *
 * ExtensionMidi.activate();
 */
class ExtensionMidi {

    /**
     * @callback TypeHandlerMidiMessage A MIDI message handler.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @protected
     *
     * @memberof ExtensionMidi
     */

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores the mapping between the MIDI statuses and their MIDI message handlers.
     * @type {Map<number, TypeHandlerMidiMessage>}
     * @private
     */
    $mappingHandlers;

    /**
     * Stores the MIDI state.
     * @type {(undefined | MIDIAccess)}
     * @private
     */
    $stateMidi;

    /**
     * Creates a new MIDI extension.
     * @protected
     */
    constructor() {

        this.$mappingHandlers = new Map();

        for (let $iterator = MIDI_STATUSES.NOTE_OFF_CHANNEL_ONE; $iterator <= MIDI_STATUSES.NOTE_OFF_CHANNEL_SIXTEEN; $iterator += 1) {

            this.$mappingHandlers.set($iterator, this.$onMidiMessageNoteOff.bind(this));
        }

        for (let $iterator = MIDI_STATUSES.NOTE_ON_CHANNEL_ONE; $iterator <= MIDI_STATUSES.NOTE_ON_CHANNEL_SIXTEEN; $iterator += 1) {

            this.$mappingHandlers.set($iterator, this.$onMidiMessageNoteOn.bind(this));
        }

        navigator.requestMIDIAccess()
        .then(($midi) => {

            this.$stateMidi = $midi;

            this.$stateMidi.inputs.values().forEach(($device) => {

                $device.addEventListener(EVENT_TYPES.MIDI.MIDI_MESSAGE, this.$onMidiDeviceInput.bind(this));
            });
        });

        window.addEventListener(EVENT_TYPES.MIDI.MIDI_OUTPUT, this.$onMidi.bind(this));
    }

    /**
     * Activates the extension.
     * @public
     * @static
     */
    static activate() {

        if (ExtensionMidi.$activated === true) {

            return;
        }

        new ExtensionMidi();

        ExtensionMidi.$activated = true;
    }

    /**
     * Called when a MIDI output message is needed.
     * @param {Event} $event The MIDI message event.
     * @private
     */
    $onMidi($event) {

        if (typeof this.$stateMidi === 'undefined') {

            return;
        }

        if ($event instanceof EventMidi
        && $event.code === EVENT_CODES.MIDI.MESSAGE) {

            this.$stateMidi.outputs.values().forEach(($device) => {

                $device.send([$event.midi.status, $event.midi.parameter, $event.midi.value]);
            });

            return;
        }
    }

    /**
     * Called when receiving inputs from MIDI devices.
     * @param {MIDIMessageEvent} $event The MIDI message event.
     * @private
     */
    $onMidiDeviceInput($event) {

        const [$status, $parameter, $value] = $event.data;

        if (this.$mappingHandlers.has($status) === false) {

            return;
        }

        const handler = this.$mappingHandlers.get($status);

        handler({

            $parameter: $parameter,
            $status: $status,
            $value: $value
        });
    }

    /**
     * Called to send MIDI 'Note Off' messages to MIDI devices.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @private
     */
    $onMidiMessageNoteOff({$status, $parameter, $value}) {

        const channel = ($status & 0x0F) + 1;
        const note = $parameter;
        const velocity = $value;

        window.dispatchEvent(new EventMidiDigital(EVENT_TYPES.MIDI.MIDI_INPUT_UP, 'Note' + channel + 'X' + note));
        window.dispatchEvent(new EventMidiAnalog(EVENT_TYPES.MIDI.MIDI_INPUT_ANALOG, 'Note' + channel + 'X' + note, velocity));
    }

    /**
     * Called to send MIDI 'Note On' messages to MIDI devices.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @private
     */
    $onMidiMessageNoteOn({$status, $parameter, $value}) {

        const channel = ($status & 0x0F) + 1;
        const note = $parameter;
        const velocity = $value;

        window.dispatchEvent(new EventMidiDigital(EVENT_TYPES.MIDI.MIDI_INPUT_DOWN, 'Note' + channel + 'X' + note));
        window.dispatchEvent(new EventMidiAnalog(EVENT_TYPES.MIDI.MIDI_INPUT_ANALOG, 'Note' + channel + 'X' + note, velocity));
    }
}

export {

    ExtensionMidi
};

export default ExtensionMidi;
