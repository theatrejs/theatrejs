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

        'uniform sampler2D uniformTextureColor;' +
        'uniform sampler2D uniformTextureOpacity;' +
        'uniform vec2 uniformTranslationPointOfView;' +

        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'vec4 colorTextureColor = texture2D(uniformTextureColor, varyingUvmapping);' +
            'vec4 colorTextureOpacity = texture2D(uniformTextureOpacity, varyingUvmapping);' +

            'float alpha = colorTextureColor.a * colorTextureOpacity.r;' +

            'gl_FragColor = vec4(colorTextureColor.rgb, alpha);' +
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
     * @type {Object.<string, typetypeuniform>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = {

        'uniformAspect': 'vec2',
        'uniformSize': 'vec2',
        'uniformTextureColor': 'sampler2D',
        'uniformTextureOpacity': 'sampler2D',
        'uniformTranslation': 'vec2',
        'uniformTranslationPointOfView': 'vec2'
    };
}

export {

    Shader
};

export default Shader;
