/**
 * Creates three-dimensional vectors.
 *
 * @example
 *
 * // without chaining
 * const vector = new Vector3(3, 2, 1);
 * vector.add(new Vector2(1, 0, -1));
 *
 * @example
 *
 * // with chaining
 * const vector = new Vector2(3, 2, 1).add(new Vector2(1, 0, -1));
 */
class Vector3 {

    /**
     * Stores the x value.
     * @type {number}
     * @private
     */
    $x;

    /**
     * Stores the y value.
     * @type {number}
     * @private
     */
    $y;

    /**
     * Stores the z value.
     * @type {number}
     * @private
     */
    $z;

    /**
     * Gets the x value.
     * @type {number}
     * @public
     * @readonly
     */
    get x() {

        return this.$x;
    }

    /**
     * Gets the y value.
     * @type {number}
     * @public
     * @readonly
     */
    get y() {

        return this.$y;
    }

    /**
     * Gets the z value.
     * @type {number}
     * @public
     * @readonly
     */
    get z() {

        return this.$z;
    }

    /**
     * Creates a new three-dimensional vector.
     * @param {number} $x The x value of the vector to create.
     * @param {number} $y The y value of the vector to create.
     * @param {number} $z The z value of the vector to create.
     */
    constructor($x, $y, $z) {

        this.$x = $x;
        this.$y = $y;
        this.$z = $z;
    }

    /**
     * Creates a new vector from the given vector.
     * @param {import('../index.js').Vector3} $vector The given vector.
     * @returns {import('../index.js').Vector3}
     * @public
     * @static
     */
    static from($vector) {

        return $vector.clone();
    }

    /**
     * Adds the given vector.
     * @param {import('../index.js').Vector3} $vector The vector to add.
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
     * @returns {import('../index.js').Vector3}
     * @public
     */
    clone() {

        const x = this.$x;
        const y = this.$y;
        const z = this.$z;

        return new Vector3(x, y, z);
    }
}

export {

    Vector3
};

export default Vector3;
