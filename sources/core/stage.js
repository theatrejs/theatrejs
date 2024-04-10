import {Actor, UTILS} from '../index.js';

/**
 * Abstract Theatre.js stages.
 *
 * @example
 *
 * class StageExample extends Stage {}
 */
class Stage {

    /**
     * Stores the preloadable assets.
     * @type {string[]}
     * @public
     * @static
     */
    static preloadables = [];

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
     * Stores the lights.
     * @type {import('../index.js').Light[]}
     * @private
     */
    $lights;

    /**
     * Stores the point of view.
     * @type {import('../index.js').Actor}
     * @private
     */
    $pointOfView;

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
     * Gets the lights.
     * @type {import('../index.js').Light[]}
     * @public
     * @readonly
     */
    get lights() {

        return this.$lights;
    }

    /**
     * Gets the point of view.
     * @type {import('../index.js').Actor}
     * @public
     * @readonly
     */
    get pointOfView() {

        return this.$pointOfView;
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
        this.$lights = [];
        this.$pointOfView = this.createActor(Actor);
        this.$uuid = UTILS.uuid();
    }

    /**
     * Adds the given light.
     * @param {import('../index.js').Light} $light The light to add.
     * @returns {import('../index.js').Light}
     * @public
     */
    addLight($light) {

        this.$lights.push($light);

        return $light;
    }

    /**
     * Creates the given actor.
     * @param {typeof import('../index.js').Actor} [$actor] The actor to create.
     * @public
     */
    createActor($actor = Actor) {

        const actor = new $actor(this);

        this.$actors.push(actor);

        actor.onCreate();

        return actor;
    }

    /**
     * Checks if the stage has the given actor.
     * @param {import('../index.js').Actor} $actor The actor to check.
     * return {boolean}
     * @public
     */
    hasActor($actor) {

        return this.$actors.indexOf($actor) !== -1;
    }

    /**
     * Called when the stage is being created.
     * @public
     */
    onCreate() {}

    /**
     * Removes the given actor.
     * @param {import('../index.js').Actor} $actor The actor to remove.
     * @public
     */
    removeActor($actor) {

        $actor.onBeforeRemove();

        const index = this.$actors.indexOf($actor);

        if (index === -1) {

            return;
        }

        this.$actors.splice(index, 1);

        $actor.onAfterRemove();
    }

    /**
     * Removes the given light.
     * @param {import('../index.js').Light} $light The light to remove.
     * @returns {this}
     * @public
     */
    removeLight($light) {

        UTILS.extract($light, this.$lights);

        return this;
    }

    /**
     * Sets the given actor as the point of view.
     * @param {import('../index.js').Actor} $actor The actor to set as the point of view.
     * @public
     */
    setPointOfView($actor) {

        this.$pointOfView = $actor;
    }
}

export {

    Stage
};

export default Stage;
