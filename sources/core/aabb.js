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

        return this.minimum.clone().add(this.halfSize);
    }

    /**
     * Gets the half-size of the AABB.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get halfSize() {

        return this.size.clone().scale(0.5);
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

        return this.$maximum.clone().subtract(this.$minimum);
    }

    /**
     * Creates a new AABB.
     * @param {import('../index.js').Vector2} $minimum The minimum values of the AABB to create.
     * @param {import('../index.js').Vector2} $maximum The maximum values of the AABB to create.
     */
    constructor($minimum, $maximum) {

        this.$minimum = $minimum;
        this.$maximum = $maximum;
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
