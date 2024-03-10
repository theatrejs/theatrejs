import {Loop, Stage, SystemActor} from '../index.js';

/**
 * Creates Theatre.js game engines.
 *
 * @example
 *
 * const engine = new Engine();
 * engine.create(SceneExample);
 * engine.start(60);
 */
class Engine {

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
     * Stores the current stage.
     * @type {import('../index.js').Stage}
     * @private
     */
    $stage;

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
     * Creates a stage.
     * @param {typeof import('../index.js').Stage} $stage The stage to create.
     * @private
     */
    $create($stage) {

        this.$stage = new $stage(this);
        this.$stage.onCreate();
    }

    /**
     * Creates the given stage on the next tick update.
     * @param {typeof import('../index.js').Stage} $stage The stage to create on the next tick update.
     * @public
     */
    create($stage) {

        this.$next = $stage;
    }

    /**
     * Starts the engine.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    start($tickrateMinimum = 60) {

        this.$loop = new Loop(this.tick.bind(this));
        this.$loop.update($tickrateMinimum);
    }

    /**
     * Stops the engine.
     * @public
     */
    stop() {

        if (typeof this.$loop !== 'undefined') {

            this.$loop.stop();
        }
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

            this.$create(stage);
        }

        SystemActor.tick({

            $stage: this.stage,
            $timetick: $timetick
        });
    }
}

export {

    Engine
};

export default Engine;
