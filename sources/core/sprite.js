/**
 * Creates Theatre.js sprites.
 *
 * @example
 *
 * const sprite = new Sprite({
 *
 *     $sizeTarget: new Vector2(32, 32),
 *     $texture: texture
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
     * Stores the texture source.
     * @type {string}
     * @private
     */
    $texture;

    /**
     * Stores the normals texture source.
     * @type {string}
     * @private
     */
    $textureNormals;

    /**
     * Gets the frame to use from the texture source.
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
     * Gets the texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get texture() {

        return this.$texture;
    }

    /**
     * Gets the normals texture source.
     * @type {string}
     * @public
     * @readonly
     */
    get textureNormals() {

        return this.$textureNormals;
    }

    /**
     * Creates a new Theatre.js sprite.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} [$parameters.$frameSource] The frame to use from the texture source (if not specified then the full texture is used).
     * @param {import('../index.js').Vector2} $parameters.$sizeTarget The target size.
     * @param {string} $parameters.$texture The texture source.
     * @param {string} [$parameters.$textureNormals] The normals texture source.
     */
    constructor({$frameSource, $sizeTarget, $texture, $textureNormals}) {

        this.$frameSource = $frameSource;
        this.$sizeTarget = $sizeTarget;
        this.$texture = $texture;
        this.$textureNormals = $textureNormals;
    }
}

export {

    Sprite
};

export default Sprite;
