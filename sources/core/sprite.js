import {AABB, Vector2} from '../index.js';

/**
 * Creates sprites.
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
 *     $textureOpacity: textureOpacity
 * });
 */
class Sprite {

    /**
     * Stores the frame to use from the texture sources (with values in [0, 1] ranges).
     * @type {AABB}
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
     * @type {Vector2}
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
     * Stores the opacity texture source.
     * @type {string}
     * @private
     */
    $textureOpacity;

    /**
     * Gets the frame to use from the texture sources.
     * @type {AABB}
     * @public
     */
    get frameSource() {

        return this.$frameSource;
    }

    /**
     * Gets the serialized value of the frame to use from the texture sources.
     * @type {string}
     * @public
     */
    get frameSourceSerialized() {

        return this.$frameSourceSerialized;
    }

    /**
     * Gets the target size.
     * @type {Vector2}
     * @public
     */
    get sizeTarget() {

        return this.$sizeTarget;
    }

    /**
     * Gets the color texture source.
     * @type {string}
     * @public
     */
    get textureColor() {

        return this.$textureColor;
    }

    /**
     * Gets the opacity texture source.
     * @type {string}
     * @public
     */
    get textureOpacity() {

        return this.$textureOpacity;
    }

    /**
     * Creates a new sprite.
     * @param {Object} $parameters The given parameters.
     * @param {AABB} [$parameters.$frameSource] The frame to use from the texture sources (with values in [0, 1] ranges) (if not specified then the full texture is used).
     * @param {Vector2} $parameters.$sizeTarget The target size.
     * @param {string} $parameters.$textureColor The color texture source.
     * @param {string} [$parameters.$textureOpacity] The opacity texture source.
     */
    constructor({$frameSource = new AABB(new Vector2(0, 0), new Vector2(1, 1)), $sizeTarget, $textureColor, $textureOpacity}) {

        this.$frameSource = $frameSource;
        this.$sizeTarget = $sizeTarget;
        this.$textureColor = $textureColor;
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
