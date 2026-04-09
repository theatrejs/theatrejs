import {EVENT_CODES, EVENT_TYPES, EventMidi, Stage, System} from '../index.js';

/**
 * Creates MIDI messages systems.
 *
 * @example
 *
 * const system = new SystemMidi();
 */
class SystemMidi extends System {

    /**
     * Creates a new MIDI messages system.
     */
    constructor() {

        super();
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @public
     */
    onTick({$stage}) {

        $stage.actors.forEach(($actor) => {

            [...$actor.midis].forEach(($midi) => {

                window.dispatchEvent(new EventMidi(EVENT_TYPES.MIDI.MIDI_OUTPUT, EVENT_CODES.MIDI.MESSAGE, $midi));

                $actor.removeMidi($midi);
            });
        });
    }
}

export {

    SystemMidi
};

export default SystemMidi;
