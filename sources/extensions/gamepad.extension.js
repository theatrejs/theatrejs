import {EventGamepadAnalog, EventGamepadDigital} from '../index.js';

/**
 * The ordered list of the axes event codes of the gamepad.
 * @type {string[][]}
 * @constant
 */
const GAMEPADAXES = [

    ['StickLeftLeft', 'StickLeftRight'],
    ['StickLeftUp', 'StickLeftDown'],
    ['StickRightLeft', 'StickRightRight'],
    ['StickRightUp', 'StickRightDown'],
];

/**
 * The ordered list of the buttons event codes of the gamepad.
 * @type {string[]}
 * @constant
 */
const GAMEPADBUTTONS = [

    'ClusterRightButtonBottom',
    'ClusterRightButtonRight',
    'ClusterRightButtonLeft',
    'ClusterRightButtonTop',
    'ClusterFrontButtonTopLeft',
    'ClusterFrontButtonTopRight',
    'ClusterFrontButtonBottomLeft',
    'ClusterFrontButtonBottomRight',
    'ClusterCenterButtonLeft',
    'ClusterCenterButtonRight',
    'StickLeftButton',
    'StickRightButton',
    'ClusterLeftButtonTop',
    'ClusterLeftButtonBottom',
    'ClusterLeftButtonLeft',
    'ClusterLeftButtonRight',
    'ClusterCenterButtonCenter'
];

/**
 * The threshold of the gampead axes.
 * @type {number}
 * @constant
 */
const THRESHOLDGAMEPADAXES = 0.25;

/**
 * Creates gamepad extension.
 * @example
 * const extensiongamepad = new ExtensionGamepad();
 */
class ExtensionGamepad {

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
     * Creates a new gamepad extension.
     */
    constructor() {

        this.$stateGamepad = {};

        [...GAMEPADBUTTONS, ...GAMEPADAXES.flat()].forEach(($code) => {

            this.$stateGamepad[$code] = false;
        });

        window.addEventListener('gamepadconnected', this.$onConnect.bind(this));
        window.addEventListener('gamepaddisconnected', this.$onDisconnect.bind(this));

        window.requestAnimationFrame(this.$update.bind(this));
    }

    /**
     * Called when the gamepad is connected.
     * @param {GamepadEvent} $event The native gamepad connected event.
     */
    $onConnect($event) {

        this.$indexLastConnected = $event.gamepad.index;

        window.dispatchEvent(new EventGamepadDigital('gamepadconnect', 'Connected'));
    }

    /**
     * Called when the gamepad is disconnected.
     */
    $onDisconnect() {

        Object.entries(this.$stateGamepad).forEach(([$code, $activated]) => {

            if ($activated === true) {

                this.$stateGamepad[$code] = false;

                window.dispatchEvent(new EventGamepadDigital('gamepadup', $code));
            }
        });

        this.$indexLastConnected = undefined;

        window.dispatchEvent(new EventGamepadDigital('gamepadconnect', 'Disconnected'));
    }

    /**
     * Updates the state of the gamepad.
     */
    $update() {

        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.$indexLastConnected];

        if (gamepad instanceof Gamepad) {

            GAMEPADBUTTONS.forEach(($button, $index) => {

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

                const [axeMinimum, axeMaximum] = GAMEPADAXES[$index];

                if ($direction <= - THRESHOLDGAMEPADAXES) {

                    if (this.$stateGamepad[axeMaximum] === true) {

                        this.$stateGamepad[axeMaximum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMaximum));
                    }

                    this.$stateGamepad[axeMinimum] = true;
                    window.dispatchEvent(new EventGamepadDigital('gamepaddown', axeMinimum));
                    window.dispatchEvent(new EventGamepadAnalog('gamepadanalog', axeMinimum, ($direction - (Math.sign($direction) * THRESHOLDGAMEPADAXES)) / (1 - THRESHOLDGAMEPADAXES)));
                }

                else if ($direction >= THRESHOLDGAMEPADAXES) {

                    if (this.$stateGamepad[axeMinimum] === true) {

                        this.$stateGamepad[axeMinimum] = false;
                        window.dispatchEvent(new EventGamepadDigital('gamepadup', axeMinimum));
                    }

                    this.$stateGamepad[axeMaximum] = true;
                    window.dispatchEvent(new EventGamepadDigital('gamepaddown', axeMaximum));
                    window.dispatchEvent(new EventGamepadAnalog('gamepadanalog', axeMaximum, ($direction - (Math.sign($direction) * THRESHOLDGAMEPADAXES)) / (1 - THRESHOLDGAMEPADAXES)));
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
