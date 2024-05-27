/**
 * Creates colliders.
 *
 * @example
 *
 * const collider = new Collider({$area, $boundaries, $type});
 */
class Collider {

    /**
     * @typedef {(import('../index.js').COLLIDERTYPES.DYNAMIC | import('../index.js').COLLIDERTYPES.KINETIC | import('../index.js').COLLIDERTYPES.STATIC)} typecollider A collider type.
     */

    /**
     * Stores the area status.
     * @type {boolean}
     * @private
     */
    $area;

    /**
     * Stores the boundaries.
     * @type {import('../index.js').AABB}
     * @private
     */
    $boundaries;

    /**
     * Stores the collider type.
     * @type {typecollider}
     * @private
     */
    $type;

    /**
     * Gets the area status.
     * @type {boolean}
     * @public
     * @readonly
     */
    get area() {

        return this.$area;
    }

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
     * @param {boolean} [$parameters.$area] The area status of the collider to create.
     * @param {import('../index.js').AABB} $parameters.$boundaries The boundaries of the collider to create.
     * @param {typecollider} $parameters.$type The type of the collider to create.
     */
    constructor({$area = false, $boundaries, $type}) {

        this.$area = $area;
        this.$boundaries = $boundaries;
        this.$type = $type;
    }
}

export {

    Collider
};

export default Collider;
