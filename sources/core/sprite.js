/**
 * Creates Theatre.js sprites.
 *
 * @example
 *
 * const sprite = new Sprite({
 *
 *     $sizeTarget: new Vector2(32, 32),
 *     $textureColor: textureColor
 * });
 */
class Sprite {

    /**
     * Stores the frame to use from the texture sources (with values in [0, 1] ranges).
     * @type {import('../index.js').AABB}
     * @private
     */
    $frameSource;

    /**
     * Stores the target size.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $sizeTarget;

    /**
     * Stores the color texture source.
     * @type {string}
     * @private
     */
    $textureColor;

    /**
     * Stores the emission texture source.
     * @type {string}
     * @private
     */
    $textureEmission;

    /**
     * Stores the normal texture source.
     * @type {string}
     * @private
     */
    $textureNormal;

    /**
     * Gets the frame to use from the texture sources.
     * @type {import('../index.js').AABB}
     * @public
     * @readonly
     */
    get frameSource() {

        return this.$frameSource;
    }

    /**
     * Gets the target size.
     * @type {import('../index.js').Vector2}
     * @public
     * @readonly
     */
    get sizeTarget() {

        return this.$sizeTarget;
    }

    /**
     * Gets the color texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureColor() {

        return this.$textureColor;
    }

    /**
     * Gets the emission texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureEmission() {

        return this.$textureEmission;
    }

    /**
     * Gets the normal texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureNormal() {

        return this.$textureNormal;
    }

    /**
     * Creates a new Theatre.js sprite.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} [$parameters.$frameSource] The frame to use from the texture sources (with values in [0, 1] ranges) (if not specified then the full texture is used).
     * @param {import('../index.js').Vector2} $parameters.$sizeTarget The target size.
     * @param {string} $parameters.$textureColor The color texture source.
     * @param {string} [$parameters.$textureEmission] The emission texture source.
     * @param {string} [$parameters.$textureNormal] The normal texture source.
     */
    constructor({$frameSource, $sizeTarget, $textureColor, $textureEmission, $textureNormal}) {

        this.$frameSource = $frameSource;
        this.$sizeTarget = $sizeTarget;
        this.$textureColor = $textureColor;
        this.$textureEmission = $textureEmission;
        this.$textureNormal = $textureNormal;
    }
}

export {

    Sprite
};

export default Sprite;
