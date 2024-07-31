export default Engine;
/**
 * Creates game engines.
 *
 * @example
 *
 * const engine = new Engine({$container, $resolution});
 * engine.createStage(SceneExample);
 * engine.initiate(60);
 */
export class Engine {
    /**
     * Creates a new game engine.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container for the game engine to create.
     * @param {import('../index.js').Vector2} [$parameters.$resolution] The rendering resolution to use.
     */
    constructor({ $container, $resolution }: {
        $container: HTMLElement;
        $resolution?: import("../index.js").Vector2;
    });
    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    private $container;
    /**
     * Stores the loop.
     * @type {import('../index.js').Loop}
     * @private
     */
    private $loop;
    /**
     * Stores the next stage.
     * @type {typeof import('../index.js').Stage}
     * @private
     */
    private $next;
    /**
     * Stores the preloaded status of the assets.
     * @type {Set<string>}
     * @private
     */
    private $preloaded;
    /**
     * Stores the resolution.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $resolution;
    /**
     * Stores the current stage.
     * @type {import('../index.js').Stage}
     * @private
     */
    private $stage;
    /**
     * Stores the current actor system.
     * @type {import('../index.js').SystemActor}
     * @private
     */
    private $systemActor;
    /**
     * Stores the current audio system.
     * @type {import('../index.js').SystemAudio}
     * @private
     */
    private $systemAudio;
    /**
     * Stores the current collision system.
     * @type {import('../index.js').SystemCollision}
     * @private
     */
    private $systemCollision;
    /**
     * Stores the current input system.
     * @type {import('../index.js').SystemInput}
     * @private
     */
    private $systemInput;
    /**
     * Stores the current render system.
     * @type {import('../index.js').SystemRender}
     * @private
     */
    private $systemRender;
    /**
     * Stores the current vibration system.
     * @type {import('../index.js').SystemVibration}
     * @private
     */
    private $systemVibration;
    /**
     * Stores the uuid.
     * @type {string}
     * @private
     */
    private $uuid;
    /**
     * Gets the container.
     * @type {HTMLElement}
     * @public
     */
    public get container(): HTMLElement;
    /**
     * Gets the current stage.
     * @type {import('../index.js').Stage}
     * @public
     */
    public get stage(): Stage;
    /**
     * Gets the uuid.
     * @type {string}
     * @public
     */
    public get uuid(): string;
    /**
     * Creates the given stage.
     * @param {typeof import('../index.js').Stage} $stage The stage to create.
     * @private
     */
    private $createStage;
    /**
     * Creates the given stage on the next tick update.
     * @param {typeof import('../index.js').Stage} $stage The stage to create on the next tick update.
     * @public
     */
    public createStage($stage: typeof import("../index.js").Stage): void;
    getInput($input: string): boolean;
    getInputAnalog($input: string): number;
    /**
     * Checks if the engine has loaded the given asset.
     * @param {string} $asset The asset source.
     * return {boolean}
     * @public
     */
    public hasAssetLoaded($asset: string): boolean;
    /**
     * Initiates the engine.
     * @param {number} [$tickrateMinimum] The minimum acceptable number of ticks per virtual second (in ticks/s).
     * @public
     */
    public initiate($tickrateMinimum?: number): void;
    /**
     * Preloads the assets of the given stage.
     * @param {typeof import('../index.js').Stage} $stage The stage to preload the assets from.
     * @returns {Promise<(undefined | AudioBuffer | WebGLTexture)[]>}
     * @public
     */
    public preloadStage($stage: typeof import("../index.js").Stage): Promise<(undefined | AudioBuffer | WebGLTexture)[]>;
    /**
     * Terminates the engine (immediately) (must be used outside the lifecycle of this engine).
     * @public
     */
    public terminate(): void;
    /**
     * Updates each system once.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    public tick($timetick: number): void;
}
import { Stage } from '../index.js';
