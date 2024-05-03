/**
 * Static Theatre.js default shader sources.
 *
 * @example
 *
 * const sourceFragment = Shader.sourceFragment;
 * const sourceVertex = Shader.sourceVertex;
 */
class Shader {

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
    static attributes = {};

    /**
     * Stores the fragment shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    static sourceFragment = (

        'void main(void) {}'
    );

    /**
     * Stores the vertex shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    static sourceVertex = (

        'void main(void) {}'
    );

    /**
     * Stores the uniforms needed by the shader program.
     * @type {Object.<string, typetypeuniform>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = {};
}

export {

    Shader
};

export default Shader;
