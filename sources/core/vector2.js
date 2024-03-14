/**
 * Creates two-dimensional vectors.
 *
 * @example
 *
 * // without chaining
 * const vector = new Vector2(3, 2);
 * vector.add(new Vector2(1, 0));
 *
 * @example
 *
 * // with chaining
 * const vector = new Vector2(3, 2).add(new Vector2(1, 0));
 */
class Vector2 {

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
     * Creates a new two-dimensional vector.
     * @param {number} [$x] The x value of the vector to create.
     * @param {number} [$y] The y value of the vector to create.
     */
    constructor($x = 0, $y = 0) {

        this.$x = $x;
        this.$y = $y;
    }

    /**
     * Adds the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to add.
     * @returns {this}
     * @public
     */
    add($vector) {

        this.$x = this.$x + $vector.x;
        this.$y = this.$y + $vector.y;

        return this;
    }
}

export {

    Vector2
};

export default Vector2;
