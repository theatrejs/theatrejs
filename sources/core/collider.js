/**
 * Creates colliders.
 *
 * @example
 *
 * const collider = new Collider({$boundaries, $traversable, $type});
 */
class Collider {

    /**
     * @typedef {(import('../index.js').COLLIDERTYPES.DYNAMIC | import('../index.js').COLLIDERTYPES.KINETIC | import('../index.js').COLLIDERTYPES.STATIC)} typecollider A collider type.
     */

    /**
     * Stores the boundaries.
     * @type {import('../index.js').AABB}
     * @private
     */
    $boundaries;

    /**
     * Stores the traversable status.
     * @type {boolean}
     * @private
     */
    $traversable;

    /**
     * Stores the collider type.
     * @type {typecollider}
     * @private
     */
    $type;

    /**
     * Gets the boundaries.
     * @type {import('../index.js').AABB}
     * @public
     * @readonly
     */
    get boundaries() {

        return this.$boundaries;
    }

    /**
     * Gets the traversable status.
     * @type {boolean}
     * @public
     * @readonly
     */
    get traversable() {

        return this.$traversable;
    }

    /**
     * Gets the collider type.
     * @type {typecollider}
     * @public
     * @readonly
     */
    get type() {

        return this.$type;
    }

    /**
     * Creates a new collider.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} $parameters.$boundaries The boundaries of the collider to create.
     * @param {boolean} [$parameters.$traversable] The traversable status of the collider to create.
     * @param {typecollider} $parameters.$type The type of the collider to create.
     */
    constructor({$boundaries, $traversable = false, $type}) {

        this.$boundaries = $boundaries;
        this.$traversable = $traversable;
        this.$type = $type;
    }
}

export {

    Collider
};

export default Collider;
