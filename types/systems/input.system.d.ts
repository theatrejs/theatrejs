export default SystemInput;
/**
 * Creates input systems.
 *
 * @example
 *
 * const system = new SystemInput({$container});
 * system.initiate();
 * system.tick();
 */
export class SystemInput {
    /**
     * Creates a new input system.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach input events.
     */
    constructor({ $container }: {
        $container: HTMLElement;
    });
    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    private $container;
    /**
     * Stores the input events.
     * @type {Event[]}
     * @private
     */
    private $events;
    /**
     * Stores the initiated status.
     * @type {boolean}
     * @private
     */
    private $initiated;
    /**
     * Stores the state of the accepted inputs.
     * @type {Object.<string, boolean>}
     * @private
     */
    private $inputs;
    /**
     * Stores the state of the accepted analog inputs.
     * @type {Object.<string, number>}
     * @private
     */
    private $inputsAnalog;
    /**
     * Stacks the input events for the next tick.
     * @param {Event} $event The input event to stack.
     * @private
     */
    private $stack;
    /**
     * Gets the current input state value of the given digital input.
     * @param {string} $input The event code of the given digital input.
     * @returns {boolean}
     * @public
     */
    public getInput($input: string): boolean;
    /**
     * Gets the current input state value of the given analog input.
     * @param {string} $input The event code of the given analog input.
     * @returns {number}
     * @public
     */
    public getInputAnalog($input: string): number;
    /**
     * Initiates the system.
     * @public
     */
    public initiate(): void;
    /**
     * Terminates the system.
     * @public
     */
    public terminate(): void;
    /**
     * Updates the system by one tick update.
     * @public
     */
    public tick(): void;
}
