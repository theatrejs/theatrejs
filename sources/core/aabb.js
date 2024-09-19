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
     * @type {Vector2}
     * @private
     */
    $maximum;

    /**
     * Stores the minimum values of the AABB.
     * @type {Vector2}
     * @private
     */
    $minimum;

    /**
     * Gets the center of the AABB.
     * @type {Vector2}
     * @public
     */
    get center() {

        return this.minimum.clone().add(this.halfSize);
    }

    /**
     * Gets the half-size of the AABB.
     * @type {Vector2}
     * @public
     */
    get halfSize() {

        return this.size.clone().scale(0.5);
    }

    /**
     * Gets the maximum values of the AABB.
     * @type {Vector2}
     * @public
     */
    get maximum() {

        return this.$maximum;
    }

    /**
     * Gets the minimum values of the AABB.
     * @type {Vector2}
     * @public
     */
    get minimum() {

        return this.$minimum;
    }

    /**
     * Gets the size of the AABB.
     * @type {Vector2}
     * @public
     */
    get size() {

        return this.$maximum.clone().subtract(this.$minimum);
    }

    /**
     * Creates a new AABB.
     * @param {Vector2} $minimum The minimum values of the AABB to create.
     * @param {Vector2} $maximum The maximum values of the AABB to create.
     */
    constructor($minimum, $maximum) {

        this.$maximum = $maximum;
        this.$minimum = $minimum;
    }

    /**
     * Gets the manhattan distance between two AABBs.
     * @param {AABB} $a The first AABB to compare.
     * @param {AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    static distanceManhattan($a, $b) {

        const distanceX = AABB.distanceX($a, $b);
        const distanceY = AABB.distanceY($a, $b);

        if (distanceX > 0 || distanceY > 0) {

            return Math.max(distanceX, 0) + Math.max(distanceY, 0);
        }

        return distanceX + distanceY;
    }

    /**
     * Gets the distance between two AABBs on the x-axis.
     * @param {AABB} $a The first AABB to compare.
     * @param {AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    static distanceX($a, $b) {

        const distanceCenter = Math.abs($b.center.x - $a.center.x);
        const distanceMinimum = $a.halfSize.x + $b.halfSize.x;

        return distanceCenter - distanceMinimum;
    }

    /**
     * Gets the distance between two AABBs on the y-axis.
     * @param {AABB} $a The first AABB to compare.
     * @param {AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    static distanceY($a, $b) {

        const distanceCenter = Math.abs($b.center.y - $a.center.y);
        const distanceMinimum = $a.halfSize.y + $b.halfSize.y;

        return distanceCenter - distanceMinimum;
    }

    /**
     * Creates a new AABB from the given AABB.
     * @param {AABB} $aabb The given AABB.
     * @returns {AABB}
     * @public
     * @static
     */
    static from($aabb) {

        return $aabb.clone();
    }

    /**
     * Gets the delta penetration between two AABBs strictly overlaping with each other on the x-axis (the common area).
     * @param {AABB} $a The first AABB to compare.
     * @param {AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    static overlapX($a, $b) {

        const distanceCenter = Math.abs($b.center.x - $a.center.x);
        const distanceMinimum = $a.halfSize.x + $b.halfSize.x;

        return distanceMinimum - distanceCenter;
    }

    /**
     * Gets the delta penetration between two AABBs strictly overlaping with each other on the y-axis (the common area).
     * @param {AABB} $a The first AABB to compare.
     * @param {AABB} $b The second AABB to compare.
     * @returns {number}
     * @public
     * @static
     */
    static overlapY($a, $b) {

        const distanceCenter = Math.abs($b.center.y - $a.center.y);
        const distanceMinimum = $a.halfSize.y + $b.halfSize.y;

        return distanceMinimum - distanceCenter;
    }

    /**
     * Clones the AABB.
     * @returns {AABB}
     * @public
     */
    clone() {

        return new AABB(this.$minimum, this.$maximum);
    }

    /**
     * Translates the AABB in the world space from a third person point of view.
     * @param {Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        this.$maximum = this.$maximum.clone().add($vector);
        this.$minimum = this.$minimum.clone().add($vector);

        return this;
    }
}

export {

    AABB
};

export default AABB;
