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
     * @type {Map<string, Promise<AudioBuffer>>}
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
     * Loads the audio file content from the given audio source.
     * @param {string} $audio The audio source.
     * @returns {Promise<AudioBuffer>}
     * @private
     */
    $load($audio) {

        if (this.$cache.has($audio) === true) {

            return this.$cache.get($audio);
        }

        const promise = fetch($audio)
        .then(($response) => ($response.arrayBuffer()))
        .then(($bufferArray) => (this.$context.decodeAudioData($bufferArray)));

        this.$cache.set($audio, promise);

        return promise;
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
     * Preloads the audio file content from the given audio source.
     * @param {string} $audio The audio source.
     * @param {Response} $response The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @public
     */
    preload($audio, $response) {

        const promise = $response.arrayBuffer()
        .then(($bufferArray) => (this.$context.decodeAudioData($bufferArray)));

        this.$cache.set($audio, promise);

        return promise;
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

        setTimeout(() => {

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

                this.$mappingSoundsPlaying.set($sound, undefined);

                this.$load($sound.audio)
                .then(($bufferAudio) => {

                    if (this.$mappingSoundsPlaying.has($sound) === false) {

                        return;
                    }

                    const audio = this.$context.createBufferSource();
                    audio.buffer = $bufferAudio;
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
