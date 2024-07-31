export default Sprite;
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
export class Sprite {
    /**
     * Creates a new sprite.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').AABB} [$parameters.$frameSource] The frame to use from the texture sources (with values in [0, 1] ranges) (if not specified then the full texture is used).
     * @param {import('../index.js').Vector2} $parameters.$sizeTarget The target size.
     * @param {string} $parameters.$textureColor The color texture source.
     * @param {string} [$parameters.$textureOpacity] The opacity texture source.
     */
    constructor({ $frameSource, $sizeTarget, $textureColor, $textureOpacity }: {
        $frameSource?: import("../index.js").AABB;
        $sizeTarget: import("../index.js").Vector2;
        $textureColor: string;
        $textureOpacity?: string;
    });
    /**
     * Stores the frame to use from the texture sources (with values in [0, 1] ranges).
     * @type {import('../index.js').AABB}
     * @private
     */
    private $frameSource;
    /**
     * Stores the serialized value of frame to use from the texture sources (with values in [0, 1] ranges).
     * @type {string}
     * @private
     */
    private $frameSourceSerialized;
    /**
     * Stores the target size.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $sizeTarget;
    /**
     * Stores the color texture source.
     * @type {string}
     * @private
     */
    private $textureColor;
    /**
     * Stores the opacity texture source.
     * @type {string}
     * @private
     */
    private $textureOpacity;
    /**
     * Gets the frame to use from the texture sources.
     * @type {import('../index.js').AABB}
     * @public
     */
    public get frameSource(): AABB;
    /**
     * Gets the serialized value of the frame to use from the texture sources.
     * @type {string}
     * @public
     */
    public get frameSourceSerialized(): string;
    /**
     * Gets the target size.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get sizeTarget(): Vector2;
    /**
     * Gets the color texture source.
     * @type {string}
     * @public
     */
    public get textureColor(): string;
    /**
     * Gets the opacity texture source.
     * @type {string}
     * @public
     */
    public get textureOpacity(): string;
}
import { AABB } from '../index.js';
import { Vector2 } from '../index.js';
