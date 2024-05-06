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
     * Stores the maximum number of lights this shader can accept.
     * @type {number}
     * @public
     * @readonly
     * @static
     */
    static MAXIMUMLIGHTS = 32;

    /**
     * @type {typeof import('../index.js').Shader['attributes']}
     */
    static attributes = {

        'attributePosition': 'vec2',
        'attributeUvmapping': 'vec2'
    };

    /**
     * @type {typeof import('../index.js').Shader['sourceFragment']}
     */
    static sourceFragment = (

        'precision highp float;' +

        'const int MAXIMUMLIGHTS = ' + ShaderStage.MAXIMUMLIGHTS + ';' +

        'uniform vec3 uniformColorsLight[MAXIMUMLIGHTS];' +
        'uniform float uniformIntensitiesLight[MAXIMUMLIGHTS];' +
        'uniform vec3 uniformPositionsLight[MAXIMUMLIGHTS];' +
        'uniform bool uniformReflectiveLight[MAXIMUMLIGHTS];' +
        'uniform sampler2D uniformTextureColor;' +
        'uniform sampler2D uniformTextureEmission;' +
        'uniform sampler2D uniformTextureMetallic;' +
        'uniform sampler2D uniformTextureNormal;' +
        'uniform sampler2D uniformTextureOpacity;' +
        'uniform sampler2D uniformTextureReception;' +
        'uniform vec2 uniformTranslationPointOfView;' +

        'varying vec2 varyingPosition;' +
        'varying vec2 varyingUvmapping;' +

        'void main(void) {' +

            'vec4 colorTextureColor = texture2D(uniformTextureColor, varyingUvmapping);' +
            'vec4 colorTextureEmission = texture2D(uniformTextureEmission, varyingUvmapping);' +
            'vec4 colorTextureMetallic = texture2D(uniformTextureMetallic, varyingUvmapping);' +
            'vec4 colorTextureNormal = texture2D(uniformTextureNormal, varyingUvmapping);' +
            'vec4 colorTextureOpacity = texture2D(uniformTextureOpacity, varyingUvmapping);' +
            'vec4 colorTextureReception = texture2D(uniformTextureReception, varyingUvmapping);' +

            'vec3 colorDiffuse = vec3(0.0, 0.0, 0.0);' +
            'vec3 colorDiffuseReflective = vec3(0.0, 0.0, 0.0);' +

            'for (int index = 0; index < MAXIMUMLIGHTS; index += 1) {' +

                'vec3 positionLight = uniformPositionsLight[index] - vec3(varyingPosition, 0.0);' +
                'vec3 normalLight = vec3(colorTextureNormal) * 2.0 - 1.0;' +

                'float distanceLight = length(positionLight);' +
                'float heightLight = length(positionLight.z);' +

                'float intensityLightCurrent = uniformIntensitiesLight[index];' +
                'float intensityLightDiffuse = max(dot(normalLight, normalize(positionLight)), 0.0);' +
                'float attenuation = heightLight / distanceLight;' +
                'float illumination = min(attenuation * intensityLightCurrent, 1.0);' +

                'vec3 colorLightCurrent = uniformColorsLight[index];' +
                'vec3 colorDiffuseCurrent = colorLightCurrent * intensityLightCurrent * intensityLightDiffuse * illumination;' +

                'colorDiffuse = max(colorDiffuseCurrent, colorDiffuse);' +

                'if (uniformReflectiveLight[index] == true) {' +

                    'colorDiffuseReflective = max(colorDiffuseCurrent, colorDiffuseReflective);' +
                '}' +
            '}' +

            'float metalness = colorTextureMetallic.r * colorTextureReception.r * (length(colorDiffuseReflective) / 3.0);' +

            'vec3 material = max(colorTextureColor.rgb, mix(colorTextureColor.rgb, colorDiffuseReflective, metalness));' +
            'vec3 light = max(colorTextureEmission.rgb, colorTextureReception.rgb * colorDiffuse);' +

            'float alpha = colorTextureColor.a * colorTextureOpacity.r;' +
            'float visible = float(alpha != 0.0);' +

            'gl_FragColor = vec4(material * light, visible);' +
        '}'
    );

    /**
     * @type {typeof import('../index.js').Shader['sourceVertex']}
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

            'gl_Position = vec4(2.0 * (varyingPosition - uniformTranslationPointOfView) / uniformAspect, 0.0, 1.0);' +
        '}'
    );

    /**
     * @type {typeof import('../index.js').Shader['uniforms']}
     */
    static uniforms = {

        'uniformAspect': 'vec2',
        'uniformColorsLight': 'vec3[]',
        'uniformIntensitiesLight': 'float[]',
        'uniformPositionsLight': 'vec3[]',
        'uniformReflectiveLight': 'bool[]',
        'uniformSize': 'vec2',
        'uniformTextureColor': 'sampler2D',
        'uniformTextureEmission': 'sampler2D',
        'uniformTextureMetallic': 'sampler2D',
        'uniformTextureNormal': 'sampler2D',
        'uniformTextureOpacity': 'sampler2D',
        'uniformTextureReception': 'sampler2D',
        'uniformTranslation': 'vec2',
        'uniformTranslationPointOfView': 'vec2'
    };
}

export {

    ShaderStage
};

export default ShaderStage;
