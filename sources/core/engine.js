import {CONTENTTYPES, Loop, Stage, SystemActor, SystemAudio, SystemCollision, SystemInput, SystemRender, UTILS, Vector2} from '../index.js';

/**
 * Creates Theatre.js game engines.
 *
 * @example
 *
 * const engine = new Engine({$container, $resolution});
 * engine.createStage(SceneExample);
 * engine.initiate(60);
 */
class Engine {

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the loop.
     * @type {import('../index.js').Loop}
     * @private
     */
    $loop;

    /**
     * Stores the next stage.
     * @type {typeof import('../index.js').Stage}
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
     * Stores the resolution.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $resolution;

    /**
     * Stores the current stage.
     * @type {import('../index.js').Stage}
     * @private
     */
    $stage;

    /**
     * Stores the current actor system.
     * @type {import('../index.js').SystemActor}
     * @private
     */
    $systemActor;

    /**
     * Stores the current audio system.
     * @type {import('../index.js').SystemAudio}
     * @private
     */
    $systemAudio;

    /**
     * Stores the current collision system.
     * @type {import('../index.js').SystemCollision}
     * @private
     */
    $systemCollision;

    /**
     * Stores the current input system.
     * @type {import('../index.js').SystemInput}
     * @private
     */
    $systemInput;

    /**
     * Stores the current render system.
     * @type {import('../index.js').SystemRender}
     * @private
     */
    $systemRender;

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
     * @readonly
     */
    get container() {

        return this.$container;
    }

    /**
     * Gets the current stage.
     * @type {import('../index.js').Stage}
     * @public
     * @readonly
     */
    get stage() {

        return this.$stage;
    }

    /**
     * Gets the uuid.
     * @type {string}
     * @public
     * @readonly
     */
    get uuid() {

        return this.$uuid;
    }

    /**
     * Creates a new Theatre.js game engine.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container for the game engine to create.
     * @param {import('../index.js').Vector2} [$parameters.$resolution] The rendering resolution to use.
     */
    constructor({$container, $resolution = new Vector2(320, 240)}) {

        this.$container = $container;
        this.$resolution = $resolution;

        this.$uuid = UTILS.uuid();

        this.$loop = new Loop(this.tick.bind(this));
        this.$preloaded = new Set();

        this.$systemActor = new SystemActor();
        this.$systemAudio = new SystemAudio();
        this.$systemCollision = new SystemCollision();
        this.$systemInput = new SystemInput({$container: this.$container});
        this.$systemRender = new SystemRender({$container: this.$container, $resolution: this.$resolution});
    }

    /**
     * Creates the given stage.
     * @param {typeof import('../index.js').Stage} $stage The stage to create.
     * @private
     */
    $createStage($stage) {

        this.$stage = new $stage(this);
        this.$stage.onCreate();
    }

    /**
     * Creates the given stage on the next tick update.
     * @param {typeof import('../index.js').Stage} $stage The stage to create on the next tick update.
     * @public
     */
    createStage($stage) {

        this.$next = $stage;
    }

    /**
     * @type {import('../index.js').SystemInput['getInput']}
     */
    getInput(...$parameters) {

        return this.$systemInput.getInput(...$parameters);
    }

    /**
     * @type {import('../index.js').SystemInput['getInputAnalog']}
     */
    getInputAnalog(...$parameters) {

        return this.$systemInput.getInputAnalog(...$parameters);
    }

    /**
     * Checks if the engine has loaded the given asset.
     * @param {string} $asset The asset source.
     * return {boolean}
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

        this.$loop.initiate($tickrateMinimum);

        this.$systemInput.initiate();
        this.$systemRender.initiate();
    }

    /**
     * Preloads the assets of the given stage.
     * @param {typeof import('../index.js').Stage} $stage The stage to preload the assets from.
     * @returns {Promise<(undefined | AudioBuffer | WebGLTexture)[]>}
     * @public
     */
    preloadStage($stage) {

        /**
         * @type {Promise<undefined | AudioBuffer | WebGLTexture>[]}
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
     * Terminates the engine (immediately) (must be used outside the lifecycle of this engine).
     * @public
     */
    terminate() {

        this.$loop.terminate();

        this.$createStage(Stage);
        this.tick(0);

        this.$systemInput.terminate();
        this.$systemRender.terminate();
        this.$systemAudio.terminate();
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

        this.$systemInput.tick();
        this.$systemActor.tick({

            $stage: this.$stage,
            $timetick: $timetick
        });
        this.$systemCollision.tick(this.$stage);
        this.$systemRender.tick(this.$stage);
        this.$systemAudio.tick(this.$stage);
    }
}

export {

    Engine
};

export default Engine;
