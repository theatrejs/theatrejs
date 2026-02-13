// 'ESLint' configuration
/* global TypeGenericAction */
/* global TypeGenericState */

import {Actor, Engine, Preloadable, UTILS} from '../index.js';

/**
 * The label of the 'origin' actor.
 * @type {string}
 * @constant
 * @private
 */
const $LABEL_ACTOR_ORIGIN = '$origin';

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
        .setLabel($LABEL_ACTOR_ORIGIN);

        actor.onCreate();

        return actor;
    }

    /**
     * Removes the given actor.
     * @param {Actor} $actor The actor to remove.
     * @private
     */
    $removeActor($actor) {

        if (this.$actors.indexOf($actor) === -1) {

            return;
        }

        $actor.onBeforeRemove();

        if (this.$pointOfView === $actor) {

            this.$pointOfView = this.$origin;
        }

        $actor.mimics.keys().forEach(($mimic) => {

            this.$removeActor($mimic);
        });

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
     * Gets the first actor with the given label.
     * @param {string} $label The label of the actor to get.
     * @returns {Actor}
     * @public
     */
    getActorWithLabel($label) {

        return this.$actors.find(($actor) => ($actor.label === $label));
    }

    /**
     * Gets the actors with the given label.
     * @param {string} $label The label of the actors to get.
     * @returns {Array<Actor>}
     * @public
     */
    getActorsWithLabel($label) {

        return this.$actors.filter(($actor) => ($actor.label === $label));
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
     * Checks if the stage has an actor with the given label.
     * @param {string} $label The label of the actor to check.
     * @returns {boolean}
     * @public
     */
    hasActorWithLabel($label) {

        return this.$actors.some(($actor) => ($actor.label === $label)) === true;
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

        this.$removeActor($actor);
    }

    /**
     * Removes the first actor with the given label.
     * @param {string} $label The label of the actor to remove.
     * @public
     */
    removeActorWithLabel($label) {

        const actor = this.$actors.find(($actor) => ($actor.label === $label));

        if (typeof actor === 'undefined') {

            return;
        }

        this.$removeActor(actor);
    }

    /**
     * Removes all actors.
     * @param {boolean} $force If the removal should also be applied to all actors created during this removal.
     * @public
     */
    removeActors($force = false) {

        if ($force === true) {

            while (this.$actors.length > 0) {

                const [actor] = this.$actors;

                this.$removeActor(actor);
            }

            return;
        }

        [...this.$actors].forEach(($actor) => {

            this.$removeActor($actor);
        });
    }

    /**
     * Removes the actors with the given label.
     * @param {string} $label The label of the actors to remove.
     * @param {boolean} $force If the removal should also be applied to the actors with the given label created during this removal.
     * @public
     */
    removeActorsWithLabel($label, $force = false) {

        if ($force === true) {

            while (this.$actors.some(($actor) => ($actor.label === $label)) === true) {

                const actor = this.$actors.find(($actor) => ($actor.label === $label));

                this.$removeActor(actor);
            }

            return;
        }

        [...this.$actors.filter(($actor) => ($actor.label === $label))].forEach(($actor) => {

            this.$removeActor($actor);
        });
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
