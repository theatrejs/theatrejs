export default TimelineKeyframe;
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
export class TimelineKeyframe {
    /**
     * Creates a new timeline keyframe.
     * @param {Object} $parameters The given parameters.
     * @param {string} [$parameters.$name] The name.
     * @param {number} $parameters.$time The time position.
     * @param {typetrigger} $parameters.$trigger The trigger handler.
     */
    constructor({ $name, $time, $trigger }: {
        $name?: string;
        $time: number;
        $trigger: ($timeline: import("../index.js").Timeline) => void;
    });
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
    private $name;
    /**
     * Stores the time position.
     * @type {number}
     * @private
     */
    private $time;
    /**
     * Stores the trigger handler.
     * @type {typetrigger}
     * @private
     */
    private $trigger;
    /**
     * Gets the name.
     * @type {string}
     * @public
     */
    public get name(): string;
    /**
     * Gets the time position.
     * @type {number}
     * @public
     */
    public get time(): number;
    /**
     * Gets the trigger handler.
     * @type {typetrigger}
     * @public
     */
    public get trigger(): ($timeline: import("../index.js").Timeline) => void;
}
