// 'ESLint' configuration
/* global TypeGenericAction */
/* global TypeGenericState */

import {Actor, Engine, Preloadable, UTILS} from '../index.js';

/**
 * The identifier of the 'origin' actor.
 * @type {string}
 * @constant
 * @private
 */
const $IDENTIFIER_ACTOR_ORIGIN = '$origin';

/**
 * Abstract stages.
 *
 * @example
 *
 * class StageExample extends Stage {}
 */
class Stage extends Preloadable {

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
     * Stores the 'origin' actor (not attached).
     * @type {Actor}
     * @private
     */
    $origin;

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
     * Gets the 'origin' actor (not attached).
     * @type {Actor}
     * @public
     */
    get origin() {

        return this.$origin;
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

        super();

        this.$engine = $engine;

        this.$actors = [];
        this.$origin = this.$createActorOrigin();
        this.$pointOfView = this.$origin;
        this.$uuid = UTILS.uuid();
    }

    /**
     * Creates the 'origin' actor.
     * @returns {Actor}
     * @private
     */
    $createActorOrigin() {

        const actor = new Actor(this)
        .setIdentifier($IDENTIFIER_ACTOR_ORIGIN);

        actor.onCreate();

        return actor;
    }

    /**
     * Removes the given actor.
     * @param {Actor} $actor The actor to remove.
     * @private
     */
    $removeActor($actor) {

        $actor.onBeforeRemove();

        if (this.$pointOfView === $actor) {

            this.$pointOfView = this.$origin;
        }

        const index = this.$actors.indexOf($actor);
        this.$actors.splice(index, 1);

        $actor.onAfterRemove();
    }

    /**
     * Creates the given actor.
     * @template {string} [TypeGenericAction=string] The generic type of the actions.
     * @template {string} [TypeGenericState=string] The generic type of the states.
     * @param {typeof Actor<TypeGenericAction, TypeGenericState>} [$actor] The actor to create.
     * @returns {Actor<TypeGenericAction, TypeGenericState>}
     * @public
     */
    createActor($actor = Actor) {

        const actor = new $actor(this);

        this.$actors.push(actor);

        actor.onCreate();

        return actor;
    }

    /**
     * Gets the first actor with the given identifier.
     * @param {string} $identifier The identifier of the actor to get.
     * @returns {Actor}
     * @public
     */
    getActorWithIdentifier($identifier) {

        return this.$actors.find(($actor) => ($actor.identifier === $identifier));
    }

    /**
     * Gets the actors with the given identifier.
     * @param {string} $identifier The identifier of the actors to get.
     * @returns {Array<Actor>}
     * @public
     */
    getActorsWithIdentifier($identifier) {

        return this.$actors.filter(($actor) => ($actor.identifier === $identifier));
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
     * Checks if the stage has an actor with the given identifier.
     * @param {string} $identifier The identifier of the actor to check.
     * @returns {boolean}
     * @public
     */
    hasActorWithIdentifier($identifier) {

        return this.$actors.some(($actor) => ($actor.identifier === $identifier)) === true;
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

        if (this.$actors.indexOf($actor) === -1) {

            return;
        }

        this.$removeActor($actor);
    }

    /**
     * Removes the first actor with the given identifier.
     * @param {string} $identifier The identifier of the actor to remove.
     * @public
     */
    removeActorWithIdentifier($identifier) {

        const actor = this.$actors.find(($actor) => ($actor.identifier === $identifier));

        if (typeof actor === 'undefined') {

            return;
        }

        this.$removeActor(actor);
    }

    /**
     * Removes all actors.
     * @public
     */
    removeActors() {

        while (this.$actors.length > 0) {

            const [actor] = this.$actors;

            this.$removeActor(actor);
        }
    }

    /**
     * Removes the actors with the given identifier.
     * @param {string} $identifier The identifier of the actors to remove.
     * @public
     */
    removeActorsWithIdentifier($identifier) {

        while (this.$actors.some(($actor) => ($actor.identifier === $identifier)) === true) {

            const actor = this.$actors.find(($actor) => ($actor.identifier === $identifier));

            this.$removeActor(actor);
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
