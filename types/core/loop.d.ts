export default Loop;
/**
 * Creates update loops.
 *
 * @example
 *
 * const loop = new Loop(handler);
 * loop.initiate();
 */
export class Loop {
    /**
     * Creates a new update loop.
     * @param {Function} $handler The handler to execute with the update loop.
     * @param {typeof globalThis} $scope The global scope to use.
     */
    constructor($handler: Function, $scope?: typeof globalThis);
    /**
     * Stores the handler to execute with the update loop.
     * @type {Function}
     * @private
     */
    private $handler;
    /**
     * Stores the identifier of the last requestAnimationFrame call.
     * @type {number}
     * @private
     */
    private $identifier;
    /**
     * Stores the time value of the previous tick call.
     * @type {number}
     * @private
     */
    private $timePrevious;
    /**
     * Stores the global scope used.
     * @type {typeof globalThis}
     * @private
     */
    private $scope;
    /**
     * Loops the update loop.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    public $loop($timetick: number): void;
    /**
     * Initiates the update loop.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    public initiate($tickrateMinimum?: number): void;
    /**
     * Terminates the update loop.
     * @public
     */
    public terminate(): void;
}
