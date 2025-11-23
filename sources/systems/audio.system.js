import {CURVES, Curve, Sound, Stage, System, UTILS} from '../index.js';

/**
 * Creates audio systems.
 *
 * @example
 *
 * const system = new SystemAudio();
 */
class SystemAudio extends System {

    /**
     * @typedef {object} TypeDataAudio An audio data.
     * @property {AudioBufferSourceNode} $audio The audio buffer source node.
     * @property {GainNode} $gain The gain.
     * @property {number} $startTime The start time of the audio in the audio context timeline.
     * @private
     */

    /**
     * Stores the safe delay before removing the audio context when the system terminates.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    static DELAY_CONTEXT_CLEAR_SAFE = 1000;

    /**
     * Stores the amount of samples needed for curves.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    static SAMPLES_CURVES = 128;

    /**
     * Stores the cache of the audio assets.
     * @type {Map<string, AudioBuffer>}
     * @private
     */
    $cacheAudios;

    /**
     * Stores the cache of the values for the fade-out curve.
     * @type {Map<number, Float32Array>}
     * @private
     */
    $cacheValuesCurveFadeOut;

    /**
     * Stores the audio context.
     * @type {AudioContext}
     * @private
     */
    $context;

    /**
     * Stores the mapping between the playing sounds and their audio data.
     * @type {Map<Sound, TypeDataAudio>}
     * @private
     */
    $mappingSoundsPlaying;

    /**
     * Creates a new audio system.
     */
    constructor() {

        super();
    }

    /**
     * Creates the values for the fade-out curve.
     * @param {number} $volume The volume of the sound.
     * @returns {Float32Array}
     * @private
     */
    $createValuesCurveFadeOut($volume) {

        if (this.$cacheValuesCurveFadeOut.has($volume) === false) {

            const values = new Curve(CURVES.invert(CURVES.easeOut(2)))
            .getValues(SystemAudio.SAMPLES_CURVES)
            .map(($value) => (- 1 + $volume * $value));

            this.$cacheValuesCurveFadeOut.set($volume, new Float32Array(values));
        }

        return this.$cacheValuesCurveFadeOut.get($volume);
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
            .then(($bufferArray) => (this.$context.decodeAudioData($bufferArray)))
            .then(($bufferAudio) => {

                this.$cacheAudios.set($content.url, $bufferAudio);

                $resolve($bufferAudio);
            });
        });

        return promise;
    }

    /**
     * Prepares the audio from the given audio source.
     * @param {string} $audio The audio source.
     * @private
     */
    $prepareAudio($audio) {

        if (this.$cacheAudios.has($audio) === true) {

            return;
        }

        this.$cacheAudios.set($audio, undefined);

        fetch($audio)
        .then(($content) => (this.$loadAudio($content)));
    }

    /**
     * Terminates the given sound.
     * @param {Sound} $sound The sound to terminate.
     * @private
     */
    $terminateSound($sound) {

        const {$audio, $gain, $startTime} = this.$mappingSoundsPlaying.get($sound);

        if ($sound.loop === false
        && this.$context.currentTime > $startTime + Math.max(0, $audio.buffer.duration - ($sound.durationFadeOut / 1000))) {

            return;
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
     * @returns {boolean}
     * @public
     */
    hasAssetLoaded($asset) {

        if (this.$initiated === false) {

            this.initiate();
        }

        return this.$cacheAudios.has($asset) === true;
    }

    /**
     * Loads the audio from the given audio file content.
     * @param {Response} $content The audio file content.
     * @returns {Promise<AudioBuffer>}
     * @public
     */
    loadAudio($content) {

        if (this.$initiated === false) {

            this.initiate();
        }

        if (this.$cacheAudios.has($content.url) === true) {

            const promise = new Promise(($resolve) => {

                const audio = this.$cacheAudios.get($content.url);

                $resolve(audio);
            });

            return promise;
        }

        this.$cacheAudios.set($content.url, undefined);

        return this.$loadAudio($content);
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {

        this.$cacheAudios = new Map();
        this.$cacheValuesCurveFadeOut = new Map();
        this.$context = new AudioContext();
        this.$mappingSoundsPlaying = new Map();
    }

    /**
     * Called when the system is being terminated.
     * @returns {(undefined | Promise<void>)}
     * @public
     */
    onTerminate() {

        let delayFadeOut = 0;

        Array.from(this.$mappingSoundsPlaying.keys()).forEach(($sound) => {

            if ($sound.durationFadeOut > delayFadeOut) {

                delayFadeOut = $sound.durationFadeOut;
            }

            this.$terminateSound($sound);
        });

        const promise = new Promise(($resolve) => {

            const handler = () => {

                this.$context.close()
                .then(() => {

                    this.$context = undefined;

                    $resolve();
                });
            };

            window.setTimeout(handler, delayFadeOut + SystemAudio.DELAY_CONTEXT_CLEAR_SAFE);
        });

        return promise;
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage, $timetick}) {

        void $timetick;

        /**
         * @type {Array<Sound>}
         */
        const previous = Array.from(this.$mappingSoundsPlaying.keys());

        $stage.actors.forEach(($actor) => {

            $actor.sounds.forEach(($sound) => {

                if (this.$mappingSoundsPlaying.has($sound) === true) {

                    UTILS.extract($sound, previous);

                    return;
                }

                this.$prepareAudio($sound.audio);

                if (typeof this.$cacheAudios.get($sound.audio) === 'undefined') {

                    return;
                }

                const bufferAudio = this.$cacheAudios.get($sound.audio);

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
