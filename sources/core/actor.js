import {UTILS, Sprite, Vector2} from '../index.js';

/**
 * Abstract Theatre.js actors.
 *
 * @example
 *
 * class ActorExample extends Actor {}
 */
class Actor {

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
     * Create a new Theatre.js actor.
     * @param {import('../index.js').Stage} $stage The stage on which to create the actor.
     */
    constructor($stage) {

        this.$stage = $stage;

        this.$translation = new Vector2();
        this.$uuid = UTILS.uuid();
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
     * Translates the actor in the world space from a third person point of view.
     * @param {import('../index.js').Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        this.$translation = this.$translation.add($vector);

        return this;
    }

    /**
     * Translates the actor in the world space to the given position.
     * @param {import('../index.js').Vector2} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    translateTo($vector) {

        this.$translation = $vector;

        return this;
    }
}

export {

    Actor
};

export default Actor;
