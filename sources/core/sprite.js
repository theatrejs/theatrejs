import {AABB, Vector2} from '../index.js';

/**
 * Creates Theatre.js sprites.
 *
 * @example
 *
 * // minimal
 * const sprite = new Sprite({
 *
 *     $sizeTarget: new Vector2(32, 32),
 *     $textureColor: textureColor
 * });
 *
 * @example
 *
 * // full
 * const sprite = new Sprite({
 *
 *     $frameSource: new AABB(new Vector2(0, 0), new Vector2(1, 1)),
 *     $sizeTarget: new Vector2(32, 32),
 *     $textureColor: textureColor,
 *     $textureEmission: textureEmission,
 *     $textureMetallic: textureMetallic,
 *     $textureNormal: textureNormal,
 *     $textureOpacity: textureOpacity
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
     * Stores the serialized value of frame to use from the texture sources (with values in [0, 1] ranges).
     * @type {string}
     * @private
     */
    $frameSourceSerialized;

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
     * Stores the metallic texture source.
     * @type {string}
     * @private
     */
    $textureMetallic;

    /**
     * Stores the normal texture source.
     * @type {string}
     * @private
     */
    $textureNormal;

    /**
     * Stores the opacity texture source.
     * @type {string}
     * @private
     */
    $textureOpacity;

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
     * Gets the serialized value of the frame to use from the texture sources.
     * @type {string}
     * @public
     * @readonly
     */
    get frameSourceSerialized() {

        return this.$frameSourceSerialized;
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
     * Gets the metallic texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureMetallic() {

        return this.$textureMetallic;
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
     * Gets the opacity texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureOpacity() {

        return this.$textureOpacity;
    }

    /**
     * Creates a new Theatre.js sprite.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} [$parameters.$frameSource] The frame to use from the texture sources (with values in [0, 1] ranges) (if not specified then the full texture is used).
     * @param {import('../index.js').Vector2} $parameters.$sizeTarget The target size.
     * @param {string} $parameters.$textureColor The color texture source.
     * @param {string} [$parameters.$textureEmission] The emission texture source.
     * @param {string} [$parameters.$textureMetallic] The metallic texture source.
     * @param {string} [$parameters.$textureNormal] The normal texture source.
     * @param {string} [$parameters.$textureOpacity] The opacity texture source.
     */
    constructor({$frameSource = new AABB(new Vector2(0, 0), new Vector2(1, 1)), $sizeTarget, $textureColor, $textureEmission, $textureMetallic, $textureNormal, $textureOpacity}) {

        this.$frameSource = $frameSource;
        this.$sizeTarget = $sizeTarget;
        this.$textureColor = $textureColor;
        this.$textureEmission = $textureEmission;
        this.$textureMetallic = $textureMetallic;
        this.$textureNormal = $textureNormal;
        this.$textureOpacity = $textureOpacity;

        this.$frameSourceSerialized = JSON.stringify([

            [$frameSource.minimum.x, $frameSource.minimum.y],
            [$frameSource.maximum.x, $frameSource.maximum.y]
        ]);
    }
}

export {

    Sprite
};

export default Sprite;
