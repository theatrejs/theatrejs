export default Quaternion;
/**
 * Creates quaternions.
 *
 * @example
 *
 * const quaternion = new Quaternion(0, 0, 0, 1);
 */
export class Quaternion {
    /**
     * Creates a new quaternion.
     * @param {number} $x The x component of the quaternion to create.
     * @param {number} $y The y component of the quaternion to create.
     * @param {number} $z The z component of the quaternion to create.
     * @param {number} $w The w component of the quaternion to create.
     */
    constructor($x: number, $y: number, $z: number, $w: number);
    /**
     * Stores the w component.
     * @type {number}
     * @private
     */
    private $w;
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
     * Gets the w component.
     * @type {number}
     * @public
     */
    public get w(): number;
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
}
