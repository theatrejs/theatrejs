import {UTILS, Sprite, Vector2, Collider} from '../index.js';

/**
 * Abstract Theatre.js actors.
 *
 * @example
 *
 * class ActorExample extends Actor {}
 */
class Actor {

    /**
     * Stores the preloadable assets.
     * @type {string[]}
     * @public
     * @static
     */
    static preloadables = [];

    /**
     * Stores the child actors.
     * @type {import('../index.js').Actor[]}
     * @private
     */
    $actors;

    /**
     * Stores the collider.
     * @type {import('../index.js').Collider}
     * @private
     */
    $collider;

    /**
     * Stores the components.
     * @type {Object<string, any>}
     * @private
     */
    $components;

    /**
     * Stores the sprite.
     * @type {import('../index.js').Sprite}
     * @private
     */
    $sprite;

    /**
     * Stores the current stage.
     * @type {import('../index.js').Stage}
     * @private
     */
    $stage;

    /**
     * Stores the position.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $translation;

    /**
     * Stores the uuid.
     * @type {string}
     * @private
     */
    $uuid;

    /**
     * Stores the z-index.
     * @type {number}
     * @private
     */
    $zIndex;

    /**
     * Gets the child actors.
     * @type {import('../index.js').Actor[]}
     * @public
     * @readonly
     */
    get actors() {

        return this.$actors;
    }

    /**
     * Gets the collider.
     * @type {import('../index.js').Collider}
     * @public
     * @readonly
     */
    get collider() {

        return this.$collider;
    }

    /**
     * Gets the current engine.
     * @type {import('../index.js').Engine}
     * @public
     * @readonly
     */
    get engine() {

        return this.stage.engine;
    }

    /**
     * Gets the sprite.
     * @type {import('../index.js').Sprite}
     * @public
     * @readonly
     */
    get sprite() {

        return this.$sprite;
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
     * Gets the position.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get translation() {

        return this.$translation;
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
     * Gets the z-index.
     * @type {number}
     * @public
     * @readonly
     */
    get zIndex() {

        return this.$zIndex;
    }

    /**
     * Create a new Theatre.js actor.
     * @param {import('../index.js').Stage} $stage The stage on which to create the actor.
     */
    constructor($stage) {

        this.$stage = $stage;

        this.$actors = [];
        this.$components = {};
        this.$translation = new Vector2(0, 0);
        this.$uuid = UTILS.uuid();
        this.$zIndex = 0;
    }

    /**
     * Attaches the given child actor.
     * @param {import('../index.js').Actor} $actor The child actor to attach.
     * @returns {this}
     * @public
     */
    attachActor($actor) {

        this.$actors.push($actor);

        return this;
    }

    /**
     * Detaches the given child actor.
     * @param {import('../index.js').Actor} $actor The child actor to detach.
     * @returns {this}
     * @public
     */
    detachActor($actor) {

        UTILS.extract($actor, this.$actors);

        return this;
    }

    /**
     * Detaches the child actors.
     * @returns {this}
     * @public
     */
    detachActors() {

        this.$actors = [];

        return this;
    }

    /**
     * Gets a component.
     * @param {string} $name The name of the component to get.
     * return {any}
     * @public
     */
    getComponent($name) {

        return this.$components[$name];
    }

    /**
     * Checks if the actor has a collider.
     * return {boolean}
     * @public
     */
    hasCollider() {

        return this.$collider instanceof Collider;
    }

    /**
     * Checks if the actor has the given component.
     * @param {string} $name The name of the component to check.
     * return {boolean}
     * @public
     */
    hasComponent($name) {

        return this.$components.hasOwnProperty($name) === true;
    }

    /**
     * Checks if the actor has a sprite.
     * @returns {boolean}
     * @public
     */
    hasSprite() {

        return this.$sprite instanceof Sprite;
    }

    /**
     * Called just after removing the actor.
     * @public
     */
    onAfterRemove() {}

    /**
     * Called just before removing the actor.
     * @public
     */
    onBeforeRemove() {}

    /**
     * Called when a collision is being resolved.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Actor} $parameters.$actor The colliding actor.
     * @param {boolean} $parameters.$east If the origin of collision is facing the east face.
     * @param {boolean} $parameters.$north If the origin of collision is facing the north face.
     * @param {boolean} $parameters.$south If the origin of collision is facing the south face.
     * @param {boolean} $parameters.$west If the origin of collision is facing the west face.
     * @public
     */
    onCollide({$actor, $east, $north, $south, $west}) {}

    /**
     * Called when a collision is being entered.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Actor} $parameters.$actor The colliding actor.
     * @param {boolean} $parameters.$east If the origin of collision is facing the east face.
     * @param {boolean} $parameters.$north If the origin of collision is facing the north face.
     * @param {boolean} $parameters.$south If the origin of collision is facing the south face.
     * @param {boolean} $parameters.$west If the origin of collision is facing the west face.
     * @public
     */
    onCollideEnter({$actor, $east, $north, $south, $west}) {}

    /**
     * Called when a collision is being left.
     * @param {import('../index.js').Actor} $actor The colliding actor.
     * @public
     */
    onCollideLeave($actor) {}

    /**
     * Called when the actor is being created.
     * @public
     */
    onCreate() {}

    /**
     * Called when the actor is being updated by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    onTick($timetick) {}

    /**
     * Sets the collider.
     * @param {import('../index.js').Collider} $collider The collider to set.
     * @returns {this}
     * @public
     */
    setCollider($collider) {

        this.$collider = $collider;

        return this;
    }

    /**
     * Sets a component.
     * @param {string} $name The name of the component to set.
     * @param {any} $component The value of the component to set.
     * @returns {this}
     * @public
     */
    setComponent($name, $component) {

        this.$components[$name] = $component;

        return this;
    }

    /**
     * Sets the sprite.
     * @param {import('../index.js').Sprite} $sprite The sprite to set.
     * @returns {this}
     * @public
     */
    setSprite($sprite) {

        this.$sprite = $sprite;

        return this;
    }

    /**
     * Sets the z-index.
     * @param {number} $zIndex The z-index to set.
     * @returns {this}
     * @public
     */
    setZIndex($zIndex) {

        this.$zIndex = $zIndex;

        return this;
    }

    /**
     * Translates the actor in the world space from a third person point of view.
     * @param {import('../index.js').Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        this.$translation = this.$translation.clone().add($vector);

        this.$actors.forEach(($actor) => {

            $actor.translate($vector);
        });

        return this;
    }

    /**
     * Translates the actor in the world space to the given position.
     * @param {import('../index.js').Vector2} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    translateTo($vector) {

        const transformation = $vector.clone().subtract(this.$translation);

        this.$translation = $vector;

        this.$actors.forEach(($actor) => {

            $actor.translate(transformation);
        });

        return this;
    }
}

export {

    Actor
};

export default Actor;
