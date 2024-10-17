import {CONTENTTYPES, Loop, Stage, SystemActor, SystemAudio, SystemCollision, SystemInput, SystemRender, SystemVibration, UTILS, Vector2, Vector3} from '../index.js';

/**
 * Creates game engines.
 *
 * @example
 *
 * const engine = new Engine({$color, $container, $resolution});
 * engine.initiate(60);
 *
 * await engine.preloadStage(SceneExample);
 *
 * engine.createStage(SceneExample);
 */
class Engine {

    /**
     * Stores the rendering background color.
     * @type {Vector3}
     * @private
     */
    $color;

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the loop.
     * @type {Loop}
     * @private
     */
    $loop;

    /**
     * Stores the next stage.
     * @type {typeof Stage}
     * @private
     */
    $next;

    /**
     * Stores the preloaded status of the assets.
     * @type {Set<string>}
     * @private
     */
    $preloaded;

    /**
     * Stores the rendering resolution.
     * @type {Vector2}
     * @private
     */
    $resolution;

    /**
     * Stores the current stage.
     * @type {Stage}
     * @private
     */
    $stage;

    /**
     * Stores the current actor system.
     * @type {SystemActor}
     * @private
     */
    $systemActor;

    /**
     * Stores the current audio system.
     * @type {SystemAudio}
     * @private
     */
    $systemAudio;

    /**
     * Stores the current collision system.
     * @type {SystemCollision}
     * @private
     */
    $systemCollision;

    /**
     * Stores the current input system.
     * @type {SystemInput}
     * @private
     */
    $systemInput;

    /**
     * Stores the current render system.
     * @type {SystemRender}
     * @private
     */
    $systemRender;

    /**
     * Stores the current vibration system.
     * @type {SystemVibration}
     * @private
     */
    $systemVibration;

    /**
     * Stores the uuid.
     * @type {string}
     * @private
     */
    $uuid;

    /**
     * Gets the container.
     * @type {HTMLElement}
     * @public
     */
    get container() {

        return this.$container;
    }

    /**
     * Gets the current stage.
     * @type {Stage}
     * @public
     */
    get stage() {

        return this.$stage;
    }

    /**
     * Gets the uuid.
     * @type {string}
     * @public
     */
    get uuid() {

        return this.$uuid;
    }

    /**
     * Creates a new game engine.
     * @param {Object} $parameters The given parameters.
     * @param {Vector3} [$parameters.$color] The rendering background color to use.
     * @param {HTMLElement} $parameters.$container The container for the game engine to create.
     * @param {Vector2} [$parameters.$resolution] The rendering resolution to use.
     */
    constructor({$color = new Vector3(0, 0, 0), $container, $resolution = new Vector2(320, 240)}) {

        this.$color = $color;
        this.$container = $container;
        this.$resolution = $resolution;

        this.$uuid = UTILS.uuid();

        this.$loop = new Loop(this.tick.bind(this));
        this.$preloaded = new Set();

        this.$systemActor = new SystemActor();
        this.$systemAudio = new SystemAudio();
        this.$systemCollision = new SystemCollision();
        this.$systemInput = new SystemInput({$container: this.$container});
        this.$systemRender = new SystemRender({$color: this.$color, $container: this.$container, $resolution: this.$resolution});
        this.$systemVibration = new SystemVibration();
    }

    /**
     * Creates the given stage.
     * @param {typeof Stage} $stage The stage to create.
     * @private
     */
    $createStage($stage) {

        this.$stage = new $stage(this);
        this.$stage.onCreate();
    }

    /**
     * Creates the given stage on the next tick update.
     * @param {typeof Stage} $stage The stage to create on the next tick update.
     * @public
     */
    createStage($stage) {

        this.$next = $stage;
    }

    /**
     * Gets the current input state value of the given digital input.
     * @param {string} $input The event code of the given digital input.
     * @returns {boolean}
     * @public
     */
    getInput($input) {

        return this.$systemInput.getInput($input);
    }

    /**
     * Gets the current input state value of the given analog input.
     * @param {string} $input The event code of the given analog input.
     * @returns {number}
     * @public
     */
    getInputAnalog($input) {

        return this.$systemInput.getInputAnalog($input);
    }

    /**
     * Checks if the engine has loaded the given asset.
     * @param {string} $asset The asset source.
     * @returns {boolean}
     * @public
     */
    hasAssetLoaded($asset) {

        return this.$preloaded.has($asset) === true;
    }

    /**
     * Initiates the engine.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    initiate($tickrateMinimum = 60) {

        this.$systemInput.initiate();
        this.$systemActor.initiate();
        this.$systemCollision.initiate();
        this.$systemRender.initiate();
        this.$systemAudio.initiate();
        this.$systemVibration.initiate();

        this.$loop.initiate($tickrateMinimum);
    }

    /**
     * Preloads the assets of the given stage.
     * @param {typeof Stage} $stage The stage to preload the assets from.
     * @returns {Promise<Array<undefined | AudioBuffer | WebGLTexture>>}
     * @public
     */
    preloadStage($stage) {

        /**
         * @type {Array<Promise<undefined | AudioBuffer | WebGLTexture>>}
         */
        const promises = [];

        UTILS.deduplicate($stage.preloadables).forEach(($asset) => {

            if (this.hasAssetLoaded($asset) === true) {

                return;
            }

            this.$preloaded.add($asset);

            if (this.$systemAudio.hasAssetLoaded($asset) === true) {

                return;
            }

            if (this.$systemRender.hasAssetLoaded($asset) === true) {

                return;
            }

            /**
             * @type {Promise<undefined | AudioBuffer | WebGLTexture>}
             */
            const promise = new Promise(($resolve) => {

                fetch($asset)
                .then(($content) => {

                    const contentType = $content.headers.get('Content-Type');

                    switch(contentType) {

                        case CONTENTTYPES.IMAGEJPEG:
                        case CONTENTTYPES.IMAGEPNG: {

                            this.$systemRender.loadTexture($content)
                            .then(($texture) => {

                                $resolve($texture);
                            });

                            break;
                        }

                        case CONTENTTYPES.AUDIOMPEG:
                        case CONTENTTYPES.AUDIOWAVE: {

                            this.$systemAudio.loadAudio($content)
                            .then(($bufferAudio) => {

                                $resolve($bufferAudio);
                            });

                            break;
                        }

                        default: {

                            $resolve(undefined);
                        }
                    }
                });
            });

            promises.push(promise);
        });

        return Promise.all(promises);
    }

    /**
     * Sets the rendering background color.
     * @param {Vector3} $color The rendering background color to set.
     * @public
     */
    setColor($color) {

        return this.$systemRender.setColor($color);
    }

    /**
     * Sets the rendering resolution.
     * @param {Vector2} $resolution The rendering resolution to set.
     * @public
     */
    setResolution($resolution) {

        return this.$systemRender.setResolution($resolution);
    }

    /**
     * Terminates the engine (immediately) (must be used outside the lifecycle of this engine).
     * @public
     */
    terminate() {

        this.$loop.terminate();

        this.$createStage(Stage);
        this.tick(0);

        this.$systemInput.terminate();
        this.$systemActor.terminate();
        this.$systemCollision.terminate();
        this.$systemRender.terminate();
        this.$systemAudio.terminate();
        this.$systemVibration.terminate();

        this.$preloaded = new Set();
    }

    /**
     * Updates each system once.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    tick($timetick) {

        if (typeof this.$next === typeof Stage) {

            const stage = this.$next;

            this.$next = undefined;

            this.$createStage(stage);
        }

        if (typeof this.$stage === 'undefined') {

            return;
        }

        this.$systemInput.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });

        this.$systemActor.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });

        this.$systemCollision.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });

        this.$systemRender.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });

        this.$systemAudio.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });

        this.$systemVibration.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });
    }
}

export {

    Engine
};

export default Engine;
