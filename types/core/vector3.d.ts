export default Vector3;
/**
 * Creates three-dimensional vectors.
 *
 * @example
 *
 * // without chaining
 * const vector = new Vector3(3, 2, 1);
 * vector.add(new Vector3(1, 0, -1));
 *
 * @example
 *
 * // with chaining
 * const vector = new Vector3(3, 2, 1).add(new Vector3(1, 0, -1));
 */
export class Vector3 {
    /**
     * Creates a new vector from the given vector.
     * @param {import('../index.js').Vector3} $vector The given vector.
     * @returns {import('../index.js').Vector3}
     * @public
     * @static
     */
    public static from($vector: import("../index.js").Vector3): import("../index.js").Vector3;
    /**
     * Creates a new three-dimensional vector.
     * @param {number} $x The x component of the vector to create.
     * @param {number} $y The y component of the vector to create.
     * @param {number} $z The z component of the vector to create.
     */
    constructor($x: number, $y: number, $z: number);
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
     * Stores the z component.
     * @type {number}
     * @private
     */
    private $z;
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
     * Gets the z component.
     * @type {number}
     * @public
     */
    public get z(): number;
    /**
     * Adds the given vector.
     * @param {import('../index.js').Vector3} $vector The vector to add.
     * @returns {this}
     * @public
     */
    public add($vector: import("../index.js").Vector3): this;
    /**
     * Clones the vector.
     * @returns {import('../index.js').Vector3}
     * @public
     */
    public clone(): import("../index.js").Vector3;
    /**
     * Checks the equality with the given vector.
     * @param {import('../index.js').Vector3} $vector The vector to check with.
     * @returns {boolean}
     * @public
     */
    public equal($vector: import("../index.js").Vector3): boolean;
    /**
     * Gets the length of the vector.
     * @returns {number}
     * @public
     */
    public length(): number;
    /**
     * Multiplies with the given vector.
     * @param {import('../index.js').Vector3} $vector The vector to multiply with.
     * @returns {this}
     * @public
     */
    public multiply($vector: import("../index.js").Vector3): this;
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
     * Rotates the vector.
     * @param {import('../index.js').Quaternion} $quaternion The rotation to apply.
     * @returns {this}
     * @public
     */
    public rotate($quaternion: import("../index.js").Quaternion): this;
    /**
     * Scales the vector by the given scalar factor.
     * @param {number} $factor The scalar factor to multiply with.
     * @returns {this}
     * @public
     */
    public scale($factor: number): this;
    /**
     * Subtracts the given vector.
     * @param {import('../index.js').Vector3} $vector The vector to subtract.
     * @returns {this}
     * @public
     */
    public subtract($vector: import("../index.js").Vector3): this;
}
