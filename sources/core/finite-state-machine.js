// 'ESLint' configuration
/* global TypeGeneric */

/**
 * Creates finite state machines.
 * @template {string} TypeGeneric The generic type of the names of a state.
 *
 * @example
 *
 * const toggle = new FiniteStateMachine([
 *
 *     {
 *         $state: 'ON',
 *         $transitions: [{
 *
 *             $state: 'OFF',
 *             $condition: ({$timer}) => ($timer >= 1000)
 *         }]
 *     },
 *     {
 *         $state: 'OFF',
 *         $transitions: [{
 *
 *             $state: 'ON',
 *             $condition: ({$timer}) => ($timer >= 1000)
 *         }]
 *     }
 * ]);
 *
 * toggle.tick(timetick);
 */
class FiniteStateMachine {

    /**
     * @callback TypeStateHandlerEnter A state entering handler.
     * @param {object} $parameters The given parameters.
     * @param {TypeGeneric} $parameters.$previous The previous state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback TypeStateHandlerLeave A state leaving handler.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$timer The timer of the current state.
     * @param {TypeGeneric} $parameters.$next The next state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback TypeStateHandlerTick A state updating handler.
     * @param {object} $parameters The given parameters.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @param {number} $parameters.$timer The timer of the current state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback TypeStateTransitionCondition A state transition condition.
     * @param {object} $parameters The given parameters.
     * @param {TypeGeneric} $parameters.$previous The previous state.
     * @param {number} $parameters.$timer The timer of the current state.
     * @returns {boolean}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @typedef {object} TypeStateTransition A transition to a state.
     * @property {TypeStateTransitionCondition} $condition The condition to transition to given state.
     * @property {TypeGeneric} $state The given state to transition to.
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @typedef {object} TypeState A state.
     * @property {TypeGeneric} $state The name of the state.
     * @property {TypeStateHandlerEnter} [$onEnter] The handler to execute when entering the state.
     * @property {TypeStateHandlerLeave} [$onLeave] The handler to execute when leaving the state.
     * @property {TypeStateHandlerTick} [$onTick] The handler to execute when updating the state.
     * @property {Array<TypeStateTransition>} [$transitions] The transitions to given states.
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * Stores the initiated status.
     * @type {boolean}
     * @private
     */
    $initiated;

    /**
     * Stores the previous state.
     * @type {TypeState}
     * @private
     */
    $previous;

    /**
     * Stores the current state.
     * @type {TypeState}
     * @private
     */
    $state;

    /**
     * Stores the states.
     * @type {Map<TypeGeneric, TypeState>}
     * @private
     */
    $states;

    /**
     * Stores the timer of the current state.
     * @type {number}
     * @private
     */
    $timer;

    /**
     * Gets the name of the current state.
     * @type {TypeGeneric}
     * @public
     */
    get state() {

        return this.$state.$state;
    }

    /**
     * Gets the initiated status.
     * @type {boolean}
     * @public
     */
    get initiated() {

        return this.$initiated;
    }

    /**
     * Creates a new finite state machine.
     * @param {Array<TypeState>} $data The representation of the finite state machine.
     */
    constructor($data) {

        this.$initiated = false;
        this.$states = new Map();
        this.$timer = 0;

        $data.forEach(($state) => {

            this.$states.set($state.$state, $state);
        });
    }

    /**
     * Initiates the finite state machine.
     * @param {TypeGeneric} $state The name of the state to initiate.
     * @public
     */
    initiate($state) {

        if (this.$initiated === true) {

            return;
        }

        this.$previous = this.$state
        this.$state = this.$states.get($state);

        if (typeof this.$state.$onEnter === 'function') {

            this.$state.$onEnter({

                $previous: undefined
            });
        }

        this.$initiated = true;
    }

    /**
     * Updates the finite state machine by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    tick($timetick) {

        if (this.$initiated === false) {

            return;
        }

        this.$timer += $timetick;

        if (typeof this.$state.$onTick === 'function') {

            this.$state.$onTick({

                $timer: this.$timer,
                $timetick: $timetick
            });
        }

        const transitions = this.$state.$transitions;

        if (Array.isArray(transitions) === false) {

            return;
        }

        for (const $transition of transitions) {

            let previous;

            if (typeof this.$previous !== 'undefined') {

                previous = this.$previous.$state;
            }

            const current = this.$state.$state;
            const next = $transition.$state;

            const condition = $transition.$condition({

                $previous: previous,
                $timer: this.$timer
            });

            if (condition === true) {

                if (typeof this.$state.$onLeave === 'function') {

                    this.$state.$onLeave({

                        $next: next,
                        $timer: this.$timer
                    });
                }

                this.$timer = 0;

                this.$previous = this.$state;
                this.$state = this.$states.get(next);

                if (typeof this.$state.$onEnter === 'function') {

                    this.$state.$onEnter({

                        $previous: current
                    });
                }

                this.tick(0);

                break;
            }
        }
    }
}

export {

    FiniteStateMachine
};

export default FiniteStateMachine;
