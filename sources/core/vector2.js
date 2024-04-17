import {CONSTANTS} from '../index.js';

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
     * @param {number} $x The x value of the vector to create.
     * @param {number} $y The y value of the vector to create.
     */
    constructor($x, $y) {

        this.$x = $x;
        this.$y = $y;
    }

    /**
     * Creates a new vector from the given vector.
     * @param {import('../index.js').Vector2} $vector The given vector.
     * @returns {import('../index.js').Vector2}
     * @public
     * @static
     */
    static from($vector) {

        return $vector.clone();
    }

    /**
     * Adds the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to add.
     * @returns {this}
     * @public
     */
    add($vector) {

        const x = this.$x;
        const y = this.$y;

        this.$x = x + $vector.x;
        this.$y = y + $vector.y;

        return this;
    }

    /**
     * Clones the vector.
     * @returns {import('../index.js').Vector2}
     * @public
     */
    clone() {

        const x = this.$x;
        const y = this.$y;

        return new Vector2(x, y);
    }

    /**
     * Checks the equality with the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to check with.
     * @returns {boolean}
     * @public
     */
    equal($vector) {

        return this.$x === $vector.x
        && this.$y === $vector.y;
    }

    /**
     * Gets the length of the vector.
     * @returns {number}
     * @public
     */
    length() {

        const x = this.$x;
        const y = this.$y;

        return Math.sqrt(x * x + y * y);
    }

    /**
     * Multiplies with the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to multiply with.
     * @returns {this}
     * @public
     */
    multiply($vector) {

        const x = this.$x;
        const y = this.$y;

        this.$x = x * $vector.x;
        this.$y = y * $vector.y;

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

        this.$x = - x;
        this.$y = - y;

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

        let length = x * x + y * y;

        if (length > 0) {

            length = 1 / Math.sqrt(length);
        }

        this.$x = x * length;
        this.$y = y * length;

        return this;
    }

    /**
     * Rotates the vector by the given angle.
     * @param {number} $angle The angle of rotation to apply (in degrees) (clockwise).
     * @returns {this}
     * @public
     */
    rotate($angle) {

        const x = this.$x;
        const y = this.$y;

        const radians = $angle * CONSTANTS.RADIANS;

        const cosine = Math.cos(radians);
        const sine = Math.sin(radians);

        this.$x = x * cosine - y * sine;
        this.$y = x * sine + y * cosine;

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

        this.$x = x * $factor;
        this.$y = y * $factor;

        return this;
    }

    /**
     * Subtracts the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to subtract.
     * @returns {this}
     * @public
     */
    subtract($vector) {

        const x = this.$x;
        const y = this.$y;

        this.$x = x - $vector.x;
        this.$y = y - $vector.y;

        return this;
    }
}

export {

    Vector2
};

export default Vector2;
