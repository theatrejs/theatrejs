export default SystemAudio;
/**
 * Creates audio systems.
 *
 * @example
 *
 * const system = new SystemAudio();
 */
export class SystemAudio {
    /**
     * @typedef {Object} typedataaudio The audio data.
     * @property {AudioBufferSourceNode} typeaudio.$audio The audio buffer source node.
     * @property {GainNode} typeaudio.$gain The gain.
     * @property {number} typeaudio.$startTime The start time of the audio in the audio context timeline.
     */
    /**
     * Stores the safe delay before removing the audio context when the system terminates.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    public static readonly DELAYCONTEXTCLEARSAFE: number;
    /**
     * Stores the cache of the audio assets.
     * @type {Map<string, AudioBuffer>}
     * @private
     */
    private $cache;
    /**
     * Stores the audio context.
     * @type {AudioContext}
     * @private
     */
    private $context;
    /**
     * Stores the mapping between the playing sounds and their audio data.
     * @type {Map<import('../index.js').Sound, typedataaudio>}
     * @private
     */
    private $mappingSoundsPlaying;
    /**
     * Creates the values for the fade out curve.
     * @param {number} $volume The volume of the sound.
     * @returns {number[]}
     * @private
     */
    private $createValuesCurveFadeOut;
    /**
     * Loads the audio from the given audio file content.
     * @param {Response} $content The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @private
     */
    private $loadAudio;
    /**
     * Prepares the audio from the given audio source.
     * @param {string} $audio The audio source.
     * @private
     */
    private $prepareAudio;
    /**
     * Terminates the given sound.
     * @param {import('../index.js').Sound} $sound The sound to terminate.
     * @private
     */
    private $terminateSound;
    /**
     * Checks if the system has loaded the given asset.
     * @param {string} $asset The asset source.
     * return {boolean}
     * @public
     */
    public hasAssetLoaded($asset: string): boolean;
    /**
     * Loads the audio from the given audio file content.
     * @param {Response} $content The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @public
     */
    public loadAudio($content: Response): Promise<AudioBuffer>;
    /**
     * Terminates the system.
     * @public
     */
    public terminate(): void;
    /**
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    public tick($stage: import("../index.js").Stage): void;
}
