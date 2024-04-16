import {Shader} from '../index.js';

/**
 * Static Theatre.js scene shader sources.
 *
 * @example
 *
 * const sourceFragment = ShaderStage.sourceFragment;
 * const sourceVertex = ShaderStage.sourceVertex;
 */
class ShaderStage extends Shader {

    /**
     * Stores the attributes needed by the shader program.
     * @type {Object.<string, string>}
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

        'const int MAXIMUMLIGHTS = 32;' +

        'uniform vec3 uniformColorsLight[MAXIMUMLIGHTS];' +
        'uniform float uniformIntensitiesLight[MAXIMUMLIGHTS];' +
        'uniform int uniformLights;' +
        'uniform vec3 uniformPositionsLight[MAXIMUMLIGHTS];' +
        'uniform sampler2D uniformTextureColor;' +
        'uniform sampler2D uniformTextureEmission;' +
        'uniform sampler2D uniformTextureMetallic;' +
        'uniform sampler2D uniformTextureNormal;' +
        'uniform sampler2D uniformTextureOpacity;' +
        'uniform vec2 uniformTranslationPointOfView;' +

        'varying vec2 varyingPosition;' +
        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'vec4 colorTextureColor = texture2D(uniformTextureColor, varyingUvmapping);' +
            'vec4 colorTextureEmission = texture2D(uniformTextureEmission, varyingUvmapping);' +
            'vec4 colorTextureMetallic = texture2D(uniformTextureMetallic, varyingUvmapping);' +
            'vec4 colorTextureNormal = texture2D(uniformTextureNormal, varyingUvmapping);' +
            'vec4 colorTextureOpacity = texture2D(uniformTextureOpacity, varyingUvmapping);' +

            'vec4 colorDiffuse = vec4(0.0);' +

            'for (int index = 0; index < MAXIMUMLIGHTS; index += 1) {' +

                'if (index >= uniformLights) {' +

                    'break;' +
                '}' +

                'vec3 positionLight = uniformPositionsLight[index] - vec3(varyingPosition, 0.0);' +
                'vec3 normalLight = vec3(colorTextureNormal) * 2.0 - 1.0;' +

                'float distanceLight = length(positionLight);' +
                'float heightLight = length(positionLight.z);' +

                'float intensityLightCurrent = uniformIntensitiesLight[index];' +
                'float intensityLightDiffuse = max(dot(normalLight, normalize(positionLight)), 0.0);' +
                'float attenuation = heightLight / distanceLight;' +
                // 'float attenuation = 1.0;' +
                'float illumination = min(attenuation * intensityLightCurrent, 1.0);' +

                'vec4 colorLightCurrent = vec4(uniformColorsLight[index], 1.0);' +
                'vec4 colorDiffuseCurrent = colorLightCurrent * intensityLightCurrent * intensityLightDiffuse * illumination;' +

                'colorDiffuse = max(colorDiffuseCurrent, colorDiffuse);' +
            '}' +

            'vec4 material = max(colorTextureColor, mix(colorTextureColor, colorDiffuse, colorTextureMetallic.r));' +
            'vec4 light = max(colorTextureEmission, colorDiffuse);' +

            'float alpha = mix(colorTextureColor.a, min(colorDiffuse.a, 1.0), colorTextureMetallic.r);' +
            'float alphaLimited = clamp(alpha, colorTextureColor.a, 1.0);' +

            'gl_FragColor = vec4((material * light).rgb, alphaLimited * colorTextureOpacity.r);' +
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

        'varying vec2 varyingPosition;' +
        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'varyingUvmapping = attributeUvmapping;' +
            'varyingPosition = (attributePosition * uniformSize + uniformTranslation);' +

            'gl_Position = vec4((varyingPosition - uniformTranslationPointOfView) / uniformAspect, 0.0, 1.0);' +
        '}'
    );

    /**
     * Stores the uniforms needed by the shader program.
     * @type {Object.<string, string>}
     * @public
     * @readonly
     * @static
     */
    static uniforms = {

        'uniformAspect': 'vec2',
        'uniformColorsLight': 'vec3[]',
        'uniformIntensitiesLight': 'float[]',
        'uniformLights': 'int',
        'uniformPositionsLight': 'vec3[]',
        'uniformSize': 'vec2',
        'uniformTextureColor': 'sampler2D',
        'uniformTextureEmission': 'sampler2D',
        'uniformTextureMetallic': 'sampler2D',
        'uniformTextureNormal': 'sampler2D',
        'uniformTextureOpacity': 'sampler2D',
        'uniformTranslation': 'vec2',
        'uniformTranslationPointOfView': 'vec2'
    };
}

export {

    ShaderStage
};

export default ShaderStage;
