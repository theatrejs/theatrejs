/**
 * Creates Theatre.js state managers.
 * @template {any} Type The generic type of the data state.
 * @example
 * const state = new State(data);
 */
class State {

    /**
     * @callback typewatcherstate A state changing handler.
     * @param {Type} $state The new data state.
     */

    /**
     * Stores the data state.
     * @type {Type}
     * @private
     */
    $data;

    /**
     * Stores the state changing handlers.
     * @type {typewatcherstate[]}
     * @private
     */
    $watchers;

    /**
     * Creates a new Hypercube.js state manager.
     * @param {Type} $data The data state to store.
     */
    constructor($data) {

        this.$data = $data;
        this.$watchers = [];
    }

    /**
     * Gets the data state.
     * @returns {Type}
     * @public
     */
    getstate() {

        return this.$data;
    }

    /**
     * Sets the data state.
     * @param {Type} $data The data state to set.
     * @public
     */
    setstate($data) {

        this.$data = $data;

        this.$watchers.forEach(($handler) => {

            $handler(this.$data);
        });
    }

    /**
     * Removes all watchers of the data state changes.
     * @public
     */
    unwatchall() {

        this.$watchers = [];
    }

    /**
     * Removes a watcher of the data state changes.
     * @param {typewatcherstate} $handler The state changing handler to detach.
     * @public
     */
    unwatchstate($handler) {

        while (this.$watchers.indexOf($handler) !== -1) {

            this.$watchers.splice(this.$watchers.indexOf($handler), 1);
        }
    }

    /**
     * Adds a watcher for the data state changes.
     * @param {typewatcherstate} $handler The state changing handler to attach.
     * @public
     */
    watchstate($handler) {

        this.$watchers.push($handler);
    }
}

export {

    State
};

export default State;
