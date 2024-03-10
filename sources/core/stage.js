/**
 * Abstract Theatre.js stages.
 *
 * @example
 *
 * class StageExample extends Stage {}
 */
class Stage {

    /**
     * Stores the current actors.
     * @type {import('../index.js').Actor[]}
     * @private
     */
    $actors;

    /**
     * Stores the current engine.
     * @type {import('../index.js').Engine}
     * @private
     */
    $engine;

    /**
     * Gets the current actors.
     * @type {import('../index.js').Actor[]}
     * @public
     * @readonly
     */
    get actors() {

        return this.$actors;
    }

    /**
     * Gets the current engine.
     * @type {import('../index.js').Engine}
     * @public
     * @readonly
     */
    get engine() {

        return this.$engine;
    }

    /**
     * Creates a new Theatre.js stage.
     * @param {import('../index.js').Engine} $engine The engine on which to create the stage.
     */
    constructor($engine) {

        this.$engine = $engine;

        this.$actors = [];
    }

    /**
     * Creates the given actor.
     * @param {typeof import('../index.js').Actor} $actor The actor to create.
     * @public
     */
    create($actor) {

        const actor = new $actor(this);

        this.$actors.push(actor);

        actor.onCreate();

        return actor;
    }

    /**
     * Called when the stage is being created..
     * @public
     */
    onCreate() {}
}

export {

    Stage
};

export default Stage;
