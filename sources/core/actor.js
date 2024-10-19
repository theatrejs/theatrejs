import {Collider, Engine, Preloadable, Sound, Sprite, Stage, UTILS, Vector2, Vibration} from '../index.js';

/**
 * Abstract actors.
 *
 * @example
 *
 * class ActorExample extends Actor {}
 */
class Actor extends Preloadable {

    /**
     * Stores the collider.
     * @type {Collider}
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
     * Stores the follower actors.
     * @type {Set<Actor>}
     * @private
     */
    $followers;

    /**
     * Stores the sounds.
     * @type {Array<Sound>}
     * @private
     */
    $sounds;

    /**
     * Stores the sprite.
     * @type {Sprite}
     * @private
     */
    $sprite;

    /**
     * Stores the current stage.
     * @type {Stage}
     * @private
     */
    $stage;

    /**
     * Stores the position.
     * @type {Vector2}
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
     * Stores the vibrations.
     * @type {Array<Vibration>}
     * @private
     */
    $vibrations;

    /**
     * Stores the z-index.
     * @type {number}
     * @private
     */
    $zIndex;

    /**
     * Gets the collider.
     * @type {Collider}
     * @public
     */
    get collider() {

        return this.$collider;
    }

    /**
     * Gets the current engine.
     * @type {Engine}
     * @public
     */
    get engine() {

        return this.stage.engine;
    }

    /**
     * Gets the follower actors.
     * @type {Array<Actor>}
     * @public
     */
    get followers() {

        return Array.from(this.$followers);
    }

    /**
     * Gets the sounds.
     * @type {Array<Sound>}
     * @public
     */
    get sounds() {

        return this.$sounds;
    }

    /**
     * Gets the sprite.
     * @type {Sprite}
     * @public
     */
    get sprite() {

        return this.$sprite;
    }

    /**
     * Gets the current stage.
     * @type {Stage}
     * @public
     */
    get stage() {

        return this.$stage;
    }

    /**
     * Gets the position.
     * @type {Vector2}
     * @public
     */
    get translation() {

        return this.$translation;
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
     * Gets the vibrations.
     * @type {Array<Vibration>}
     * @public
     */
    get vibrations() {

        return this.$vibrations;
    }

    /**
     * Gets the z-index.
     * @type {number}
     * @public
     */
    get zIndex() {

        return this.$zIndex;
    }

    /**
     * Create a new actor.
     * @param {Stage} $stage The stage on which to create the actor.
     */
    constructor($stage) {

        super();

        this.$stage = $stage;

        this.$components = {};
        this.$followers = new Set();
        this.$sounds = [];
        this.$translation = new Vector2(0, 0);
        this.$uuid = UTILS.uuid();
        this.$vibrations = [];
        this.$zIndex = 0;
    }

    /**
     * Adds a follower actor.
     * @param {Actor} $actor The follower actor to add.
     * @returns {this}
     * @public
     */
    addFollower($actor) {

        this.$followers.add($actor);

        return this;
    }

    /**
     * Adds the given sound.
     * @param {Sound} $sound The sound to add.
     * @returns {this}
     * @public
     */
    addSound($sound) {

        this.$sounds.push($sound);

        return this;
    }

    /**
     * Adds the given vibration.
     * @param {Vibration} $vibration The vibration to add.
     * @returns {this}
     * @public
     */
    addVibration($vibration) {

        this.$vibrations.push($vibration);

        return this;
    }

    /**
     * Gets a component.
     * @param {string} $name The name of the component to get.
     * @returns {any}
     * @public
     */
    getComponent($name) {

        return this.$components[$name];
    }

    /**
     * Checks if the actor has a collider.
     * @returns {boolean}
     * @public
     */
    hasCollider() {

        return this.$collider instanceof Collider;
    }

    /**
     * Checks if the actor has the given component.
     * @param {string} $name The name of the component to check.
     * @returns {boolean}
     * @public
     */
    hasComponent($name) {

        return this.$components.hasOwnProperty($name) === true;
    }

    /**
     * Checks if the actor has the given follower actor.
     * @param {Actor} $actor The actor to check.
     * @returns {boolean}
     * @public
     */
    hasFollower($actor) {

        return this.$followers.has($actor) === true;
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
     * @param {Actor} $parameters.$actor The colliding actor.
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
     * @param {Actor} $parameters.$actor The colliding actor.
     * @param {boolean} $parameters.$east If the origin of collision is facing the east face.
     * @param {boolean} $parameters.$north If the origin of collision is facing the north face.
     * @param {boolean} $parameters.$south If the origin of collision is facing the south face.
     * @param {boolean} $parameters.$west If the origin of collision is facing the west face.
     * @public
     */
    onCollideEnter({$actor, $east, $north, $south, $west}) {}

    /**
     * Called when a collision is being left.
     * @param {Actor} $actor The colliding actor.
     * @public
     */
    onCollideLeave($actor) {}

    /**
     * Called when the actor is being created.
     * @public
     */
    onCreate() {}

    /**
     * Called when a sound is finishing playing.
     * @param {Sound} $sound The sound.
     * @public
     */
    onSoundFinish($sound) {}

    /**
     * Called when the actor is being updated by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    onTick($timetick) {}

    /**
     * Removes a follower actor.
     * @param {Actor} $actor The follower actor to remove.
     * @returns {this}
     * @public
     */
    removeFollower($actor) {

        this.$followers.delete($actor);

        return this;
    }

    /**
     * Removes the given sound.
     * @param {Sound} $sound The sound to remove.
     * @returns {this}
     * @public
     */
    removeSound($sound) {

        UTILS.extract($sound, this.$sounds);

        return this;
    }

    /**
     * Removes all sound.
     * @returns {this}
     * @public
     */
    removeSounds() {

        this.$sounds = [];

        return this;
    }

    /**
     * Removes the given vibration.
     * @param {Vibration} $vibration The vibration to remove.
     * @returns {this}
     * @public
     */
    removeVibration($vibration) {

        UTILS.extract($vibration, this.$vibrations);

        return this;
    }

    /**
     * Removes all vibration.
     * @returns {this}
     * @public
     */
    removeVibrations() {

        this.$vibrations = [];

        return this;
    }

    /**
     * Sets the collider.
     * @param {Collider} $collider The collider to set.
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
     * @param {Sprite} $sprite The sprite to set.
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
     * @param {boolean} [$cascade] The cascade status for updating the followers too.
     * @returns {this}
     * @public
     */
    setZIndex($zIndex, $cascade = false) {

        this.$zIndex = $zIndex;

        if ($cascade === true) {

            Array.from(this.$followers).forEach(($follower) => {

                if (this.stage.hasActor($follower) === false) {

                    this.$followers.delete($follower);

                    return;
                }

                $follower.setZIndex($zIndex, $cascade);
            });
        }

        return this;
    }

    /**
     * Translates the actor in the world space from a third person point of view.
     * @param {Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        const translation = $vector.clone();

        Array.from(this.$followers).forEach(($follower) => {

            if (this.stage.hasActor($follower) === false) {

                this.$followers.delete($follower);

                return;
            }

            $follower.translate(translation);
        });

        this.$translation.add(translation);

        return this;
    }

    /**
     * Translates the actor in the world space to the given position.
     * @param {Vector2} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    translateTo($vector) {

        const translation = $vector.clone().subtract(this.$translation);

        Array.from(this.$followers).forEach(($follower) => {

            if (this.stage.hasActor($follower) === false) {

                this.$followers.delete($follower);

                return;
            }

            $follower.translate(translation);
        });

        this.$translation.add(translation);

        return this;
    }
}

export {

    Actor
};

export default Actor;
