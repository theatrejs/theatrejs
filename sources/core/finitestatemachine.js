/**
 * Creates finite state machines.
 * @template {string} T The generic type of the names of a state.
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
 */
class FiniteStateMachine {

    /**
     * @callback typestatehandlerenter A state entering handler.
     * @param {Object} $parameters The given parameters.
     * @param {T} $parameters.$previous The previous state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback typestatehandlerleave A state leaving handler.
     * @param {Object} $parameters The given parameters.
     * @param {number} $parameters.$timer The timer of the current state.
     * @param {T} $parameters.$next The next state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback typestatehandlertick A state updating handler.
     * @param {Object} $parameters The given parameters.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @param {number} $parameters.$timer The timer of the current state.
     * @returns {void}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @callback typestatetransitioncondition A state transition condition.
     * @param {Object} $parameters The given parameters.
     * @param {T} $parameters.$previous The previous state.
     * @param {number} $parameters.$timer The timer of the current state.
     * @returns {boolean}
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @typedef {Object} typestatetransition A transition to a state.
     * @property {typestatetransitioncondition} typestatetransition.$condition The condition to transition to given state.
     * @property {T} typestatetransition.$state The given state to transition to.
     * @protected
     *
     * @memberof FiniteStateMachine
     */

    /**
     * @typedef {Object} typestate A state.
     * @property {T} typestate.$state The name of the state.
     * @property {typestatehandlerenter} [typestate.$onEnter] The handler to execute when entering the state.
     * @property {typestatehandlerleave} [typestate.$onLeave] The handler to execute when leaving the state.
     * @property {typestatehandlertick} [typestate.$onTick] The handler to execute when updating the state.
     * @property {Array<typestatetransition>} typestate.$transitions The transitions to given states.
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
     * @type {typestate}
     * @private
     */
    $previous;

    /**
     * Stores the current state.
     * @type {typestate}
     * @private
     */
    $state;

    /**
     * Stores the states.
     * @type {Map<T, typestate>}
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
     * @type {T}
     * @public
     */
    get state() {

        return this.$state.$state;
    }

    /**
     * Creates a new finite state machine.
     * @param {Array<typestate>} $data The representation of the finite state machine.
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
     * @param {T} $state The name of the state to initiate.
     * @public
     */
    initiate($state) {

        if (this.$initiated === true) {

            return;
        }

        this.$previous = this.$state
        this.$state = this.$states.get($state);

        if (typeof this.$state.$onEnter === 'function') {

            this.$state.$onEnter({$previous: undefined});
        }

        this.$initiated = true;
    }

    /**
     * Updates the finite state machine.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    update($timetick) {

        if (this.$initiated === false) {

            return;
        }

        this.$timer += $timetick;

        if (typeof this.$state.$onTick === 'function') {

            this.$state.$onTick({$timetick: $timetick, $timer: this.$timer});
        }

        for (let $transition of this.$state.$transitions) {

            let previous;

            if (typeof this.$previous !== 'undefined') {

                previous = this.$previous.$state;
            }

            const current = this.$state.$state;
            const next = $transition.$state;

            if ($transition.$condition({$previous: previous, $timer: this.$timer}) === true) {

                if (typeof this.$state.$onLeave === 'function') {

                    this.$state.$onLeave({$timer: this.$timer, $next: next});
                }

                this.$timer = 0;

                this.$previous = this.$state;
                this.$state = this.$states.get(next);

                if (typeof this.$state.$onEnter === 'function') {

                    this.$state.$onEnter({$previous: current});
                }

                this.update(0);

                break;
            }
        }
    }
}

export {

    FiniteStateMachine
};

export default FiniteStateMachine;
