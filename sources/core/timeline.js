/**
 * Creates timelines.
 *
 * @example
 *
 * const timeline = new Timeline(keyframes);
 * timeline.seekTime(0);
 * timeline.tick(timetick);
 */
class Timeline {

    /**
     * Stores the keyframes.
     * @type {import('../index.js').TimelineKeyframe[]}
     * @private
     */
    $keyframes;

    /**
     * Stores the current time.
     * @type {number}
     * @private
     */
    $timeCurrent;

    /**
     * Gets the current time.
     * @type {number}
     * @public
     */
    get timeCurrent() {

        return this.$timeCurrent;
    }

    /**
     * Creates a new timeline.
     * @param {import('../index.js').TimelineKeyframe[]} [$keyframes] The keyframes.
     */
    constructor($keyframes = []) {

        this.$keyframes = [...$keyframes].sort(($a, $b) => ($a.time - $b.time));

        this.$timeCurrent = 0;
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

            this.seekTime(result.time);
        }

        return this;
    }

    /**
     * Seeks to the given time.
     * @param {number} $time The time to seek to (in ms).
     * @returns {this}
     * @public
     */
    seekTime($time) {

        this.$timeCurrent = $time;

        this.$keyframes.forEach(($keyframe) => {

            if ($keyframe.time !== this.$timeCurrent) {

                return;
            }

            $keyframe.trigger(this);
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

        const timePrevious = this.$timeCurrent;

        this.$timeCurrent += $timetick;

        const timeCurrent = this.$timeCurrent;

        this.$keyframes.forEach(($keyframe) => {

            if ($keyframe.time <= timePrevious) {

                return;
            }

            if ($keyframe.time > timeCurrent) {

                return;
            }

            $keyframe.trigger(this);
        });

        return this;
    }
}

export {

    Timeline
};

export default Timeline;
