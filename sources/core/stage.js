import {UTILS} from '../index.js';

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
     * Stores the uuid.
     * @type {string}
     * @private
     */
    $uuid;

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
     * Gets the uuid.
     * @type {string}
     * @public
     * @readonly
     */
    get uuid() {

        return this.$uuid;
    }

    /**
     * Creates a new Theatre.js stage.
     * @param {import('../index.js').Engine} $engine The engine on which to create the stage.
     */
    constructor($engine) {

        this.$engine = $engine;

        this.$actors = [];
        this.$uuid = UTILS.uuid();
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

    /**
     * Removes the given actor.
     * @param {import('../index.js').Actor} $actor The actor to remove.
     * @public
     */
    remove($actor) {

        $actor.onBeforeRemove();

        const index = this.$actors.indexOf($actor);

        if (index === -1) {

            return;
        }

        this.$actors.splice(index, 1);

        $actor.onAfterRemove();
    }
}

export {

    Stage
};

export default Stage;
