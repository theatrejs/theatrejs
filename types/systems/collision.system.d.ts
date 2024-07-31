export default SystemCollision;
/**
 * Creates collision systems.
 *
 * @example
 *
 * const system = new SystemCollision();
 */
export class SystemCollision {
    /**
     * @typedef {[import('../index.js').Actor, import('../index.js').Actor]} typepairactor A pair of actors.
     */
    /**
     * Stores the current collision pairs.
     * @type {typepairactor[]}
     * @private
     */
    private $current;
    /**
     * Stores the previous collision pairs.
     * @type {typepairactor[]}
     * @private
     */
    private $previous;
    /**
     * Checks if a collision previously existed between two given actors.
     * @param {import('../index.js').Actor} $dynamic The first actor to check on.
     * @param {import('../index.js').Actor} $inert The second actor to check with.
     * @returns {boolean}
     * @private
     */
    private $hasCollisionPrevious;
    /**
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    public tick($stage: import("../index.js").Stage): void;
}
