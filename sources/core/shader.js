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
     * Stores the 'attributePosition' attribute name.
     * @type {'attributePosition'}
     * @public
     * @readonly
     * @static
     */
    static ATTRIBUTE_POSITION = 'attributePosition';

    /**
     * Stores the 'attributeUvmapping' attribute name.
     * @type {'attributeUvmapping'}
     * @public
     * @readonly
     * @static
     */
    static ATTRIBUTE_UVMAPPING = 'attributeUvmapping';

    /**
     * Stores the attributes needed by the shader program.
     * @type {Object<string, TypeTypeAttribute>}
     * @public
     * @readonly
     * @static
     */
    static attributes = {

        [Shader.ATTRIBUTE_POSITION]: SHADER_PARAMETER_TYPES.VECTOR_2,
        [Shader.ATTRIBUTE_UVMAPPING]: SHADER_PARAMETER_TYPES.VECTOR_2
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
     * Stores the 'uniformAspect' uniform name.
     * @type {'uniformAspect'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_ASPECT = 'uniformAspect';

    /**
     * Stores the 'uniformSize' uniform name.
     * @type {'uniformSize'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_SIZE = 'uniformSize';

    /**
     * Stores the 'uniformTexture' uniform name.
     * @type {'uniformTexture'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TEXTURE = 'uniformTexture';

    /**
     * Stores the 'uniformTranslation' uniform name.
     * @type {'uniformTranslation'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TRANSLATION = 'uniformTranslation';

    /**
     * Stores the 'uniformTranslationPointOfView' uniform name.
     * @type {'uniformTranslationPointOfView'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TRANSLATION_POINT_OF_VIEW = 'uniformTranslationPointOfView';

    /**
     * Stores the uniforms needed by the shader program.
     * @type {Object<string, TypeTypeUniform>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = {

        [Shader.UNIFORM_ASPECT]: SHADER_PARAMETER_TYPES.VECTOR_2,
        [Shader.UNIFORM_SIZE]: SHADER_PARAMETER_TYPES.VECTOR_2,
        [Shader.UNIFORM_TEXTURE]: SHADER_PARAMETER_TYPES.SAMPLER_2D,
        [Shader.UNIFORM_TRANSLATION]: SHADER_PARAMETER_TYPES.VECTOR_2,
        [Shader.UNIFORM_TRANSLATION_POINT_OF_VIEW]: SHADER_PARAMETER_TYPES.VECTOR_2
    };
}

export {

    Shader
};

export default Shader;
