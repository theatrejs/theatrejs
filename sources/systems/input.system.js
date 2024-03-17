import {EventGamepadAnalog, EventGamepadDigital} from '../index.js';

/**
 * Creates input systems.
 *
 * @example
 *
 * const system = new SystemInput({$container: this.container});
 * system.tick();
 */
class SystemInput {

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the input events.
     * @type {Event[]}
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
     * Stores the started status.
     * @type {boolean}
     * @private
     */
    $started;

    /**
     * Creates a new input system.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach input events.
     */
    constructor({$container}) {

        this.$container = $container;

        this.$events = [];
        this.$inputs = {};
        this.$inputsAnalog = {};
        this.$started = false;
    }

    /**
     * Gets the current input state value of the given analog input.
     * @param {string} $input The event code of the given analog input.
     * @returns {number}
     * @private
     */
    $getInputAnalog($input) {

        const input = this.$inputsAnalog[$input];

        if (typeof input === 'undefined') {

            return 0;
        }

        return input;
    }

    /**
     * Gets the current input state value of the given digital input.
     * @param {string} $input The event code of the given digital input.
     * @returns {boolean}
     * @private
     */
    $getInputDigital($input) {

        const input = this.$inputs[$input];

        if (typeof input === 'undefined') {

            return false;
        }

        return input;
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
     * Gets the current input state value of the given input.
     * @param {string} $input The event code of the given input.
     * @param {boolean} [$analog] The value type to get.
     * @returns {boolean | number}
     * @public
     */
    getInput($input, $analog = false) {

        if ($analog === true) {

            return this.$getInputAnalog($input);
        }

        return this.$getInputDigital($input);
    }

    /**
     * Starts the system.
     * @public
     */
    start() {

        if (this.$started === true) {

            return;
        }

        window.addEventListener('blur', this.$stack.bind(this));

        window.addEventListener('gamepadanalog', this.$stack.bind(this));
        window.addEventListener('gamepadconnect', this.$stack.bind(this));
        window.addEventListener('gamepaddown', this.$stack.bind(this));
        window.addEventListener('gamepadup', this.$stack.bind(this));

        this.$container.addEventListener('keydown', this.$stack.bind(this));
        this.$container.addEventListener('keyup', this.$stack.bind(this));

        this.$started = true;
    }

    /**
     * Stops the system.
     * @public
     */
    stop() {

        if (this.$started === false) {

            return;
        }

        window.removeEventListener('blur', this.$stack.bind(this));

        window.removeEventListener('gamepadanalog', this.$stack.bind(this));
        window.removeEventListener('gamepadconnect', this.$stack.bind(this));
        window.removeEventListener('gamepaddown', this.$stack.bind(this));
        window.removeEventListener('gamepadup', this.$stack.bind(this));

        this.$container.removeEventListener('keydown', this.$stack.bind(this));
        this.$container.removeEventListener('keyup', this.$stack.bind(this));

        this.$started = false;
    }

    /**
     * Updates the system by one tick update.
     * @public
     */
    tick() {

        if (this.$started === false) {

            this.start();
        }

        while (this.$events.length > 0) {

            const $event = this.$events.shift();

            if ($event.type === 'blur') {

                this.$inputs = {};
                this.$inputsAnalog = {};
            }

            else if ($event instanceof EventGamepadAnalog
            && $event.type === 'gamepadanalog') {

                this.$inputsAnalog[$event.code] = $event.value;
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === 'gamepaddown') {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof EventGamepadDigital
            && $event.type === 'gamepadup') {

                if (typeof this.$inputs[$event.code] !== 'undefined') {

                    delete this.$inputs[$event.code];
                }
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === 'keydown') {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof KeyboardEvent
            && $event.type === 'keyup') {

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
