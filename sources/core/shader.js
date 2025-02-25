/**
 * Static default shader sources.
 *
 * @example
 *
 * const sourceFragment = Shader.sourceFragment;
 * const sourceVertex = Shader.sourceVertex;
 */
class Shader {

    /**
     * @typedef {('vec2' | 'vec3')} TypeTypeAttribute A type of attribute.
     * @protected
     *
     * @memberof Shader
     */

    /**
     * @typedef {('bool' | 'bool[]' | 'float' | 'float[]' | 'int' | 'int[]' | 'mat4' | 'mat4[]' | 'sampler2D' | 'vec2' | 'vec2[]' | 'vec3' | 'vec3[]')} TypeTypeUniform A type of uniform.
     * @protected
     *
     * @memberof Shader
     */

    /**
     * Stores the attributes needed by the shader program.
     * @type {Object<string, TypeTypeAttribute>}
     * @public
     * @readonly
     * @static
     */
    static attributes = {

        'attributePosition': 'vec2',
        'attributeUvmapping': 'vec2'
    };

    /**
     * Stores the fragment shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    static sourceFragment = (

        'precision highp float;' +

        'uniform sampler2D uniformTexture;' +

        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'gl_FragColor = texture2D(uniformTexture, varyingUvmapping);' +
        '}'
    );

    /**
     * Stores the vertex shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    static sourceVertex = (

        'attribute vec2 attributePosition;' +
        'attribute vec2 attributeUvmapping;' +

        'uniform vec2 uniformAspect;' +
        'uniform vec2 uniformSize;' +
        'uniform vec2 uniformTranslation;' +
        'uniform vec2 uniformTranslationPointOfView;' +

        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'varyingUvmapping = attributeUvmapping;' +

            'vec2 position = (attributePosition * uniformSize + uniformTranslation);' +
            'vec2 projection = 2.0 * (position - uniformTranslationPointOfView) / uniformAspect;' +

            'gl_Position = vec4(projection, 0.0, 1.0);' +
        '}'
    );

    /**
     * Stores the uniforms needed by the shader program.
     * @type {Object<string, TypeTypeUniform>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = {

        'uniformAspect': 'vec2',
        'uniformSize': 'vec2',
        'uniformTexture': 'sampler2D',
        'uniformTranslation': 'vec2',
        'uniformTranslationPointOfView': 'vec2'
    };
}

export {

    Shader
};

export default Shader;
