export default Stage;
/**
 * Abstract stages.
 *
 * @example
 *
 * class StageExample extends Stage {}
 */
export class Stage {
    /**
     * Stores the preloadable assets.
     * @type {string[]}
     * @public
     * @static
     */
    public static preloadables: string[];
    /**
     * Creates a new stage.
     * @param {import('../index.js').Engine} $engine The engine on which to create the stage.
     */
    constructor($engine: import("../index.js").Engine);
    /**
     * Stores the current actors.
     * @type {import('../index.js').Actor[]}
     * @private
     */
    private $actors;
    /**
     * Stores the current engine.
     * @type {import('../index.js').Engine}
     * @private
     */
    private $engine;
    /**
     * Stores the point of view.
     * @type {import('../index.js').Actor}
     * @private
     */
    private $pointOfView;
    /**
     * Stores the uuid.
     * @type {string}
     * @private
     */
    private $uuid;
    /**
     * Gets the current actors.
     * @type {import('../index.js').Actor[]}
     * @public
     */
    public get actors(): Actor[];
    /**
     * Gets the current engine.
     * @type {import('../index.js').Engine}
     * @public
     */
    public get engine(): import("./engine.js").Engine;
    /**
     * Gets the point of view.
     * @type {import('../index.js').Actor}
     * @public
     */
    public get pointOfView(): Actor;
    /**
     * Gets the uuid.
     * @type {string}
     * @public
     */
    public get uuid(): string;
    /**
     * Creates the given actor.
     * @param {typeof import('../index.js').Actor} [$actor] The actor to create.
     * @public
     */
    public createActor($actor?: typeof import("../index.js").Actor): Actor;
    /**
     * Checks if the stage has the given actor.
     * @param {import('../index.js').Actor} $actor The actor to check.
     * return {boolean}
     * @public
     */
    public hasActor($actor: import("../index.js").Actor): boolean;
    /**
     * Called when the stage is being created.
     * @public
     */
    public onCreate(): void;
    /**
     * Removes the given actor.
     * @param {import('../index.js').Actor} $actor The actor to remove.
     * @public
     */
    public removeActor($actor: import("../index.js").Actor): void;
    /**
     * Removes all actors.
     * @public
     */
    public removeActors(): void;
    /**
     * Sets the given actor as the point of view.
     * @param {import('../index.js').Actor} $actor The actor to set as the point of view.
     * @public
     */
    public setPointOfView($actor: import("../index.js").Actor): void;
}
import { Actor } from '../index.js';
