export default EventGamepadDigital;
/**
 * Creates gamepad digital events.
 *
 * @example
 *
 * const event = new EventGamepadDigital(type, code);
 */
export class EventGamepadDigital extends Event {
    /**
     * Creates a new gamepad digital event.
     * @param {('gamepadconnect' | 'gamepaddown' | 'gamepadup' | 'gamepadvibrate')} $type The event type.
     * @param {string} $code The event code.
     */
    constructor($type: ("gamepadconnect" | "gamepaddown" | "gamepadup" | "gamepadvibrate"), $code: string);
    /**
     * Stores the event code.
     * @type {string}
     * @private
     */
    private $code;
    /**
     * Gets the event code.
     * @type {string}
     * @public
     */
    public get code(): string;
}
