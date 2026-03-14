import {EVENT_CODES, EVENT_TYPES, EventGamepadAnalog, EventGamepadDigital, EventGravityAnalog, EventGravityDigital, EventGyroscopeAnalog, EventGyroscopeDigital, EventPointerAnalog, EventPointerDigital, Stage, System} from '../index.js';

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
     * @typedef {object} TypeStateInput Statuses of an accepted input.
     * @property {number} $analog The analog value of the input.
     * @property {boolean} $initiate The initiated status of the input.
     * @property {boolean} $persist The persisted status of the input.
     * @property {boolean} $terminate The terminated status of the input.
     * @private
     *
     * @memberof SystemInput
     */

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
     * Stores the statuses of the accepted inputs.
     * @type {Map<string, TypeStateInput>}
     * @private
     */
    $inputs;

    /**
     * Creates a new input system.
     * @param {object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach input events.
     */
    constructor({$container}) {

        super();

        this.$container = $container;
    }

    /**
     * Handles an input being initiated.
     * @param {string} $input The event code of the input.
     * @private
     */
    $handleInputDown($input) {

        const initiate = this.$inputs.has($input) === false;

        /**
         * @type {TypeStateInput}
         */
        const state = {

            $analog: 0,
            $initiate: initiate,
            $persist: true,
            $terminate: false
        };

        this.$inputs.set($input, state);
    }

    /**
     * Handles an input being terminated.
     * @param {string} $input The event code of the input.
     * @private
     */
    $handleInputUp($input) {

        /**
         * @type {TypeStateInput}
         */
        const state = {

            $analog: 0,
            $initiate: false,
            $persist: false,
            $terminate: true
        };

        this.$inputs.set($input, state);
    }

    /**
     * Sets the analog value of the given input.
     * @param {string} $input The event code of the input.
     * @param {number} $value The analog value of the input to set.
     * @private
     */
    $setInputAnalog($input, $value) {

        this.$inputs.get($input).$analog = $value;
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
     * Gets the persisted status of the given input.
     * @param {string} $input The event code of the input.
     * @returns {boolean}
     * @public
     */
    getInput($input) {

        if (this.$inputs.has($input) === false) {

            return false;
        }

        return this.$inputs.get($input).$persist;
    }

    /**
     * Gets the analog value of the given input.
     * @param {string} $input The event code of the input.
     * @returns {number}
     * @public
     */
    getInputAnalog($input) {

        if (this.$inputs.has($input) === false) {

            return 0;
        }

        return this.$inputs.get($input).$analog;
    }

    /**
     * Gets the initiated status of the given input.
     * @param {string} $input The event code of the input.
     * @returns {boolean}
     * @public
     */
    getInputDown($input) {

        if (this.$inputs.has($input) === false) {

            return false;
        }

        return this.$inputs.get($input).$initiate;
    }

    /**
     * Gets the terminated status of the given input.
     * @param {string} $input The event code of the input.
     * @returns {boolean}
     * @public
     */
    getInputUp($input) {

        if (this.$inputs.has($input) === false) {

            return false;
        }

        return this.$inputs.get($input).$terminate;
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {

        this.$events = [];
        this.$inputs = new Map();

        window.addEventListener(EVENT_TYPES.NATIVE.BLUR, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.NATIVE.CONTEXT_MENU, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.GRAVITY.GRAVITY_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GRAVITY.GRAVITY_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GRAVITY.GRAVITY_UP, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, this.$stack.bind(this));

        window.addEventListener(EVENT_TYPES.POINTER.POINTER_ANALOG, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.POINTER.POINTER_DOWN, this.$stack.bind(this));
        window.addEventListener(EVENT_TYPES.POINTER.POINTER_UP, this.$stack.bind(this));

        this.$container.addEventListener(EVENT_TYPES.KEYBOARD.KEY_DOWN, this.$stack.bind(this));
        this.$container.addEventListener(EVENT_TYPES.KEYBOARD.KEY_UP, this.$stack.bind(this));
    }

    /**
     * Called when the system is being terminated.
     * @returns {(undefined | Promise<void>)}
     * @public
     */
    onTerminate() {

        window.removeEventListener(EVENT_TYPES.NATIVE.BLUR, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.NATIVE.CONTEXT_MENU, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GAMEPAD.GAMEPAD_UP, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.GRAVITY.GRAVITY_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GRAVITY.GRAVITY_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GRAVITY.GRAVITY_UP, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, this.$stack.bind(this));

        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_ANALOG, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_DOWN, this.$stack.bind(this));
        window.removeEventListener(EVENT_TYPES.POINTER.POINTER_UP, this.$stack.bind(this));

        this.$container.removeEventListener(EVENT_TYPES.KEYBOARD.KEY_DOWN, this.$stack.bind(this));
        this.$container.removeEventListener(EVENT_TYPES.KEYBOARD.KEY_UP, this.$stack.bind(this));

        return undefined;
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage, $timetick}) {

        void $stage;
        void $timetick;

        Array.from(this.$inputs.entries()).forEach(([$code, $state]) => {

            if ($state.$terminate === true) {

                this.$inputs.delete($code);

                return;
            }

            if ($code === EVENT_CODES.GAMEPAD_STANDARD.CONNECTED
            || $code === EVENT_CODES.GAMEPAD_STANDARD.DISCONNECTED) {

                $state.$analog = 0;
                $state.$initiate = false;
                $state.$persist = false;
                $state.$terminate = true;

                return;
            }

            if ($state.$initiate === true) {

                $state.$initiate = false;

                return;
            }
        });

        while (this.$events.length > 0) {

            const $event = this.$events.shift();

            if ($event.type === EVENT_TYPES.NATIVE.BLUR) {

                this.$inputs.values().forEach(($state) => {

                    $state.$analog = 0;
                    $state.$initiate = false;
                    $state.$persist = false;
                    $state.$terminate = true;
                });
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_CONNECT) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_DOWN) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_UP) {

                this.$handleInputUp($event.code);
            }

            else if ($event instanceof EventGamepadAnalog
            && $event.type === EVENT_TYPES.GAMEPAD.GAMEPAD_ANALOG) {

                this.$setInputAnalog($event.code, $event.value);
            }

            else if ($event instanceof EventGravityDigital
            && $event.type === EVENT_TYPES.GRAVITY.GRAVITY_DOWN) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof EventGravityDigital
            && $event.type === EVENT_TYPES.GRAVITY.GRAVITY_UP) {

                this.$handleInputUp($event.code);
            }

            else if ($event instanceof EventGravityAnalog
            && $event.type === EVENT_TYPES.GRAVITY.GRAVITY_ANALOG) {

                this.$setInputAnalog($event.code, $event.value);
            }

            else if ($event instanceof EventGyroscopeDigital
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof EventGyroscopeDigital
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP) {

                this.$handleInputUp($event.code);
            }

            else if ($event instanceof EventGyroscopeAnalog
            && $event.type === EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG) {

                this.$setInputAnalog($event.code, $event.value);
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === EVENT_TYPES.KEYBOARD.KEY_DOWN) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === EVENT_TYPES.KEYBOARD.KEY_UP) {

                this.$handleInputUp($event.code);
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === EVENT_TYPES.POINTER.POINTER_DOWN) {

                this.$handleInputDown($event.code);
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === EVENT_TYPES.POINTER.POINTER_UP) {

                this.$handleInputUp($event.code);
            }

            else if ($event instanceof EventPointerAnalog
            && $event.type === EVENT_TYPES.POINTER.POINTER_ANALOG) {

                this.$setInputAnalog($event.code, $event.value);
            }
        }
    }
}

export {

    SystemInput
};

export default SystemInput;
