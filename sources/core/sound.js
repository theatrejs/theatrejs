/**
 * Creates sounds.
 *
 * @example
 *
 * // minimal
 * const sound = new Sound({
 *
 *     $audio: audio
 * });
 *
 * @example
 *
 * // full
 * const sound = new Sound({
 *
 *     $audio: audio,
 *     $durationFadeOut: 125,
 *     $loop: false,
 *     $volume: 1
 * });
 */
class Sound {

    /**
     * Stores the audio source.
     * @type {string}
     * @private
     */
    $audio;

    /**
     * Stores fade out duration.
     * @type {number}
     * @private
     */
    $durationFadeOut;

    /**
     * Stores the loop status.
     * @type {boolean}
     * @private
     */
    $loop;

    /**
     * Stores the volume.
     * @type {number}
     * @private
     */
    $volume;

    /**
     * Gets the audio source.
     * @type {string}
     * @public
     * @readonly
     */
    get audio() {

        return this.$audio;
    }

    /**
     * Gets fade out duration (in ms) (must be positive).
     * @type {number}
     * @public
     * @readonly
     */
    get durationFadeOut() {

        return this.$durationFadeOut;
    }

    /**
     * Gets the loop status.
     * @type {boolean}
     * @public
     * @readonly
     */
    get loop() {

        return this.$loop;
    }

    /**
     * Gets the volume.
     * @type {number}
     * @public
     * @readonly
     */
    get volume() {

        return this.$volume;
    }

    /**
     * Creates a new sound.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$audio The audio source.
     * @param {number} [$parameters.$durationFadeOut] The fade out duration (in ms) (must be positive).
     * @param {boolean} [$parameters.$loop] The loop status.
     * @param {number} [$parameters.$volume] The volume.
     */
    constructor({$audio, $durationFadeOut = 1000 / 60, $loop = false, $volume = 1}) {

        this.$audio = $audio;
        this.$durationFadeOut = $durationFadeOut;
        this.$loop = $loop;
        this.$volume = $volume;
    }
}

export {

    Sound
};

export default Sound;
