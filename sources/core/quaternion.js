/**
 * Creates quaternions.
 *
 * @example
 *
 * const quaternion = new Quaternion(0, 0, 0, 1);
 */
class Quaternion {

    /**
     * Stores the w component.
     * @type {number}
     * @private
     */
    $w;

    /**
     * Stores the x component.
     * @type {number}
     * @private
     */
    $x;

    /**
     * Stores the y component.
     * @type {number}
     * @private
     */
    $y;

    /**
     * Stores the z component.
     * @type {number}
     * @private
     */
    $z;

    /**
     * Gets the w component.
     * @type {number}
     * @public
     */
    get w() {

        return this.$w;
    }

    /**
     * Gets the x component.
     * @type {number}
     * @public
     */
    get x() {

        return this.$x;
    }

    /**
     * Gets the y component.
     * @type {number}
     * @public
     */
    get y() {

        return this.$y;
    }

    /**
     * Gets the z component.
     * @type {number}
     * @public
     */
    get z() {

        return this.$z;
    }

    /**
     * Creates a new quaternion.
     * @param {number} $x The x component of the quaternion to create.
     * @param {number} $y The y component of the quaternion to create.
     * @param {number} $z The z component of the quaternion to create.
     * @param {number} $w The w component of the quaternion to create.
     */
    constructor($x, $y, $z, $w) {

        this.$w = $w;
        this.$x = $x;
        this.$y = $y;
        this.$z = $z;
    }
}

export {

    Quaternion
};

export default Quaternion;
