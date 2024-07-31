export default State;
/**
 * Creates state managers.
 * @template {any} Type The generic type of the data state.
 *
 * @example
 *
 * const state = new State(data);
 */
export class State<Type extends unknown> {
    /**
     * Creates a new state manager.
     * @param {Type} $data The data state to store.
     */
    constructor($data: Type);
    /**
     * @callback typewatcherstate A state changing handler.
     * @param {Type} $state The new data state.
     * @returns {void}
     */
    /**
     * Stores the data state.
     * @type {Type}
     * @private
     */
    private $data;
    /**
     * Stores the state changing handlers.
     * @type {typewatcherstate[]}
     * @private
     */
    private $watchers;
    /**
     * Gets the data state.
     * @returns {Type}
     * @public
     */
    public getState(): Type;
    /**
     * Sets the data state.
     * @param {Type} $data The data state to set.
     * @public
     */
    public setState($data: Type): void;
    /**
     * Removes all watchers of the data state changes.
     * @public
     */
    public unwatchAll(): void;
    /**
     * Removes a watcher of the data state changes.
     * @param {typewatcherstate} $handler The state changing handler to detach.
     * @public
     */
    public unwatchState($handler: ($state: Type) => void): void;
    /**
     * Adds a watcher for the data state changes.
     * @param {typewatcherstate} $handler The state changing handler to attach.
     * @public
     */
    public watchState($handler: ($state: Type) => void): void;
}
