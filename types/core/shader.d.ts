export default Shader;
/**
 * Static default shader sources.
 *
 * @example
 *
 * const sourceFragment = Shader.sourceFragment;
 * const sourceVertex = Shader.sourceVertex;
 */
export class Shader {
    /**
     * @typedef {('vec2' | 'vec3')} typetypeattribute A type of attribute.
     */
    /**
     * @typedef {('bool' | 'bool[]' | 'float' | 'float[]' | 'int' | 'int[]' | 'mat4' | 'mat4[]' | 'sampler2D' | 'vec2' | 'vec2[]' | 'vec3' | 'vec3[]')} typetypeuniform A type of uniform.
     */
    /**
     * Stores the attributes needed by the shader program.
     * @type {Object.<string, typetypeattribute>}
     * @public
     * @readonly
     * @static
     */
    public static readonly attributes: {
        [x: string]: "vec2" | "vec3";
    };
    /**
     * Stores the fragment shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    public static readonly sourceFragment: string;
    /**
     * Stores the vertex shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    public static readonly sourceVertex: string;
    /**
     * Stores the uniforms needed by the shader program.
     * @type {Object.<string, typetypeuniform>}
     * @public
     * @readonly
     * @static
     */
    public static readonly uniforms: {
        [x: string]: "float" | "vec2" | "vec3" | "bool" | "bool[]" | "float[]" | "int" | "int[]" | "mat4" | "mat4[]" | "sampler2D" | "vec2[]" | "vec3[]";
    };
}
