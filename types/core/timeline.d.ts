export default Timeline;
/**
 * Creates timelines.
 *
 * @example
 *
 * const timeline = new Timeline(keyframes);
 * timeline.seekTime(0);
 * timeline.tick(timetick);
 */
export class Timeline {
    /**
     * Creates a new timeline.
     * @param {import('../index.js').TimelineKeyframe[]} [$keyframes] The keyframes.
     */
    constructor($keyframes?: import("../index.js").TimelineKeyframe[]);
    /**
     * Stores the keyframes.
     * @type {import('../index.js').TimelineKeyframe[]}
     * @private
     */
    private $keyframes;
    /**
     * Stores the current time.
     * @type {number}
     * @private
     */
    private $timeCurrent;
    /**
     * Gets the current time.
     * @type {number}
     * @public
     */
    public get timeCurrent(): number;
    /**
     * Seeks to the given name.
     * @param {string} $name The name of the keyframe to seek to.
     * @returns {this}
     * @public
     */
    public seekName($name: string): this;
    /**
     * Seeks to the given time.
     * @param {number} $time The time to seek to (in ms).
     * @returns {this}
     * @public
     */
    public seekTime($time: number): this;
    /**
     * Updates the timeline by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {this}
     * @public
     */
    public tick($timetick: number): this;
}
