export default Vector2;
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
export class Vector2 {
    /**
     * Creates a new vector from the given vector.
     * @param {import('../index.js').Vector2} $vector The given vector.
     * @returns {import('../index.js').Vector2}
     * @public
     * @static
     */
    public static from($vector: import("../index.js").Vector2): import("../index.js").Vector2;
    /**
     * Creates a new two-dimensional vector.
     * @param {number} $x The x component of the vector to create.
     * @param {number} $y The y component of the vector to create.
     */
    constructor($x: number, $y: number);
    /**
     * Stores the x component.
     * @type {number}
     * @private
     */
    private $x;
    /**
     * Stores the y component.
     * @type {number}
     * @private
     */
    private $y;
    /**
     * Gets the x component.
     * @type {number}
     * @public
     */
    public get x(): number;
    /**
     * Gets the y component.
     * @type {number}
     * @public
     */
    public get y(): number;
    /**
     * Adds the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to add.
     * @returns {this}
     * @public
     */
    public add($vector: import("../index.js").Vector2): this;
    /**
     * Clones the vector.
     * @returns {import('../index.js').Vector2}
     * @public
     */
    public clone(): import("../index.js").Vector2;
    /**
     * Checks the equality with the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to check with.
     * @returns {boolean}
     * @public
     */
    public equal($vector: import("../index.js").Vector2): boolean;
    /**
     * Gets the length of the vector.
     * @returns {number}
     * @public
     */
    public length(): number;
    /**
     * Multiplies with the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to multiply with.
     * @returns {this}
     * @public
     */
    public multiply($vector: import("../index.js").Vector2): this;
    /**
     * Negates the vector.
     * @returns {this}
     * @public
     */
    public negate(): this;
    /**
     * Normalizes the vector.
     * @returns {this}
     * @public
     */
    public normalize(): this;
    /**
     * Rotates the vector by the given angle.
     * @param {number} $angle The angle of rotation to apply (in degrees) (clockwise).
     * @returns {this}
     * @public
     */
    public rotate($angle: number): this;
    /**
     * Scales the vector by the given scalar factor.
     * @param {number} $factor The scalar factor to multiply with.
     * @returns {this}
     * @public
     */
    public scale($factor: number): this;
    /**
     * Subtracts the given vector.
     * @param {import('../index.js').Vector2} $vector The vector to subtract.
     * @returns {this}
     * @public
     */
    public subtract($vector: import("../index.js").Vector2): this;
}
