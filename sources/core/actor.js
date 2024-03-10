import {Vector2} from '../index.js';

/**
 * Abstract Theatre.js actors.
 *
 * @example
 *
 * class ActorExample extends Actor {}
 */
class Actor {

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
     * Gets the current engine.
     * @type {import('../index.js').Engine}
     * @public
     * @readonly
     */
    get engine() {

        return this.stage.engine;
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
     * Create a new Theatre.js actor.
     * @param {import('../index.js').Stage} $stage The stage on which to create the actor.
     */
    constructor($stage) {

        this.$stage = $stage;

        this.$translation = new Vector2();
    }

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
     * Translates the actor in the world space to given position.
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
