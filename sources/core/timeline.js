/**
 * Creates Theatre.js timelines.
 *
 * @example
 *
 * const timeline = new Timeline(keyframes);
 * timeline.seek(0);
 * timeline.tick(timetick);
 */
class Timeline {

    /**
     * @callback typetrigger A trigger handler of a keyframe.
     * @param {import('../index.js').Timeline} $timeline The reference timeline.
     * @returns {void}
     */

    /**
     * @typedef {Object} typekeyframe A keyframe.
     * @property {number} typekeyframe.$time The time position.
     * @property {typetrigger} typekeyframe.$trigger The trigger handler.
     */

    /**
     * Stores the keyframes.
     * @type {typekeyframe[]}
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
     * @readonly
     */
    get timeCurrent() {

        return this.$timeCurrent;
    }

    /**
     * Creates a new Theatre.js timeline.
     * @param {typekeyframe[]} [$keyframes] The keyframes.
     */
    constructor($keyframes = []) {

        this.$keyframes = [...$keyframes].sort(($a, $b) => ($a.$time - $b.$time));

        this.$timeCurrent = 0;
    }

    /**
     * Seeks to the given time.
     * @param {number} $time The time to seek to (in ms).
     * @returns {this}
     * @public
     */
    seek($time) {

        this.$timeCurrent = $time;

        this.$keyframes.forEach(($keyframe) => {

            if ($keyframe.$time !== this.$timeCurrent) {

                return;
            }

            $keyframe.$trigger(this);
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

            if ($keyframe.$time <= timePrevious) {

                return;
            }

            if ($keyframe.$time > timeCurrent) {

                return;
            }

            $keyframe.$trigger(this);
        });

        return this;
    }
}

export {

    Timeline
};

export default Timeline;
