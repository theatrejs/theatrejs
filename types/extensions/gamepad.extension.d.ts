export default ExtensionGamepad;
/**
 * Creates gamepad extension.
 *
 * @example
 *
 * const extensionGamepad = new ExtensionGamepad();
 */
export class ExtensionGamepad {
    /**
     * Stores the index of the last connected gamepad.
     * @type {number}
     * @private
     */
    private $indexLastConnected;
    /**
     * Stores the gamepad state.
     * @type {Object.<string, boolean>}
     * @private
     */
    private $stateGamepad;
    /**
     * Stores the unloaded status.
     * @type {boolean}
     * @private
     */
    private $unloaded;
    /**
     * Called when the scope is about to be unloaded.
     * @private
     */
    private $onBeforeUnload;
    /**
     * Called when the gamepad is connected.
     * @param {GamepadEvent} $event The native gamepad connected event.
     * @private
     */
    private $onConnect;
    /**
     * Called when the gamepad is disconnected.
     * @private
     */
    private $onDisconnect;
    /**
     * Called when a gamepad vibration is needed.
     * @param {Event} $event The gamepad vibrate event.
     * @private
     */
    private $onVibrate;
    /**
     * Updates the state of the gamepad.
     * @private
     */
    private $update;
}
