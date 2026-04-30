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
     * Stores the 'attributeUvmappingSprite' attribute name.
     * @type {'attributeUvmappingSprite'}
     * @public
     * @readonly
     * @static
     */
    static ATTRIBUTE_UVMAPPING_SPRITE = 'attributeUvmappingSprite';

    /**
     * Stores the 'attributeVertices' attribute name.
     * @type {'attributeVertices'}
     * @public
     * @readonly
     * @static
     */
    static ATTRIBUTE_VERTICES = 'attributeVertices';

    /**
     * Stores the attributes needed by the shader program.
     * @type {Map<string, TypeTypeAttribute>}
     * @public
     * @readonly
     * @static
     */
    static attributes = new Map([

        [Shader.ATTRIBUTE_UVMAPPING_SPRITE, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.ATTRIBUTE_VERTICES, SHADER_PARAMETER_TYPES.VECTOR_2]
    ]);

    /**
     * Stores the fragment shader source.
     * @type {string}
     * @public
     * @readonly
     * @static
     */
    static sourceFragment = (

        'precision highp float;' +

        'uniform sampler2D uniformTextureMask;' +
        'uniform sampler2D uniformTextureSprite;' +

        'varying vec2 varyingUvmappingMask;' +
        'varying vec2 varyingUvmappingSprite;' +

        'void main() {' +

            'vec4 sprite = texture2D(uniformTextureSprite, varyingUvmappingSprite);' +
            'vec3 mask = texture2D(uniformTextureMask, varyingUvmappingMask).rgb;' +

            'float strength = (mask.r + mask.g + mask.b) / 3.0;' +
            'float opacity = 1.0 - strength;' +

            'float masking = step(0.0, varyingUvmappingMask.x) * step(varyingUvmappingMask.x, 1.0) * step(0.0, varyingUvmappingMask.y) * step(varyingUvmappingMask.y, 1.0);' +

            'gl_FragColor = vec4(sprite.rgb, sprite.a * mix(1.0, opacity, masking));' +
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

        'attribute vec2 attributeUvmappingSprite;' +
        'attribute vec2 attributeVertices;' +

        'uniform vec2 uniformAspect;' +
        'uniform vec2 uniformSizeMask;' +
        'uniform vec2 uniformSizeSprite;' +
        'uniform vec2 uniformTranslationMask;' +
        'uniform vec2 uniformTranslationPointOfView;' +
        'uniform vec2 uniformTranslationSprite;' +

        'varying vec2 varyingUvmappingMask;' +
        'varying vec2 varyingUvmappingSprite;' +

        'void main() {' +

            'vec2 position = attributeVertices * uniformSizeSprite + uniformTranslationSprite;' +
            'vec2 projection = 2.0 * (position - uniformTranslationPointOfView) / uniformAspect;' +

            'varyingUvmappingMask = ((position - uniformTranslationMask) / uniformSizeMask) * vec2(1.0, -1.0) + vec2(0.5);' +
            'varyingUvmappingSprite = attributeUvmappingSprite;' +

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
     * Stores the 'uniformSizeMask' uniform name.
     * @type {'uniformSizeMask'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_SIZE_MASK = 'uniformSizeMask';

    /**
     * Stores the 'uniformSizeSprite' uniform name.
     * @type {'uniformSizeSprite'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_SIZE_SPRITE = 'uniformSizeSprite';

    /**
     * Stores the 'uniformTextureMask' uniform name.
     * @type {'uniformTextureMask'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TEXTURE_MASK = 'uniformTextureMask';

    /**
     * Stores the 'uniformTextureSprite' uniform name.
     * @type {'uniformTextureSprite'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TEXTURE_SPRITE = 'uniformTextureSprite';

    /**
     * Stores the 'uniformTranslationMask' uniform name.
     * @type {'uniformTranslationMask'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TRANSLATION_MASK = 'uniformTranslationMask';

    /**
     * Stores the 'uniformTranslationPointOfView' uniform name.
     * @type {'uniformTranslationPointOfView'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TRANSLATION_POINT_OF_VIEW = 'uniformTranslationPointOfView';

    /**
     * Stores the 'uniformTranslationSprite' uniform name.
     * @type {'uniformTranslationSprite'}
     * @public
     * @readonly
     * @static
     */
    static UNIFORM_TRANSLATION_SPRITE = 'uniformTranslationSprite';

    /**
     * Stores the uniforms needed by the shader program.
     * @type {Map<string, TypeTypeUniform>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = new Map([

        [Shader.UNIFORM_ASPECT, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.UNIFORM_SIZE_MASK, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.UNIFORM_SIZE_SPRITE, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.UNIFORM_TEXTURE_MASK, SHADER_PARAMETER_TYPES.SAMPLER_2D],
        [Shader.UNIFORM_TEXTURE_SPRITE, SHADER_PARAMETER_TYPES.SAMPLER_2D],
        [Shader.UNIFORM_TRANSLATION_MASK, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.UNIFORM_TRANSLATION_SPRITE, SHADER_PARAMETER_TYPES.VECTOR_2],
        [Shader.UNIFORM_TRANSLATION_POINT_OF_VIEW, SHADER_PARAMETER_TYPES.VECTOR_2]
    ]);
}

export {

    Shader
};

export default Shader;
