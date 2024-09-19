import {TimelineKeyframe} from '../index.js';

/**
 * Creates timelines.
 *
 * @example
 *
 * const timeline = new Timeline(keyframes);
 * timeline.seekTimecode(0);
 * timeline.tick(timetick);
 */
class Timeline {

    /**
     * Stores the keyframes.
     * @type {Array<TimelineKeyframe>}
     * @private
     */
    $keyframes;

    /**
     * Stores the timecode.
     * @type {number}
     * @private
     */
    $timecode;

    /**
     * Gets the timecode.
     * @type {number}
     * @public
     */
    get timecode() {

        return this.$timecode;
    }

    /**
     * Creates a new timeline.
     * @param {Array<TimelineKeyframe>} [$keyframes] The keyframes.
     */
    constructor($keyframes = []) {

        this.$keyframes = [...$keyframes].sort(($a, $b) => ($a.timecode - $b.timecode));

        this.$timecode = 0;
    }

    /**
     * Seeks to the given name.
     * @param {string} $name The name of the keyframe to seek to.
     * @returns {this}
     * @public
     */
    seekName($name) {

        const result = this.$keyframes.find(($keyframe) => ($keyframe.name === $name));

        if (typeof result !== 'undefined') {

            this.seekTimecode(result.timecode);
        }

        return this;
    }

    /**
     * Seeks to the given timecode.
     * @param {number} $timecode The timecode to seek to (in ms).
     * @returns {this}
     * @public
     */
    seekTimecode($timecode) {

        this.$timecode = $timecode;

        this.$keyframes.forEach(($keyframe) => {

            if ($keyframe.timecode !== this.$timecode) {

                return;
            }

            $keyframe.onEnter(this);
        });

        return this;
    }

    /**
     * Updates the timeline by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {this}
     * @public
     */
    tick($timetick) {

        if ($timetick === 0) {

            return this;
        }

        const previous = this.$timecode;

        this.$timecode += $timetick;

        const current = this.$timecode;

        this.$keyframes.forEach(($keyframe) => {

            if ($keyframe.timecode <= previous) {

                return;
            }

            if ($keyframe.timecode > current) {

                return;
            }

            $keyframe.onEnter(this);
        });

        return this;
    }
}

export {

    Timeline
};

export default Timeline;
