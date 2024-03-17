import {Vector2} from '../index.js';

/**
 * Creates AABBs.
 *
 * @example
 *
 * const aabb = new AABB(new Vector2(-1, -1), new Vector2(1, 1));
 */
class AABB {

    /**
     * Stores the maximum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $maximum;

    /**
     * Stores the minimum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $minimum;

    /**
     * Gets the center of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get center() {

        return Vector2.from(this.minimum).add(this.halfSize);
    }

    /**
     * Gets the half-size of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get halfSize() {

        return Vector2.from(this.size).scale(0.5);
    }

    /**
     * Gets the maximum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get maximum() {

        return this.$maximum;
    }

    /**
     * Gets the minimum values of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get minimum() {

        return this.$minimum;
    }

    /**
     * Gets the size of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get size() {

        return Vector2.from(this.$maximum).subtract(this.$minimum);
    }

    /**
     * Creates a new AABB.
     * @param {import('../index.js').Vector2} $minimum The minimum values of the AABB to create.
     * @param {import('../index.js').Vector2} $maximum The maximum values of the AABB to create.
     */
    constructor($minimum, $maximum) {

        this.$minimum = $minimum.clone();
        this.$maximum = $maximum.clone();
    }

    /**
     * Creates a new AABB from the given AABB.
     * @param {import('../index.js').AABB} $aabb The given AABB.
     * @returns {import('../index.js').AABB}
     * @public
     * @static
     */
    static from($aabb) {

        return $aabb.clone();
    }

    /**
     * Clones the AABB.
     * @returns {import('../index.js').AABB}
     * @public
     */
    clone() {

        return new AABB(this.$minimum, this.$maximum);
    }
}

export {

    AABB
};

export default AABB;
