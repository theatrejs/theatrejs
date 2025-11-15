/**
 * @module MATHEMATICS
 */

/**
 * The value to convert an angle from degrees to radians.
 * @type {number}
 * @constant
 *
 * @memberof module:MATHEMATICS
 */
const RADIANS = Math.PI / 180;

/**
 * The value of square root of 2 (rounded to the millionth).
 * @type {number}
 * @constant
 *
 * @memberof module:MATHEMATICS
 */
const SQRT_2 = 1.414214;

/**
 * Clamps the given value between two given bounds.
 * @param {number} $x The value to clamp.
 * @param {number} [$minimum] The minimum bound.
 * @param {number} [$maximum] The maximum bound.
 * @returns {number}
 *
 * @memberof module:MATHEMATICS
 */
function clamp($x, $minimum = 0, $maximum = 1) {

    return Math.max($minimum, Math.min($maximum, $x));
}

/**
 * Gets the length of the hypotenuse of a right triangle from the two given legs.
 * @param {number} $ab The length of the first leg.
 * @param {number} $ac The length of the second leg.
 * @returns {number}
 *
 * @memberof module:MATHEMATICS
 */
function hypotenuse($ab, $ac) {

    return Math.sqrt(($ab ** 2) + ($ac ** 2));
}

/**
 * Normalizes the given value within the given range.
 * @param {number} $x The value to normalize.
 * @param {number} $minimum The minimum value of the range.
 * @param {number} $maximum The maximum value of the range.
 * @returns {number}
 *
 * @memberof module:MATHEMATICS
 */
function normalize($x, $minimum, $maximum) {

    if ($maximum === $minimum) {

        return $maximum;
    }

    return ($x - $minimum) / ($maximum - $minimum);
}

export {

    RADIANS,
    SQRT_2,

    clamp,
    hypotenuse,
    normalize
};
