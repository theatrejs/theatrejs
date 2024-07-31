export default AABB;
/**
 * Creates AABBs.
 *
 * @example
 *
 * const aabb = new AABB(new Vector2(-1, -1), new Vector2(1, 1));
 */
export class AABB {
    /**
     * Gets the manhattan distance between two AABBs.
     * @param {import('../index.js').AABB} $a The first AABB to compare.
     * @param {import('../index.js').AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    public static distanceManhattan($a: import("../index.js").AABB, $b: import("../index.js").AABB): number;
    /**
     * Gets the distance between two AABBs on the x-axis.
     * @param {import('../index.js').AABB} $a The first AABB to compare.
     * @param {import('../index.js').AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    public static distanceX($a: import("../index.js").AABB, $b: import("../index.js").AABB): number;
    /**
     * Gets the distance between two AABBs on the y-axis.
     * @param {import('../index.js').AABB} $a The first AABB to compare.
     * @param {import('../index.js').AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    public static distanceY($a: import("../index.js").AABB, $b: import("../index.js").AABB): number;
    /**
     * Creates a new AABB from the given AABB.
     * @param {import('../index.js').AABB} $aabb The given AABB.
     * @returns {import('../index.js').AABB}
     * @public
     * @static
     */
    public static from($aabb: import("../index.js").AABB): import("../index.js").AABB;
    /**
     * Gets the delta penetration between two AABBs strictly overlaping with each other on the x-axis (the common area).
     * @param {import('../index.js').AABB} $a The first AABB to compare.
     * @param {import('../index.js').AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    public static overlapX($a: import("../index.js").AABB, $b: import("../index.js").AABB): number;
    /**
     * Gets the delta penetration between two AABBs strictly overlaping with each other on the y-axis (the common area).
     * @param {import('../index.js').AABB} $a The first AABB to compare.
     * @param {import('../index.js').AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    public static overlapY($a: import("../index.js").AABB, $b: import("../index.js").AABB): number;
    /**
     * Creates a new AABB.
     * @param {import('../index.js').Vector2} $minimum The minimum values of the AABB to create.
     * @param {import('../index.js').Vector2} $maximum The maximum values of the AABB to create.
     */
    constructor($minimum: import("../index.js").Vector2, $maximum: import("../index.js").Vector2);
    /**
     * Stores the maximum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $maximum;
    /**
     * Stores the minimum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $minimum;
    /**
     * Gets the center of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get center(): import("./vector2.js").Vector2;
    /**
     * Gets the half-size of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get halfSize(): import("./vector2.js").Vector2;
    /**
     * Gets the maximum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get maximum(): import("./vector2.js").Vector2;
    /**
     * Gets the minimum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get minimum(): import("./vector2.js").Vector2;
    /**
     * Gets the size of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get size(): import("./vector2.js").Vector2;
    /**
     * Clones the AABB.
     * @returns {import('../index.js').AABB}
     * @public
     */
    public clone(): import("../index.js").AABB;
    /**
     * Translates the AABB in the world space from a third person point of view.
     * @param {import('../index.js').Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    public translate($vector: import("../index.js").Vector2): this;
}
