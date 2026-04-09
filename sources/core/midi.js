/**
 * Creates MIDI messages.
 *
 * @example
 *
 * const midi = new MIDI({
 *
 *     $status: MIDI_STATUSES.NOTE_ON_CHANNEL_ONE,
 *     $parameter: note,
 *     $value: velocity
 * });
 *
 * @see {@link https://midi.org/summary-of-midi-1-0-messages | MIDI 1.0 Specification Message Summary}
 */
class Midi {

    /**
     * Stores the parameter code.
     * @type {number}
     * @private
     */
    $parameter;

    /**
     * Stores the status code.
     * @type {number}
     * @private
     */
    $status;

    /**
     * Stores the value.
     * @type {number}
     * @private
     */
    $value;

    /**
     * Gets the parameter code.
     * @type {number}
     * @public
     */
    get parameter() {

        return this.$parameter;
    }

    /**
     * Gets the status code.
     * @type {number}
     * @public
     */
    get status() {

        return this.$status;
    }

    /**
     * Gets the value.
     * @type {number}
     * @public
     */
    get value() {

        return this.$value;
    }

    /**
     * Creates a new MIDI message.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$parameter The parameter code.
     * @param {number} $parameters.$status The status code.
     * @param {number} $parameters.$value The value.
     * @see {@link https://midi.org/summary-of-midi-1-0-messages | MIDI 1.0 Specification Message Summary}
     */
    constructor({$parameter, $status, $value}) {

        this.$parameter = $parameter;
        this.$status = $status;
        this.$value = $value;
    }
}

export {

    Midi
};

export default Midi;
