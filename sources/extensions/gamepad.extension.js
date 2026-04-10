import {EVENT_CODES, EVENT_TYPES, EventGamepad, EventGamepadAnalog, EventGamepadDigital, INPUT_CODES, MATHEMATICS, UTILS} from '../index.js';

/**
 * The ordered list of the axes event codes of the gamepad.
 * @type {Array<Array<string>>}
 * @constant
 * @private
 */
const $GAMEPAD_AXES = [

    [INPUT_CODES.GAMEPAD_STANDARD.STICK_LEFT_LEFT, INPUT_CODES.GAMEPAD_STANDARD.STICK_LEFT_RIGHT],
    [INPUT_CODES.GAMEPAD_STANDARD.STICK_LEFT_UP, INPUT_CODES.GAMEPAD_STANDARD.STICK_LEFT_DOWN],
    [INPUT_CODES.GAMEPAD_STANDARD.STICK_RIGHT_LEFT, INPUT_CODES.GAMEPAD_STANDARD.STICK_RIGHT_RIGHT],
    [INPUT_CODES.GAMEPAD_STANDARD.STICK_RIGHT_UP, INPUT_CODES.GAMEPAD_STANDARD.STICK_RIGHT_DOWN]
];

/**
 * The ordered list of the buttons event codes of the gamepad.
 * @type {Array<string>}
 * @constant
 * @private
 */
const $GAMEPAD_BUTTONS = [

    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_BOTTOM,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_RIGHT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_LEFT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_RIGHT_BUTTON_TOP,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_TOP_LEFT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_TOP_RIGHT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_BOTTOM_LEFT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_FRONT_BUTTON_BOTTOM_RIGHT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_LEFT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_RIGHT,
    INPUT_CODES.GAMEPAD_STANDARD.STICK_LEFT_BUTTON,
    INPUT_CODES.GAMEPAD_STANDARD.STICK_RIGHT_BUTTON,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_TOP,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_BOTTOM,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_LEFT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_LEFT_BUTTON_RIGHT,
    INPUT_CODES.GAMEPAD_STANDARD.CLUSTER_CENTER_BUTTON_CENTER
];

/**
 * Creates gamepad extensions.
 *
 * @example
 *
 * // minimal
 * ExtensionGamepad.activate();
 *
 * @example
 *
 * // full
 * ExtensionGamepad.activate(deadzone);
 */
class ExtensionGamepad {

    /**
     * Stores the deadzone of the gamepad axes (in [0, 1] range).
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    static DEADZONE_GAMEPAD_AXES = 1 / 8;

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores deadzone of the gamepad axes.
     * @type {number}
     * @private
     */
    $deadzone;

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
     * @param {number} [$deadzone] The deadzone of the gamepad axes (in [0, 1] range).
     * @protected
     */
    constructor($deadzone = ExtensionGamepad.DEADZONE_GAMEPAD_AXES) {

        this.$deadzone = $deadzone;

        this.$stateGamepad = {};
        this.$unloaded = false;

        [...$GAMEPAD_BUTTONS, ...$GAMEPAD_AXES.flat()].forEach(($code) => {

            this.$stateGamepad[$code] = false;
        });

        window.addEventListener(EVENT_TYPES.NATIVE.BEFORE_UNLOAD, this.$onBeforeUnload.bind(this));

        window.addEventListener(EVENT_TYPES.NATIVE.GAMEPAD_CONNECTED, this.$onConnect.bind(this));
        window.addEventListener(EVENT_TYPES.NATIVE.GAMEPAD_DISCONNECTED, this.$onDisconnect.bind(this));

        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_VIBRATE, this.$onVibrate.bind(this));

        window.requestAnimationFrame(this.$update.bind(this));
    }

    /**
     * Activates the extension.
     * @param {number} [$deadzone] The deadzone of the gamepad axes (in [0, 1] range).
     * @public
     * @static
     */
    static activate($deadzone = ExtensionGamepad.DEADZONE_GAMEPAD_AXES) {

        if (ExtensionGamepad.$activated === true) {

            return;
        }

        new ExtensionGamepad($deadzone);

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

        gamepad.vibrationActuator.reset()
        .catch(UTILS.noop);
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

                window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, $code));
            }
        });

        this.$indexLastConnected = $event.gamepad.index;

        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, INPUT_CODES.GAMEPAD_STANDARD.CONNECTED));
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

                window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, $code));
            }
        });

        this.$indexLastConnected = undefined;

        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, INPUT_CODES.GAMEPAD_STANDARD.DISCONNECTED));
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

        if ($event instanceof EventGamepad
        && $event.code === EVENT_CODES.GAMEPAD_STANDARD.VIBRATE_END) {

            gamepad.vibrationActuator.reset()
            .catch(UTILS.noop);

            return;
        }

        if ($event instanceof EventGamepad
        && $event.code === EVENT_CODES.GAMEPAD_STANDARD.VIBRATE_START) {

            gamepad.vibrationActuator.playEffect('dual-rumble', {

                duration: $event.vibration.duration,
                startDelay: 0,
                strongMagnitude: $event.vibration.intensityFrequencyLow,
                weakMagnitude: $event.vibration.intensityFrequencyHigh
            })
            .catch(UTILS.noop);

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

                    window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, $button));
                    window.dispatchEvent(new EventGamepadAnalog(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, $button, button.value));
                }

                else {

                    if (this.$stateGamepad[$button] === true) {

                        this.$stateGamepad[$button] = false;
                        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, $button));
                    }
                }
            });

            const [stickLeftX, stickLeftY, stickRightX, stickRightY] = gamepad.axes;

            const axes = [

                [stickLeftX, stickLeftY],
                [stickRightX, stickRightY]
            ]
            .map(([$x, $y]) => {

                const magnitude = MATHEMATICS.hypotenuse($x, $y);

                if (magnitude === 0) {

                    return [0, 0];
                }

                const value = MATHEMATICS.clamp(magnitude);

                if (value < this.$deadzone) {

                    return [0, 0];
                }

                const zone = (value - this.$deadzone) / (1 - this.$deadzone);

                return [

                    ($x / magnitude) * zone,
                    ($y / magnitude) * zone
                ];
            })
            .flat();

            axes.forEach(($direction, $index) => {

                const [axeMinimum, axeMaximum] = $GAMEPAD_AXES[$index];

                if ($direction < 0) {

                    if (this.$stateGamepad[axeMaximum] === true) {

                        this.$stateGamepad[axeMaximum] = false;
                        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, axeMaximum));
                    }

                    this.$stateGamepad[axeMinimum] = true;
                    window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, axeMinimum));
                    window.dispatchEvent(new EventGamepadAnalog(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, axeMinimum, Math.abs($direction)));
                }

                else if ($direction > 0) {

                    if (this.$stateGamepad[axeMinimum] === true) {

                        this.$stateGamepad[axeMinimum] = false;
                        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, axeMinimum));
                    }

                    this.$stateGamepad[axeMaximum] = true;
                    window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, axeMaximum));
                    window.dispatchEvent(new EventGamepadAnalog(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, axeMaximum, Math.abs($direction)));
                }

                else {

                    if (this.$stateGamepad[axeMinimum] === true) {

                        this.$stateGamepad[axeMinimum] = false;
                        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, axeMinimum));
                    }

                    if (this.$stateGamepad[axeMaximum] === true) {

                        this.$stateGamepad[axeMaximum] = false;
                        window.dispatchEvent(new EventGamepadDigital(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, axeMaximum));
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
