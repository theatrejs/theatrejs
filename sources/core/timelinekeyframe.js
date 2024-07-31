/**
 * Creates timeline keyframes.
 *
 * @example
 *
 * // minimal
 * const keyframe = new TimelineKeyframe({$time, $trigger});
 *
 * @example
 *
 * // full
 * const keyframe = new TimelineKeyframe({$name, $time, $trigger});
 */
class TimelineKeyframe {

    /**
     * @callback typetrigger A trigger handler of a keyframe.
     * @param {import('../index.js').Timeline} $timeline The reference timeline.
     * @returns {void}
     */

    /**
     * Stores the name.
     * @type {string}
     * @private
     */
    $name;

    /**
     * Stores the time position.
     * @type {number}
     * @private
     */
    $time;

    /**
     * Stores the trigger handler.
     * @type {typetrigger}
     * @private
     */
    $trigger;

    /**
     * Gets the name.
     * @type {string}
     * @public
     */
    get name() {

        return this.$name;
    }

    /**
     * Gets the time position.
     * @type {number}
     * @public
     */
    get time() {

        return this.$time;
    }

    /**
     * Gets the trigger handler.
     * @type {typetrigger}
     * @public
     */
    get trigger() {

        return this.$trigger;
    }

    /**
     * Creates a new timeline keyframe.
     * @param {Object} $parameters The given parameters.
     * @param {string} [$parameters.$name] The name.
     * @param {number} $parameters.$time The time position.
     * @param {typetrigger} $parameters.$trigger The trigger handler.
     */
    constructor({$name, $time, $trigger}) {

        this.$name = $name;
        this.$time = $time;
        this.$trigger = $trigger;
    }
}

export {

    TimelineKeyframe
};

export default TimelineKeyframe;
