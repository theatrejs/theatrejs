import {AABB, COLLIDER_TYPES} from '../index.js';

/**
 * Creates colliders.
 *
 * @example
 *
 * const collider = new Collider({$boundaries, $traversable, $type});
 */
class Collider {

    /**
     * @typedef {(COLLIDER_TYPES.DYNAMIC | COLLIDER_TYPES.KINETIC | COLLIDER_TYPES.STATIC)} TypeCollider A collider type.
     * @protected
     *
     * @memberof Collider
     */

    /**
     * Stores the boundaries.
     * @type {AABB}
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
     * @type {TypeCollider}
     * @private
     */
    $type;

    /**
     * Gets the boundaries.
     * @type {AABB}
     * @public
     */
    get boundaries() {

        return this.$boundaries;
    }

    /**
     * Gets the traversable status.
     * @type {boolean}
     * @public
     */
    get traversable() {

        return this.$traversable;
    }

    /**
     * Gets the collider type.
     * @type {TypeCollider}
     * @public
     */
    get type() {

        return this.$type;
    }

    /**
     * Creates a new collider.
     * @param {Object} $parameters The given parameters.
     * @param {AABB} $parameters.$boundaries The boundaries of the collider to create.
     * @param {boolean} [$parameters.$traversable] The traversable status of the collider to create.
     * @param {TypeCollider} $parameters.$type The type of the collider to create.
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
