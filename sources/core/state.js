/**
 * Creates state managers.
 * @template {any} TypeGeneric The generic type of the data state.
 *
 * @example
 *
 * const state = new State(data);
 */
class State {

    /**
     * @callback TypeWatcherState A state changing handler.
     * @param {TypeGeneric} $state The new data state.
     * @returns {void}
     * @protected
     *
     * @memberof State
     */

    /**
     * Stores the data state.
     * @type {TypeGeneric}
     * @private
     */
    $data;

    /**
     * Stores the state changing handlers.
     * @type {Array<TypeWatcherState>}
     * @private
     */
    $watchers;

    /**
     * Creates a new state manager.
     * @param {TypeGeneric} $data The data state to store.
     */
    constructor($data) {

        this.$data = $data;
        this.$watchers = [];
    }

    /**
     * Gets the data state.
     * @returns {TypeGeneric}
     * @public
     */
    getState() {

        return this.$data;
    }

    /**
     * Sets the data state.
     * @param {TypeGeneric} $data The data state to set.
     * @public
     */
    setState($data) {

        this.$data = $data;

        this.$watchers.forEach(($handler) => {

            $handler(this.$data);
        });
    }

    /**
     * Removes all watchers of the data state changes.
     * @public
     */
    unwatchAll() {

        this.$watchers = [];
    }

    /**
     * Removes a watcher of the data state changes.
     * @param {TypeWatcherState} $handler The state changing handler to detach.
     * @public
     */
    unwatchState($handler) {

        while (this.$watchers.indexOf($handler) !== -1) {

            this.$watchers.splice(this.$watchers.indexOf($handler), 1);
        }
    }

    /**
     * Adds a watcher for the data state changes.
     * @param {TypeWatcherState} $handler The state changing handler to attach.
     * @public
     */
    watchState($handler) {

        this.$watchers.push($handler);
    }
}

export {

    State
};

export default State;
