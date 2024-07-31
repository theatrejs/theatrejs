export default EventGamepadAnalog;
/**
 * Creates gamepad analog events.
 *
 * @example
 *
 * const event = new EventGamepadAnalog(type, code, value);
 */
export class EventGamepadAnalog extends Event {
    /**
     * Creates a new gamepad analog event.
     * @param {('gamepadanalog')} $type The event type.
     * @param {string} $code The event code.
     * @param {number} $value The analog value.
     */
    constructor($type: ("gamepadanalog"), $code: string, $value: number);
    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    private $code;
    /**
     * Stores the analog value.
     * @type {number}
     * @private
     */
    private $value;
    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    public get code(): string;
    /**
     * Gets the analog value.
     * @type {number}
     * @public
     */
    public get value(): number;
}
