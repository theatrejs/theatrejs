// 'ESLint' configuration
/* eslint-disable @stylistic/indent-binary-ops */
/* eslint-disable @stylistic/operator-linebreak */

import {SHADER_PARAMETER_TYPES} from '../index.js';

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
     * @typedef {(SHADER_PARAMETER_TYPES.VECTOR_2 | SHADER_PARAMETER_TYPES.VECTOR_3)} TypeTypeAttribute A type of attribute.
     * @protected
     *
     * @memberof Shader
     */

    /**
     * @typedef {(SHADER_PARAMETER_TYPES.BOOLEAN | SHADER_PARAMETER_TYPES.ARRAY_BOOLEAN | SHADER_PARAMETER_TYPES.FLOAT | SHADER_PARAMETER_TYPES.ARRAY_FLOAT | SHADER_PARAMETER_TYPES.INTEGER | SHADER_PARAMETER_TYPES.ARRAY_INTEGER | SHADER_PARAMETER_TYPES.MATRIX_4 | SHADER_PARAMETER_TYPES.ARRAY_MATRIX_4 | SHADER_PARAMETER_TYPES.SAMPLER_2D | SHADER_PARAMETER_TYPES.VECTOR_2 | SHADER_PARAMETER_TYPES.ARRAY_VECTOR_2 | SHADER_PARAMETER_TYPES.VECTOR_3 | SHADER_PARAMETER_TYPES.ARRAY_VECTOR_3)} TypeTypeUniform A type of uniform.
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

        'attributePosition': SHADER_PARAMETER_TYPES.VECTOR_2,
        'attributeUvmapping': SHADER_PARAMETER_TYPES.VECTOR_2
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

        'uniformAspect': SHADER_PARAMETER_TYPES.VECTOR_2,
        'uniformSize': SHADER_PARAMETER_TYPES.VECTOR_2,
        'uniformTexture': SHADER_PARAMETER_TYPES.SAMPLER_2D,
        'uniformTranslation': SHADER_PARAMETER_TYPES.VECTOR_2,
        'uniformTranslationPointOfView': SHADER_PARAMETER_TYPES.VECTOR_2
    };
}

export {

    Shader
};

export default Shader;
