export default Collider;
/**
 * Creates colliders.
 *
 * @example
 *
 * const collider = new Collider({$boundaries, $traversable, $type});
 */
export class Collider {
    /**
     * Creates a new collider.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} $parameters.$boundaries The boundaries of the collider to create.
     * @param {boolean} [$parameters.$traversable] The traversable status of the collider to create.
     * @param {typecollider} $parameters.$type The type of the collider to create.
     */
    constructor({ $boundaries, $traversable, $type }: {
        $boundaries: import("../index.js").AABB;
        $traversable?: boolean;
        $type: "DYNAMIC" | "KINETIC" | "STATIC";
    });
    /**
     * @typedef {(import('../index.js').COLLIDERTYPES.DYNAMIC | import('../index.js').COLLIDERTYPES.KINETIC | import('../index.js').COLLIDERTYPES.STATIC)} typecollider A collider type.
     */
    /**
     * Stores the boundaries.
     * @type {import('../index.js').AABB}
     * @private
     */
    private $boundaries;
    /**
     * Stores the traversable status.
     * @type {boolean}
     * @private
     */
    private $traversable;
    /**
     * Stores the collider type.
     * @type {typecollider}
     * @private
     */
    private $type;
    /**
     * Gets the boundaries.
     * @type {import('../index.js').AABB}
     * @public
     */
    public get boundaries(): import("./aabb.js").AABB;
    /**
     * Gets the traversable status.
     * @type {boolean}
     * @public
     */
    public get traversable(): boolean;
    /**
     * Gets the collider type.
     * @type {typecollider}
     * @public
     */
    public get type(): "DYNAMIC" | "KINETIC" | "STATIC";
}
