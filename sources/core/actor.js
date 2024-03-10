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
     * Create a new Theatre.js actor.
     * @param {import('../index.js').Stage} $stage The stage on which to create the actor.
     */
    constructor($stage) {

        this.$stage = $stage;
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
}

export {

    Actor
};

export default Actor;
