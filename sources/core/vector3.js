import {Quaternion} from '../index.js';

/**
 * Creates three-dimensional vectors.
 *
 * @example
 *
 * // without chaining
 * const vector = new Vector3(3, 2, 1);
 * vector.add(new Vector3(1, 0, -1));
 *
 * @example
 *
 * // with chaining
 * const vector = new Vector3(3, 2, 1).add(new Vector3(1, 0, -1));
 */
class Vector3 {

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
     * Creates a new three-dimensional vector.
     * @param {number} $x The x component of the vector to create.
     * @param {number} $y The y component of the vector to create.
     * @param {number} $z The z component of the vector to create.
     */
    constructor($x, $y, $z) {

        this.$x = $x;
        this.$y = $y;
        this.$z = $z;
    }

    /**
     * Creates a new vector from the given vector.
     * @param {Vector3} $vector The given vector.
     * @returns {Vector3}
     * @public
     * @static
     */
    static from($vector) {

        return $vector.clone();
    }

    /**
     * Adds the given vector.
     * @param {Vector3} $vector The vector to add.
     * @returns {this}
     * @public
     */
    add($vector) {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = x + $vector.x;
        this.$y = y + $vector.y;
        this.$z = z + $vector.z;

        return this;
    }

    /**
     * Clones the vector.
     * @returns {Vector3}
     * @public
     */
    clone() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        return new Vector3(x, y, z);
    }

    /**
     * Checks the equality with the given vector.
     * @param {Vector3} $vector The vector to check with.
     * @returns {boolean}
     * @public
     */
    equal($vector) {

        return this.$x === $vector.x
        && this.$y === $vector.y
        && this.$z === $vector.z;
    }

    /**
     * Gets the length of the vector.
     * @returns {number}
     * @public
     */
    length() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * Multiplies with the given vector.
     * @param {Vector3} $vector The vector to multiply with.
     * @returns {this}
     * @public
     */
    multiply($vector) {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = x * $vector.x;
        this.$y = y * $vector.y;
        this.$z = z * $vector.z;

        return this;
    }

    /**
     * Negates the vector.
     * @returns {this}
     * @public
     */
    negate() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = - x;
        this.$y = - y;
        this.$z = - z;

        return this;
    }

    /**
     * Normalizes the vector.
     * @returns {this}
     * @public
     */
    normalize() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        let length = x * x + y * y + z * z;

        if (length > 0) {

            length = 1 / Math.sqrt(length);
        }

        this.$x = x * length;
        this.$y = y * length;
        this.$z = z * length;

        return this;
    }

    /**
     * Rotates the vector.
     * @param {Quaternion} $quaternion The rotation to apply.
     * @returns {this}
     * @public
     */
    rotate($quaternion) {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        const xq = $quaternion.x;
        const yq = $quaternion.y;
        const zq = $quaternion.z;
        const wq = $quaternion.w;

        let xu = yq * z - zq * y;
        let yu = zq * x - xq * z;
        let zu = xq * y - yq * x;

        let xv = yq * zu - zq * yu;
        let yv = zq * xu - xq * zu;
        let zv = xq * yu - yq * xu;

        const w = wq * 2;

        xu *= w;
        yu *= w;
        zu *= w;

        xv *= 2;
        yv *= 2;
        zv *= 2;

        this.$x = x + xu + xv;
        this.$y = y + yu + yv;
        this.$z = z + zu + zv;

        return this;
    }

    /**
     * Rounds the vector.
     * @returns {this}
     * @public
     */
    round() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = Math.round(x);
        this.$y = Math.round(y);
        this.$z = Math.round(z);

        return this;
    }

    /**
     * Scales the vector by the given scalar factor.
     * @param {number} $factor The scalar factor to multiply with.
     * @returns {this}
     * @public
     */
    scale($factor) {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = x * $factor;
        this.$y = y * $factor;
        this.$z = z * $factor;

        return this;
    }

    /**
     * Subtracts the given vector.
     * @param {Vector3} $vector The vector to subtract.
     * @returns {this}
     * @public
     */
    subtract($vector) {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        this.$x = x - $vector.x;
        this.$y = y - $vector.y;
        this.$z = z - $vector.z;

        return this;
    }
}

export {

    Vector3
};

export default Vector3;
