import {EVENT_TYPES, EventGamepadAnalog, EventGamepadDigital, EventGyroscopeAnalog, EventGyroscopeDigital, EventPointerAnalog, EventPointerDigital, Stage, System} from '../index.js';

/**
 * Creates input systems.
 *
 * @example
 *
 * const system = new SystemInput({$container});
 * system.initiate();
 * system.tick();
 */
class SystemInput extends System {

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the input events.
     * @type {Array<Event>}
     * @private
     */
    $events;

    /**
     * Stores the state of the accepted inputs.
     * @type {Object<string, boolean>}
     * @private
     */
    $inputs;

    /**
     * Stores the state of the accepted analog inputs.
     * @type {Object<string, number>}
     * @private
     */
    $inputsAnalog;

    /**
     * Creates a new input system.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach input events.
     */
    constructor({$container}) {

        super();

        this.$container = $container;
    }

    /**
     * Stacks the input events for the next tick.
     * @param {Event} $event The input event to stack.
     * @private
     */
    $stack($event) {

        $event.preventDefault();

        this.$events.push($event);
    }

    /**
     * Gets the current input state value of the given digital input.
     * @param {string} $input The event code of the given digital input.
     * @returns {boolean}
     * @public
     */
    getInput($input) {

        const input = this.$inputs[$input];

        if (typeof input === 'undefined') {

            return false;
        }

        return input;
    }

    /**
     * Gets the current input state value of the given analog input.
     * @param {string} $input The event code of the given analog input.
     * @returns {number}
     * @public
     */
    getInputAnalog($input) {

        const input = this.$inputsAnalog[$input];

        if (typeof input === 'undefined') {

            return 0;
        }

        return input;
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {

        this.$events = [];
        this.$inputs = {};
        this.$inputsAnalog = {};

        window.addEventListener(EVENT_TYPES.FOCUS.BLUR, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.POINTER.CONTEXTMENU, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.POINTER.POINTER_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.POINTER.POINTER_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.POINTER.POINTER_UP, this.$stack.bind(this));

        this.$container.addEventListener(EVENT_TYPES.KEYBOARD.KEY_DOWN, this.$stack.bind(this));
        this.$container.addEventListener(EVENT_TYPES.KEYBOARD.KEY_UP, this.$stack.bind(this));
    }

    /**
     * Called when the system is being terminated.
     * @returns {(void | Promise<void>)}
     * @public
     */
    onTerminate() {

        window.removeEventListener(EVENT_TYPES.FOCUS.BLUR, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.POINTER.CONTEXTMENU, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_UP, this.$stack.bind(this));

        this.$container.removeEventListener(EVENT_TYPES.KEYBOARD.KEY_DOWN, this.$stack.bind(this));
        this.$container.removeEventListener(EVENT_TYPES.KEYBOARD.KEY_UP, this.$stack.bind(this));
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick() {

        while (this.$events.length > 0) {

            const $event = this.$events.shift();

            if ($event.type === EVENT_TYPES.FOCUS.BLUR) {

                this.$inputs = {};
                this.$inputsAnalog = {};
            }

            else if ($event instanceof EventGamepadAnalog
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG) {

                this.$inputsAnalog[$event.code] = $event.value;
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN) {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_UP) {

                if (typeof this.$inputs[$event.code] !== 'undefined') {

                    delete this.$inputs[$event.code];
                }
            }

            else if ($event instanceof EventGyroscopeAnalog
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG) {

                this.$inputsAnalog[$event.code] = $event.value;
            }

            else if ($event instanceof EventGyroscopeDigital
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN) {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof EventGyroscopeDigital
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP) {

                if (typeof this.$inputs[$event.code] !== 'undefined') {

                    delete this.$inputs[$event.code];
                }
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === EVENT_TYPES.KEYBOARD.KEY_DOWN) {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === EVENT_TYPES.KEYBOARD.KEY_UP) {

                if (typeof this.$inputs[$event.code] !== 'undefined') {

                    delete this.$inputs[$event.code];
                }
            }

            else if ($event instanceof EventPointerAnalog
            && $event.type === EVENT_TYPES.POINTER.POINTER_ANALOG) {

                this.$inputsAnalog[$event.code] = $event.value;
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === EVENT_TYPES.POINTER.POINTER_DOWN) {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === EVENT_TYPES.POINTER.POINTER_UP) {

                if (typeof this.$inputs[$event.code] !== 'undefined') {

                    delete this.$inputs[$event.code];
                }
            }
        }
    }
}

export {

    SystemInput
};

export default SystemInput;
