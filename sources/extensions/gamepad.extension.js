import {EVENTCODES, EventGamepad, EventGamepadAnalog, EventGamepadDigital} from '../index.js';

/**
 * The ordered list of the axes event codes of the gamepad.
 * @type {Array<Array<string>>}
 * @constant
 * @private
 */
const $GAMEPAD_AXES = [

    [EVENTCODES.GAMEPAD_STANDARD.STICK_LEFT_LEFT, EVENTCODES.GAMEPAD_STANDARD.STICK_LEFT_RIGHT],
    [EVENTCODES.GAMEPAD_STANDARD.STICK_LEFT_UP, EVENTCODES.GAMEPAD_STANDARD.STICK_LEFT_DOWN],
    [EVENTCODES.GAMEPAD_STANDARD.STICK_RIGHT_LEFT, EVENTCODES.GAMEPAD_STANDARD.STICK_RIGHT_RIGHT],
    [EVENTCODES.GAMEPAD_STANDARD.STICK_RIGHT_UP, EVENTCODES.GAMEPAD_STANDARD.STICK_RIGHT_DOWN]
];

/**
 * The ordered list of the buttons event codes of the gamepad.
 * @type {Array<string>}
 * @constant
 * @private
 */
const $GAMEPAD_BUTTONS = [

    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_BOTTOM,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_RIGHT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_LEFT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_TOP,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_TOP_LEFT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_TOP_RIGHT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_BOTTOM_LEFT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_BOTTOM_RIGHT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_LEFT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_RIGHT,
    EVENTCODES.GAMEPAD_STANDARD.STICK_LEFT_BUTTON,
    EVENTCODES.GAMEPAD_STANDARD.STICK_RIGHT_BUTTON,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_TOP,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_BOTTOM,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_LEFT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_RIGHT,
    EVENTCODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_CENTER
];

/**
 * The threshold of the gampead axes.
 * @type {number}
 * @constant
 * @private
 */
const $THRESHOLD_GAMEPAD_AXES = 0.5;

/**
 * Creates gamepad extensions.
 *
 * @example
 *
 * ExtensionGamepad.activate();
 */
class ExtensionGamepad {

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores the index of the last connected gamepad.
     * @type {number}
     * @private
     */
    $indexLastConnected;

    /**
     * Stores the gamepad state.
     * @type {Object<string, boolean>}
     * @private
     */
    $stateGamepad;

    /**
     * Stores the unloaded status.
     * @type {boolean}
     * @private
     */
    $unloaded;

    /**
     * Creates a new gamepad extension.
     * @protected
     */
    constructor() {

        this.$stateGamepad = {};
        this.$unloaded = false;

        [...$GAMEPAD_BUTTONS, ...$GAMEPAD_AXES.flat()].forEach(($code) => {

            this.$stateGamepad[$code] = false;
        });

        window.addEventListener('beforeunload', this.$onBeforeUnload.bind(this));

        window.addEventListener('gamepadconnected', this.$onConnect.bind(this));
        window.addEventListener('gamepaddisconnected', this.$onDisconnect.bind(this));

        window.addEventListener('gamepadvibrate', this.$onVibrate.bind(this));

        window.requestAnimationFrame(this.$update.bind(this));
    }

    /**
     * Activates the extension.
     * @public
     * @static
     */
    static activate() {

        if (ExtensionGamepad.$activated === true) {

            return;
        }

        new ExtensionGamepad();

        ExtensionGamepad.$activated = true;
    }

    /**
     * Called when the scope is about to be unloaded.
     * @private
     */
    $onBeforeUnload() {

        this.$unloaded = true;

        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.$indexLastConnected];

        if (typeof gamepad === 'undefined') {

            return;
        }

        if (typeof gamepad.vibrationActuator === 'undefined') {

            return;
        }

        gamepad.vibrationActuator.reset();
    }

    /**
     * Called when the gamepad is connected.
     * @param {GamepadEvent} $event The native gamepad connected event.
     * @private
     */
    $onConnect($event) {

        if ($event.gamepad.mapping !== 'standard') {

            return;
        }

        Object.entries(this.$stateGamepad).forEach(([$code, $activated]) => {

            if ($activated === true) {

                this.$stateGamepad[$code] = false;

                window.dispatchEvent(new EventGamepadDigital('gamepadup', $code));
            }
        });

        this.$indexLastConnected = $event.gamepad.index;

        window.dispatchEvent(new EventGamepadDigital('gamepadconnect', EVENTCODES.GAMEPAD_STANDARD.CONNECTED));
    }

    /**
     * Called when the gamepad is disconnected.
     * @param {GamepadEvent} $event The native gamepad disconnected event.
     * @private
     */
    $onDisconnect($event) {

        if ($event.gamepad.index !== this.$indexLastConnected) {

            return;
        }

        Object.entries(this.$stateGamepad).forEach(([$code, $activated]) => {

            if ($activated === true) {

                this.$stateGamepad[$code] = false;

                window.dispatchEvent(new EventGamepadDigital('gamepadup', $code));
            }
        });

        this.$indexLastConnected = undefined;

        window.dispatchEvent(new EventGamepadDigital('gamepadconnect', EVENTCODES.GAMEPAD_STANDARD.DISCONNECTED));
    }

    /**
     * Called when a gamepad vibration is needed.
     * @param {Event} $event The gamepad vibrate event.
     * @private
     */
    $onVibrate($event) {

        if (this.$unloaded === true) {

            return;
        }

        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.$indexLastConnected];

        if (typeof gamepad === 'undefined') {

            return;
        }

        if (typeof gamepad.vibrationActuator === 'undefined') {

            return;
        }

        if ($event instanceof EventGamepadDigital
        && $event.code === EVENTCODES.GAMEPAD_STANDARD.VIBRATE_END) {

            gamepad.vibrationActuator.reset();

            return;
        }

        if ($event instanceof EventGamepad
        && $event.code === EVENTCODES.GAMEPAD_STANDARD.VIBRATE_START) {

            gamepad.vibrationActuator.playEffect('dual-rumble', {

                duration: $event.vibration.duration,
                startDelay: 0,
                strongMagnitude: $event.vibration.intensityFrequencyLow,
                weakMagnitude: $event.vibration.intensityFrequencyHigh
            });

            return;
        }
    }

    /**
     * Updates the state of the gamepad.
     * @private
     */
    $update() {

        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.$indexLastConnected];

        if (gamepad instanceof Gamepad) {

            $GAMEPAD_BUTTONS.forEach(($button, $index) => {

                const button = gamepad.buttons[$index];

                if (button.pressed === true) {

                    if (this.$stateGamepad[$button] === false) {

                        this.$stateGamepad[$button] = true;
                    }

                    window.dispatchEvent(new EventGamepadDigital('gamepaddown', $button));
                    window.dispatchEvent(new EventGamepadAnalog('gamepadanalog', $button, button.value));
                }

                else {

                    if (this.$stateGamepad[$button] === true) {

                        this.$stateGamepad[$button] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', $button));
                    }
                }
            });

            gamepad.axes.forEach(($direction, $index) => {

                const [axeMinimum, axeMaximum] = $GAMEPAD_AXES[$index];

                if ($direction <= - $THRESHOLD_GAMEPAD_AXES) {

                    if (this.$stateGamepad[axeMaximum] === true) {

                        this.$stateGamepad[axeMaximum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMaximum));
                    }

                    this.$stateGamepad[axeMinimum] = true;
                    window.dispatchEvent(new EventGamepadDigital('gamepaddown', axeMinimum));
                    window.dispatchEvent(new EventGamepadAnalog('gamepadanalog', axeMinimum, ($direction - (Math.sign($direction) * $THRESHOLD_GAMEPAD_AXES)) / (1 - $THRESHOLD_GAMEPAD_AXES)));
                }

                else if ($direction >= $THRESHOLD_GAMEPAD_AXES) {

                    if (this.$stateGamepad[axeMinimum] === true) {

                        this.$stateGamepad[axeMinimum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMinimum));
                    }

                    this.$stateGamepad[axeMaximum] = true;
                    window.dispatchEvent(new EventGamepadDigital('gamepaddown', axeMaximum));
                    window.dispatchEvent(new EventGamepadAnalog('gamepadanalog', axeMaximum, ($direction - (Math.sign($direction) * $THRESHOLD_GAMEPAD_AXES)) / (1 - $THRESHOLD_GAMEPAD_AXES)));
                }

                else {

                    if (this.$stateGamepad[axeMinimum] === true) {

                        this.$stateGamepad[axeMinimum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMinimum));
                    }

                    if (this.$stateGamepad[axeMaximum] === true) {

                        this.$stateGamepad[axeMaximum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMaximum));
                    }
                }
            });
        }

        window.requestAnimationFrame(this.$update.bind(this));
    }
}

export {

    ExtensionGamepad
};

export default ExtensionGamepad;
