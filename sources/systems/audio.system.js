import {CURVES, Curve, MATHEMATICS, Sound, Stage, System, UTILS, Vector2} from '../index.js';

/**
 * The threshold of the attenuation value change before taking it into account.
 * @type {number}
 * @constant
 * @private
 */
const $THRESHOLD_ATTENUATION = 1 / 100;

/**
 * The threshold of the panning value change before taking it into account.
 * @type {number}
 * @constant
 * @private
 */
const $THRESHOLD_PANNING = 1 / 100;

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
     * @property {GainNode} $attenuation The attenuation gain node.
     * @property {AudioBufferSourceNode} $audio The audio buffer source node.
     * @property {StereoPannerNode} $panning The stereo panning node.
     * @property {number} $startTime The start time of the audio in the audio context timeline.
     * @property {GainNode} $volume The volume gain node.
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
            .map(($value) => ($volume * $value));

            this.$cacheValuesCurveFadeOut.set($volume, new Float32Array(values));
        }

        return this.$cacheValuesCurveFadeOut.get($volume);
    }

    /**
     * Creates the values for the transition curve.
     * @param {number} $source The source value.
     * @param {number} $target The target value.
     * @returns {Float32Array}
     * @private
     */
    $createValuesCurveTransition($source, $target) {

        const values = new Curve(CURVES.easeInOut(2))
        .getValues(SystemAudio.SAMPLES_CURVES)
        .map(($value) => ($source + ($target - $source) * $value));

        return new Float32Array(values);
    }

    /**
     * Gets the attenuation value of the sound from its distance from the given point of view.
     * @param {Vector2} $audio The position of the audio source.
     * @param {Vector2} $pointOfView The position of the point of view.
     * @param {number} $radius The radius within which the sound is audible.
     * @returns {number}
     * @private
     */
    $getAttenuation($audio, $pointOfView, $radius) {

        return MATHEMATICS.clamp(1 - Vector2.distanceEuclidean($pointOfView, $audio) / $radius);
    }

    /**
     * Gets the panning value of the sound from its position from the given point of view.
     * @param {Vector2} $audio The position of the audio source.
     * @param {Vector2} $pointOfView The position of the point of view.
     * @param {number} $framing The framing width (rendering resolution width).
     * @returns {number}
     * @private
     */
    $getPanning($audio, $pointOfView, $framing) {

        return MATHEMATICS.clamp(($audio.x - $pointOfView.x) / $framing, -1, 1);
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

        const {$attenuation, $audio, $panning, $startTime, $volume} = this.$mappingSoundsPlaying.get($sound);

        if ($sound.loop === false
        && this.$context.currentTime > $startTime + Math.max(0, $audio.buffer.duration - ($sound.durationFadeOut / 1000))) {

            return;
        }

        $volume.gain.cancelScheduledValues(this.$context.currentTime);
        $volume.gain.setValueCurveAtTime(

            this.$createValuesCurveFadeOut($sound.volume),
            this.$context.currentTime,
            Math.min($audio.buffer.duration, $sound.durationFadeOut / 1000)
        );

        $audio.stop(this.$context.currentTime + Math.min($audio.buffer.duration, $sound.durationFadeOut / 1000));

        this.$mappingSoundsPlaying.delete($sound);

        $audio.onended = () => {

            $volume.disconnect();
            $attenuation.disconnect();
            $panning.disconnect();
            $audio.disconnect();
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

        /**
         * @type {Array<Sound>}
         */
        const previous = Array.from(this.$mappingSoundsPlaying.keys());

        $stage.actors.forEach(($actor) => {

            $actor.sounds.forEach(($sound) => {

                if (this.$mappingSoundsPlaying.has($sound) === true) {

                    UTILS.extract($sound, previous);

                    const {$attenuation, $panning} = this.$mappingSoundsPlaying.get($sound);

                    const positionAudio = $actor.translation;
                    const positionPointOfView = $stage.pointOfView.translation;

                    if ($sound.stereo === true) {

                        const panningSource = $panning.pan.value;
                        const panningTarget = this.$getPanning(positionAudio, positionPointOfView, $stage.engine.getBoundariesFromFraming().halfSize.x);
                        const deltaPanning = panningTarget - panningSource;

                        if (Math.abs(deltaPanning) >= $THRESHOLD_PANNING) {

                            $panning.pan.cancelScheduledValues(this.$context.currentTime);
                            $panning.pan.setValueCurveAtTime(

                                this.$createValuesCurveTransition(panningSource, panningTarget),
                                this.$context.currentTime,
                                $timetick / 1000
                            );
                        }
                    }

                    if ($sound.radius < Number.POSITIVE_INFINITY) {

                        const attenuationSource = $attenuation.gain.value;
                        const attenuationTarget = this.$getAttenuation(positionAudio, positionPointOfView, $sound.radius);
                        const deltaAttenuation = attenuationTarget - attenuationSource;

                        if (Math.abs(deltaAttenuation) >= $THRESHOLD_ATTENUATION) {

                            $attenuation.gain.cancelScheduledValues(this.$context.currentTime);
                            $attenuation.gain.setValueCurveAtTime(

                                this.$createValuesCurveTransition(attenuationSource, attenuationTarget),
                                this.$context.currentTime,
                                $timetick / 1000
                            );
                        }
                    }

                    return;
                }

                this.$prepareAudio($sound.audio);

                if (this.$cacheAudios.has($sound.audio) === false) {

                    return;
                }

                if (this.$cacheAudios.get($sound.audio) === undefined) {

                    return;
                }

                const bufferAudio = this.$cacheAudios.get($sound.audio);

                const audio = this.$context.createBufferSource();
                audio.buffer = bufferAudio;

                const panning = this.$context.createStereoPanner();
                panning.pan.value = 0;

                if ($sound.stereo === true) {

                    panning.pan.value = this.$getPanning($actor.translation, $stage.pointOfView.translation, $stage.engine.getBoundariesFromFraming().halfSize.x);
                }

                const attenuation = this.$context.createGain();
                attenuation.gain.value = 1;

                if ($sound.radius < Number.POSITIVE_INFINITY) {

                    attenuation.gain.value = this.$getAttenuation($actor.translation, $stage.pointOfView.translation, $sound.radius);
                }

                const volume = this.$context.createGain();
                volume.gain.value = $sound.volume;

                audio.connect(panning);
                panning.connect(attenuation);
                attenuation.connect(volume);
                volume.connect(this.$context.destination);

                const timestamp = performance.now();

                UTILS.ready().then(() => {

                    const offset = performance.now() - timestamp;
                    audio.start(0, offset / 1000);
                });

                this.$mappingSoundsPlaying.set($sound, {

                    $audio: audio,
                    $attenuation: attenuation,
                    $panning: panning,
                    $startTime: this.$context.currentTime,
                    $volume: volume
                });

                if ($sound.loop === true) {

                    audio.loop = true;

                    return;
                }

                volume.gain.setValueCurveAtTime(

                    this.$createValuesCurveFadeOut($sound.volume),
                    this.$context.currentTime + Math.max(0, audio.buffer.duration - ($sound.durationFadeOut / 1000)),
                    Math.min(audio.buffer.duration, $sound.durationFadeOut / 1000)
                );

                audio.onended = () => {

                    volume.disconnect();
                    attenuation.disconnect();
                    panning.disconnect();
                    audio.disconnect();

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
