import {CURVES, MATHEMATICS} from '../index.js';

/**
 * Creates curves.
 *
 * @example
 *
 * // without chaining
 * const curve = new Curve(curve);
 * curve.setDuration(800);
 *
 * const progress = curve.getProgress(previous, current);
 *
 * @example
 *
 * // with chaining
 * const progress = new Curve(curve).setDuration(800).getProgress(previous, current);
 */
class Curve {

    /**
     * @callback TypeHandlerCurve Transforms a value according to a curve.
     * @param {number} $x The value to transform (in [0, 1] range).
     * @returns {number}
     * @protected
     *
     * @memberof Curve
     */

    /**
     * Stores the duration.
     * @type {number}
     * @private
     */
    $duration;

    /**
     * Stores the curve.
     * @type {TypeHandlerCurve}
     * @private
     */
    $easing;

    /**
     * Creates a new curve.
     * @param {TypeHandlerCurve} [$easing] The easing function to use.
     */
    constructor($easing = CURVES.linear(1)) {

        this.$easing = $easing;

        this.$duration = 1000;
    }

    /**
     * Gets values according to the given number of samples (in [0, 1] range).
     * @param {number} [$samples] The number of samples (must be greater than or equal to 2).
     * @returns {Array<number>}
     * @public
     */
    getValues($samples = 2) {

        const gaps = $samples - 1;
        const values = [];

        for (let $iterator = 0; $iterator < $samples; $iterator += 1) {

            const value = this.$easing(MATHEMATICS.clamp($iterator / gaps));

            values.push(value);
        }

        return values;
    }

    /**
     * Gets the progress between the two given time cursors.
     * @param {number} $previous The previous time cursor (in [0, 1] range).
     * @param {number} $current The current time cursor (in [0, 1] range).
     * @returns {number}
     * @public
     */
    getProgress($previous, $current) {

        if ($previous >= this.$duration) {

            return 0;
        }

        const previous = MATHEMATICS.clamp($previous / this.$duration);
        const current = MATHEMATICS.clamp($current / this.$duration);

        return this.$easing(current) - this.$easing(previous);
    }

    /**
     * Sets the duration.
     * @param {number} $duration The duration to set.
     * @returns {this}
     * @public
     */
    setDuration($duration) {

        this.$duration = $duration;

        return this;
    }
}

export {

    Curve
};

export default Curve;
