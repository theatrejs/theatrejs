/**
 * Creates timeline keyframes.
 *
 * @example
 *
 * // minimal
 * const keyframe = new TimelineKeyframe({$onEnter, $timecode});
 *
 * @example
 *
 * // full
 * const keyframe = new TimelineKeyframe({$name, $onEnter, $timecode});
 */
class TimelineKeyframe {

    /**
     * @callback typehandlerenter A handler to execute when entering a keyframe.
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
     * Stores the keyframe entering handler.
     * @type {typehandlerenter}
     * @private
     */
    $onEnter;

    /**
     * Stores the timecode.
     * @type {number}
     * @private
     */
    $timecode;

    /**
     * Gets the name.
     * @type {string}
     * @public
     */
    get name() {

        return this.$name;
    }

    /**
     * Gets the keyframe entering handler.
     * @type {typehandlerenter}
     * @public
     */
    get onEnter() {

        return this.$onEnter;
    }

    /**
     * Gets the timecode.
     * @type {number}
     * @public
     */
    get timecode() {

        return this.$timecode;
    }

    /**
     * Creates a new timeline keyframe.
     * @param {Object} $parameters The given parameters.
     * @param {string} [$parameters.$name] The name.
     * @param {typehandlerenter} $parameters.$onEnter The keyframe entering handler.
     * @param {number} $parameters.$timecode The timecode.
     */
    constructor({$name, $onEnter, $timecode}) {

        this.$name = $name;
        this.$onEnter = $onEnter;
        this.$timecode = $timecode;
    }
}

export {

    TimelineKeyframe
};

export default TimelineKeyframe;