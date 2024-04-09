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
     * Stores the attributes needed by the shader program.
     * @type {Object.<string, string>}
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
     * @type {Object.<string, string>}
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
