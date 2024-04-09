import {Vector3} from '../index.js';

/**
 * Creates Theatre.js lights.
 *
 * @example
 *
 * // minimal
 * const light = new Light();
 *
 * @example
 *
 * // full
 * const light = new Light({$color, $intensity});
 */
class Light {

    /**
     * Stores the color.
     * @type {import('../index.js').Vector3}
     * @private
     */
    $color;

    /**
     * Stores the intensity.
     * @type {number}
     * @private
     */
    $intensity;

    /**
     * Stores the position.
     * @type {import('../index.js').Vector3}
     * @private
     */
    $translation;

    /**
     * Gets the color.
     * @type {import('../index.js').Vector3}
     * @public
     * @readonly
     */
    get color() {

        return this.$color;
    }

    /**
     * Gets the intensity.
     * @type {number}
     * @public
     * @readonly
     */
    get intensity() {

        return this.$intensity;
    }

    /**
     * Gets the position.
     * @type {import('../index.js').Vector3}
     * @public
     * @readonly
     */
    get translation() {

        return this.$translation;
    }

    /**
     * Creates a new Theatre.js light.
     * @param {Object} [$parameters] The given parameters.
     * @param {import('../index.js').Vector3} [$parameters.$color] The color of the light.
     * @param {number} [$parameters.$intensity] The intensity of the light.
     */
    constructor({$color = new Vector3(1, 1, 1), $intensity = 1} = {}) {

        this.$color = $color;
        this.$intensity = $intensity;

        this.$translation = new Vector3(0, 0, 0);
    }

    /**
     * Sets the color.
     * @param {import('../index.js').Vector3} $color The color to set.
     * @returns {this}
     * @public
     */
    setColor($color) {

        this.$color = $color;

        return this;
    }

    /**
     * Sets the intensity.
     * @param {number} $intensity The intensity to set.
     * @returns {this}
     * @public
     */
    setIntensity($intensity) {

        this.$intensity = $intensity;

        return this;
    }

    /**
     * Translates the light in the world space from a third person point of view.
     * @param {import('../index.js').Vector3} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        this.$translation = this.$translation.add($vector);

        return this;
    }

    /**
     * Translates the light in the world space to the given position.
     * @param {import('../index.js').Vector3} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    translateTo($vector) {

        this.$translation = $vector;

        return this;
    }
}

export {

    Light
};

export default Light;
