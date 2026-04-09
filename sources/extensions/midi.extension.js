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

        for (let $iterator = MIDI_STATUSES.CONTROL_CHANGE_CHANNEL_ONE; $iterator <= MIDI_STATUSES.CONTROL_CHANGE_CHANNEL_SIXTEEN; $iterator += 1) {

            this.$mappingHandlers.set($iterator, this.$onMidiMessageControlChange.bind(this));
        }

        for (let $iterator = MIDI_STATUSES.PROGRAM_CHANGE_CHANNEL_ONE; $iterator <= MIDI_STATUSES.PROGRAM_CHANGE_CHANNEL_SIXTEEN; $iterator += 1) {

            this.$mappingHandlers.set($iterator, this.$onMidiMessageProgramChange.bind(this));
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

            const {parameter, status, value} = $event.midi;

            const data = [status];

            if (typeof parameter !== 'undefined') {

                data.push(parameter);

                if (typeof value !== 'undefined') {

                    data.push(value);
                }
            }

            this.$stateMidi.outputs.values().forEach(($device) => {

                $device.send([...data]);
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
     * Called to send MIDI 'Control Change' messages to MIDI devices.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @private
     */
    $onMidiMessageControlChange({$status, $parameter, $value}) {

        const channel = ($status & 0x0F) + 1;
        const control = $parameter;
        const value = $value;

        window.dispatchEvent(new EventMidiDigital(EVENT_TYPES.MIDI.MIDI_INPUT_DOWN, 'Control' + channel + 'X' + control));
        window.dispatchEvent(new EventMidiAnalog(EVENT_TYPES.MIDI.MIDI_INPUT_ANALOG, 'Control' + channel + 'X' + control, value));
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

    /**
     * Called to send MIDI 'Program Change' messages to MIDI devices.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @private
     */
    $onMidiMessageProgramChange({$status, $parameter}) {

        const channel = ($status & 0x0F) + 1;
        const program = $parameter;

        window.dispatchEvent(new EventMidiDigital(EVENT_TYPES.MIDI.MIDI_INPUT_DOWN, 'Program' + channel + 'X' + program));
        window.dispatchEvent(new EventMidiAnalog(EVENT_TYPES.MIDI.MIDI_INPUT_ANALOG, 'Program' + channel + 'X' + program, 1));
    }
}

export {

    ExtensionMidi
};

export default ExtensionMidi;
