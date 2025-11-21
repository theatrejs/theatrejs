/**
 * @module CURVES
 */

/**
 * @callback TypeHandlerCurve Transforms a value according to a curve.
 * @param {number} $x The value to transform (in [0, 1] range).
 * @returns {number}
 * @protected
 *
 * @memberof module:CURVES
 */

/**
 * Prepares a doubled curve from the given curve.
 * @param {TypeHandlerCurve} $curve The curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function double($curve) {

    return ($x) => ($curve($x * 2));
}

/**
 * Prepares a halved curve from the given curve.
 * @param {TypeHandlerCurve} $curve The curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function half($curve) {

    return ($x) => ($curve($x / 2));
}

/**
 * Prepares a inverted curve from the given curve.
 * @param {TypeHandlerCurve} $curve The curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function invert($curve) {

    return ($x) => ($curve(1 - $x));
}

/**
 * Prepares a multiplied curve from the two given curves.
 * @param {TypeHandlerCurve} $f The first curve to use.
 * @param {TypeHandlerCurve} $g The second curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function multiply($f, $g) {

    return ($x) => ($f($x) * $g($x));
}

/**
 * Prepares a negated curve from the given curve.
 * @param {TypeHandlerCurve} $curve The curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function negate($curve) {

    return ($x) => (1 - $curve($x));
}

/**
 * Prepares a reversed curve from the given curve.
 * @param {TypeHandlerCurve} $curve The curve to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function reverse($curve) {

    return negate(invert($curve));
}

/**
 * Prepares a 'cosine' curve with the given amount of pi rotations.
 * @param {number} [$pi] The number pi rotations.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function cosine($pi = 2) {

    return ($x) => (Math.cos($x * $pi * Math.PI));
}

/**
 * Prepares an 'ease-in' curve with the given power.
 * @param {number} [$power] The factor to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function easeIn($power = 2) {

    return ($x) => ($x ** $power);
}

/**
 * Prepares an 'ease-in-out' curve with the given power.
 * @param {number} [$power] The factor to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function easeInOut($power = 2) {

    return ($x) => {

        if ($x < 0.5) {

            return double(easeIn($power))($x) / 2;
        }

        return 0.5 + double(easeOut($power))($x - 0.5) / 2;
    };
}

/**
 * Prepares an 'ease-out' curve with the given power.
 * @param {number} [$power] The power to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function easeOut($power = 2) {

    return reverse(easeIn($power));
}

/**
 * Prepares a 'linear' curve with the given factor.
 * @param {number} [$factor] The factor to use.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function linear($factor = 1) {

    return ($x) => ($x * $factor);
}

/**
 * Prepares a 'sine' curve with the given amount of pi rotations.
 * @param {number} [$pi] The number pi rotations.
 * @returns {TypeHandlerCurve}
 *
 * @memberof module:CURVES
 */
function sine($pi = 2) {

    return ($x) => (Math.sin($x * $pi * Math.PI));
}

export {

    double,
    half,
    invert,
    multiply,
    negate,
    reverse,

    cosine,
    easeIn,
    easeInOut,
    easeOut,
    linear,
    sine
};
