export default Sound;
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
export class Sound {
    /**
     * Creates a new sound.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$audio The audio source.
     * @param {number} [$parameters.$durationFadeOut] The fade out duration (in ms) (must be positive).
     * @param {boolean} [$parameters.$loop] The loop status.
     * @param {number} [$parameters.$volume] The volume.
     */
    constructor({ $audio, $durationFadeOut, $loop, $volume }: {
        $audio: string;
        $durationFadeOut?: number;
        $loop?: boolean;
        $volume?: number;
    });
    /**
     * Stores the audio source.
     * @type {string}
     * @private
     */
    private $audio;
    /**
     * Stores fade out duration.
     * @type {number}
     * @private
     */
    private $durationFadeOut;
    /**
     * Stores the loop status.
     * @type {boolean}
     * @private
     */
    private $loop;
    /**
     * Stores the volume.
     * @type {number}
     * @private
     */
    private $volume;
    /**
     * Gets the audio source.
     * @type {string}
     * @public
     */
    public get audio(): string;
    /**
     * Gets fade out duration (in ms) (must be positive).
     * @type {number}
     * @public
     */
    public get durationFadeOut(): number;
    /**
     * Gets the loop status.
     * @type {boolean}
     * @public
     */
    public get loop(): boolean;
    /**
     * Gets the volume.
     * @type {number}
     * @public
     */
    public get volume(): number;
}
