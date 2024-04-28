import {CONTENTTYPES, Loop, Stage, SystemActor, SystemCollision, SystemInput, SystemRender, UTILS, Vector2} from '../index.js';

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

        this.$systemActor = new SystemActor();
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
     * @returns {Promise<void[]>}
     * @public
     */
    preloadStage($stage) {

        /**
         * @type {Promise<void>[]}
         */
        const promises = [];

        UTILS.deduplicate($stage.preloadables).forEach(($asset) => {

            /**
             * @type {Promise<void>}
             */
            const promise = new Promise((resolve) => {

                fetch($asset).then(($response) => {

                    const contentType = $response.headers.get('Content-Type');

                    switch(contentType) {

                        case CONTENTTYPES.JPEG:
                        case CONTENTTYPES.PNG: {

                            this.$systemRender.preload($asset);

                            break;
                        }
                    }

                    resolve();
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
    }
}

export {

    Engine
};

export default Engine;
