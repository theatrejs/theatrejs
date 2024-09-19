import {Actor, Engine, UTILS} from '../index.js';

/**
 * Abstract stages.
 *
 * @example
 *
 * class StageExample extends Stage {}
 */
class Stage {

    /**
     * Stores the preloadable assets.
     * @type {Array<string>}
     * @public
     * @static
     */
    static preloadables = [];

    /**
     * Stores the current actors.
     * @type {Array<Actor>}
     * @private
     */
    $actors;

    /**
     * Stores the current engine.
     * @type {Engine}
     * @private
     */
    $engine;

    /**
     * Stores the point of view.
     * @type {Actor}
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
     * @type {Array<Actor>}
     * @public
     */
    get actors() {

        return this.$actors;
    }

    /**
     * Gets the current engine.
     * @type {Engine}
     * @public
     */
    get engine() {

        return this.$engine;
    }

    /**
     * Gets the point of view.
     * @type {Actor}
     * @public
     */
    get pointOfView() {

        return this.$pointOfView;
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
     * Creates a new stage.
     * @param {Engine} $engine The engine on which to create the stage.
     */
    constructor($engine) {

        this.$engine = $engine;

        this.$actors = [];
        this.$pointOfView = this.createActor(Actor);
        this.$uuid = UTILS.uuid();
    }

    /**
     * Creates the given actor.
     * @param {typeof Actor} [$actor] The actor to create.
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
     * @param {Actor} $actor The actor to check.
     * @returns {boolean}
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
     * @param {Actor} $actor The actor to remove.
     * @public
     */
    removeActor($actor) {

        const index = this.$actors.indexOf($actor);

        if (index === -1) {

            return;
        }

        $actor.onBeforeRemove();

        this.$actors.splice(index, 1);

        $actor.onAfterRemove();
    }

    /**
     * Removes all actors.
     * @public
     */
    removeActors() {

        while (this.$actors.length > 0) {

            this.removeActor(this.$actors[0]);
        }
    }

    /**
     * Sets the given actor as the point of view.
     * @param {Actor} $actor The actor to set as the point of view.
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
