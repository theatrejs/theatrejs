import {UTILS} from '../index.js';

/**
 * Creates audio systems.
 *
 * @example
 *
 * const system = new SystemAudio();
 */
class SystemAudio {

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
    static DELAYCONTEXTCLEARSAFE = 1000;

    /**
     * Stores the cache of the audio assets.
     * @type {Map<string, AudioBuffer>}
     * @private
     */
    $cache;

    /**
     * Stores the audio context.
     * @type {AudioContext}
     * @private
     */
    $context;

    /**
     * Stores the mapping between the playing sounds and their audio data.
     * @type {Map<import('../index.js').Sound, typedataaudio>}
     * @private
     */
    $mappingSoundsPlaying;

    /**
     * Creates a new audio system.
     */
    constructor() {

        this.$cache = new Map();
        this.$context = new AudioContext();
        this.$mappingSoundsPlaying = new Map();
    }

    /**
     * Creates the values for the fade out curve.
     * @param {number} $volume The volume of the sound.
     * @returns {number[]}
     * @private
     */
    $createValuesCurveFadeOut($volume) {

        return [

            - 1 + $volume * 1,
            - 1 + $volume * 0
        ];
    }

    /**
     * Loads the audio from the given audio file content.
     * @param {Response} $content The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @private
     */
    $loadAudio($content) {

        const promise = new Promise(($resolve) => {

            $content.arrayBuffer()
            .then(($bufferArray) => (this.$context.decodeAudioData($bufferArray))
            .then(($bufferAudio) => {

                this.$cache.set($content.url, $bufferAudio);

                $resolve($bufferAudio);
            }));
        });

        return promise;
    }

    /**
     * Prepares the audio from the given audio source.
     * @param {string} $audio The audio source.
     * @private
     */
    $prepareAudio($audio) {

        if (this.$cache.has($audio) === true) {

            return;
        }

        this.$cache.set($audio, undefined);

        fetch($audio)
        .then(($content) => (this.$loadAudio($content)));
    }

    /**
     * Terminates the given sound.
     * @param {import('../index.js').Sound} $sound The sound to terminate.
     * @private
     */
    $terminateSound($sound) {

        const {$audio, $gain, $startTime} = this.$mappingSoundsPlaying.get($sound);

        if ($sound.loop === false
        && this.$context.currentTime > $startTime + Math.max(0, $audio.buffer.duration - ($sound.durationFadeOut / 1000))) {

            return
        }

        $gain.gain.cancelScheduledValues(this.$context.currentTime);
        $gain.gain.setValueCurveAtTime(

            this.$createValuesCurveFadeOut($sound.volume),
            this.$context.currentTime,
            Math.min($audio.buffer.duration, $sound.durationFadeOut / 1000)
        );

        this.$mappingSoundsPlaying.delete($sound);

        $audio.onended = () => {

            $audio.disconnect();
            $gain.disconnect();
        };
    }

    /**
     * Checks if the system has loaded the given asset.
     * @param {string} $asset The asset source.
     * return {boolean}
     * @public
     */
    hasAssetLoaded($asset) {

        return this.$cache.has($asset) === true;
    }

    /**
     * Loads the audio from the given audio file content.
     * @param {Response} $content The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @public
     */
    loadAudio($content) {

        if (this.$cache.has($content.url) === true) {

            const promise = new Promise(($resolve) => {

                const audio = this.$cache.get($content.url);

                $resolve(audio);
            });

            return promise;
        }

        this.$cache.set($content.url, undefined);

        return this.$loadAudio($content);
    }

    /**
     * Terminates the system.
     * @public
     */
    terminate() {

        let delayFadeOut = 0;

        Array.from(this.$mappingSoundsPlaying.keys()).forEach(($sound) => {

            if ($sound.durationFadeOut > delayFadeOut) {

                delayFadeOut = $sound.durationFadeOut;
            }

            this.$terminateSound($sound);
        });

        window.setTimeout(() => {

            this.$context.close();
            this.$context = undefined;

        }, delayFadeOut + SystemAudio.DELAYCONTEXTCLEARSAFE);
    }

    /**
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    tick($stage) {

        /**
         * @type {import('../index.js').Sound[]}
         */
        const previous = Array.from(this.$mappingSoundsPlaying.keys());

        $stage.actors.forEach(($actor) => {

            $actor.sounds.forEach(($sound) => {

                if (this.$mappingSoundsPlaying.has($sound) === true) {

                    UTILS.extract($sound, previous);

                    return;
                }

                this.$prepareAudio($sound.audio);

                if (typeof this.$cache.get($sound.audio) === 'undefined') {

                    return;
                }

                const bufferAudio = this.$cache.get($sound.audio);

                const audio = this.$context.createBufferSource();
                audio.buffer = bufferAudio;
                audio.connect(this.$context.destination);
                audio.start(0);

                const gain = this.$context.createGain();
                gain.gain.value = $sound.volume - 1;
                gain.connect(this.$context.destination);

                audio.connect(gain);

                this.$mappingSoundsPlaying.set($sound, {

                    $audio: audio,
                    $gain: gain,
                    $startTime: this.$context.currentTime
                });

                if ($sound.loop === true) {

                    audio.loop = true;

                    return;
                }

                gain.gain.setValueCurveAtTime(

                    this.$createValuesCurveFadeOut($sound.volume),
                    this.$context.currentTime + Math.max(0, audio.buffer.duration - ($sound.durationFadeOut / 1000)),
                    Math.min(audio.buffer.duration, $sound.durationFadeOut / 1000)
                );

                audio.onended = () => {

                    audio.disconnect();
                    gain.disconnect();

                    this.$mappingSoundsPlaying.delete($sound);

                    $actor.removeSound($sound);
                    $actor.onSoundFinish($sound);
                };
            });
        });

        previous.forEach(($sound) => {

            this.$terminateSound($sound);
        });
    }
}

export {

    SystemAudio
};

export default SystemAudio;
