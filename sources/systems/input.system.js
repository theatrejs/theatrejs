import {EventGamepadAnalog, EventGamepadDigital, EventPointerAnalog, EventPointerDigital, Stage, System} from '../index.js';

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

        window.addEventListener('blur', this.$stack.bind(this));

        window.addEventListener('contextmenu', this.$stack.bind(this));

        window.addEventListener('gamepadanalog', this.$stack.bind(this));
        window.addEventListener('gamepadconnect', this.$stack.bind(this));
        window.addEventListener('gamepaddown', this.$stack.bind(this));
        window.addEventListener('gamepadup', this.$stack.bind(this));

        window.addEventListener('pointeranalog', this.$stack.bind(this));
        window.addEventListener('pointerdown', this.$stack.bind(this));
        window.addEventListener('pointerup', this.$stack.bind(this));

        this.$container.addEventListener('keydown', this.$stack.bind(this));
        this.$container.addEventListener('keyup', this.$stack.bind(this));
    }

    /**
     * Called when the system is being terminated.
     * @returns {(void | Promise<void>)}
     * @public
     */
    onTerminate() {

        window.removeEventListener('blur', this.$stack.bind(this));

        window.removeEventListener('contextmenu', this.$stack.bind(this));

        window.removeEventListener('gamepadanalog', this.$stack.bind(this));
        window.removeEventListener('gamepadconnect', this.$stack.bind(this));
        window.removeEventListener('gamepaddown', this.$stack.bind(this));
        window.removeEventListener('gamepadup', this.$stack.bind(this));

        window.removeEventListener('pointeranalog', this.$stack.bind(this));
        window.removeEventListener('pointerdown', this.$stack.bind(this));
        window.removeEventListener('pointerup', this.$stack.bind(this));

        this.$container.removeEventListener('keydown', this.$stack.bind(this));
        this.$container.removeEventListener('keyup', this.$stack.bind(this));
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

            else if ($event instanceof EventPointerAnalog
            && $event.type === 'pointeranalog') {

                this.$inputsAnalog[$event.code] = $event.value;
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === 'pointerdown') {

                if (typeof this.$inputs[$event.code] === 'undefined') {

                    this.$inputs[$event.code] = true;
                }
            }

            else if ($event instanceof EventPointerDigital
            && $event.type === 'pointerup') {

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
