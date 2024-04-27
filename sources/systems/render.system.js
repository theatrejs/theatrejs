import {Light, ShaderStage, Vector3} from '../index.js';

/**
 * Creates render systems.
 *
 * @example
 *
 * const system = new SystemRender({$container, $resolution});
 * system.initiate();
 * system.tick($stage);
 */
class SystemRender {

    /**
     * Stores the void light of the renderer.
     * @type {import('../index.js').Light}
     * @public
     * @readonly
     * @static
     */
    static LIGHTVOID = new Light({

        $color: new Vector3(0, 0, 0),
        $intensity: 0
    });

    /**
     * Stores the texture unit for the textures to preload.
     * @type {0}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE0 = 0;

    /**
     * Stores the texture unit for the color textures.
     * @type {1}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE1 = 1;

    /**
     * Stores the texture unit for the emission textures.
     * @type {2}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE2 = 2;

    /**
     * Stores the texture unit for the metallic textures.
     * @type {3}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE3 = 3;

    /**
     * Stores the texture unit for the normal textures.
     * @type {4}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE4 = 4;

    /**
     * Stores the texture unit for the opacity textures.
     * @type {5}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE5 = 5;

    /**
     * Stores the common vertices positions of the sprites.
     * @type {WebGLBuffer}
     * @private
     */
    $bufferPosition;

    /**
     * Stores the canvas element.
     * @type {HTMLCanvasElement}
     * @private
     */
    $canvas;

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the canvas context.
     * @type {WebGL2RenderingContext}
     * @private
     */
    $context;

    /**
     * Stores the number of indices of the vertices positions of the sprites.
     * @type {number}
     * @private
     */
    $indices;

    /**
     * Stores the initiated status.
     * @type {boolean}
     * @private
     */
    $initiated;

    /**
     * Stores the shader program attribute locations.
     * @type {Object.<string, number>}
     * @private
     */
    $locationsAttribute;

    /**
     * Stores the shader program uniform locations.
     * @type {Object.<string, WebGLUniformLocation>}
     * @private
     */
    $locationsUniform;

    /**
     * Stores the mapping between the texture sources and their uvmappings.
     * @type {Object.<string, WebGLBuffer>}
     * @private
     */
    $mappingBuffersUv;

    /**
     * Stores the mapping between the texture sources and their textures.
     * @type {Object.<string, WebGLTexture>}
     * @private
     */
    $mappingTextures;

    /**
     * Stores the shader program.
     * @type {WebGLProgram}
     * @private
     */
    $program;

    /**
     * Stores the ResizeObserver.
     * @type {ResizeObserver}
     * @private
     */
    $resizeOberver;

    /**
     * Stores the rendering resolution.
     * @type {import('../index.js').Vector2}
     * @private
     */
    $resolution;

    /**
     * Stores the texture of the default color texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureColorDefault;

    /**
     * Stores the texture of the default emission texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureEmissionDefault;

    /**
     * Stores the texture of the default metallic texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureMetallicDefault;

    /**
     * Stores the texture of the default normal texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureNormalDefault;

    /**
     * Stores the texture of the default opacity texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureOpacityDefault;

    /**
     * Creates a new render system.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach the canvas.
     * @param {import('../index.js').Vector2} $parameters.$resolution The rendering resolution to use.
     */
    constructor({$container, $resolution}) {

        this.$container = $container;
        this.$resolution = $resolution;

        this.$canvas = document.createElement('canvas');
        this.$canvas.style.width = '100%';
        this.$canvas.style.height = '100%';
        this.$canvas.style.display = 'block';
        this.$canvas.style.outline = '0';
        this.$canvas.style.imageRendering = 'pixelated';
        this.$context = this.$canvas.getContext('webgl2', {

            'antialias': false
        });

        $container.appendChild(this.$canvas);

        this.$resize();

        this.$initiated = false;
    }

    /**
     * Creates the common vertices positions of the sprites.
     * @private
     */
    $createBufferPositions() {

        const positions = [

            -0.5, -0.5,
            -0.5, 0.5,
            0.5, 0.5,
            0.5, -0.5
        ];

        const bufferPosition = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ARRAY_BUFFER, bufferPosition);
        this.$context.bufferData(this.$context.ARRAY_BUFFER, new Float32Array(positions), this.$context.STATIC_DRAW);

        this.$bufferPosition = bufferPosition;
    }

    /**
     * Creates the uvmapping from the given sprite.
     * @param {import('../index.js').Sprite} $sprite The sprite.
     * @private
     */
    $createBufferUvsOnce($sprite) {

        if (typeof this.$mappingBuffersUv[$sprite.frameSourceSerialized] !== 'undefined') {

            return;
        }

        const frame = $sprite.frameSource;

        const uvs = [

            frame.minimum.x, frame.maximum.y,
            frame.minimum.x, frame.minimum.y,
            frame.maximum.x, frame.minimum.y,
            frame.maximum.x, frame.maximum.y
        ];

        const bufferUv = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ARRAY_BUFFER, bufferUv);
        this.$context.bufferData(this.$context.ARRAY_BUFFER, new Float32Array(uvs), this.$context.STATIC_DRAW);

        this.$mappingBuffersUv[$sprite.frameSourceSerialized] = bufferUv;
    }

    /**
     * Creates the indices of the vertices positions of the sprites.
     * @private
     */
    $createIndices() {

        const indices = [

            0,
            1,
            2,
            3
        ];

        const bufferIndex = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ELEMENT_ARRAY_BUFFER, bufferIndex);
        this.$context.bufferData(this.$context.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), this.$context.STATIC_DRAW);

        this.$indices = indices.length;
    }

    /**
     * Creates the attributes locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    $createLocationsAttribute($program, $shader) {

        Object.keys($shader.attributes).forEach(($name) => {

            this.$locationsAttribute[$name] = this.$context.getAttribLocation($program, $name);
        });
    }

    /**
     * Creates the uniform locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    $createLocationsUniform($program, $shader) {

        Object.keys($shader.uniforms).forEach(($name) => {

            this.$locationsUniform[$name] = this.$context.getUniformLocation($program, $name);
        });
    }

    /**
     * Creates the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    $createProgram($shader) {

        const shaderVertex = this.$context.createShader(this.$context.VERTEX_SHADER);
        this.$context.shaderSource(shaderVertex, $shader.sourceVertex);
        this.$context.compileShader(shaderVertex);

        const shaderFragment = this.$context.createShader(this.$context.FRAGMENT_SHADER);
        this.$context.shaderSource(shaderFragment, $shader.sourceFragment);
        this.$context.compileShader(shaderFragment);

        this.$program = this.$context.createProgram();
        this.$context.attachShader(this.$program, shaderVertex);
        this.$context.attachShader(this.$program, shaderFragment);
        this.$context.linkProgram(this.$program);
    }

    /**
     * Creates a default texture (1 pixel texture).
     * @param {import('../index.js').Vector3} $color The target texture unit.
     * @param {number} $unitTexture The target texture unit.
     * @returns {WebGLTexture}
     * @private
     */
    $createTextureDefault($color, $unitTexture) {

        const texture = this.$context.createTexture();

        this.$context.activeTexture(this.$context.TEXTURE0 + $unitTexture);
        this.$context.bindTexture(this.$context.TEXTURE_2D, texture);
        this.$context.texImage2D(this.$context.TEXTURE_2D, 0, this.$context.RGBA, 1, 1, 0, this.$context.RGBA, this.$context.UNSIGNED_BYTE, new Uint8Array([$color.x, $color.y, $color.z, 255]));

        return texture;
    }

    /**
     * Creates a texture from the given texture source.
     * @param {string} $texture The texture source.
     * @param {number} $unitTexture The target texture unit.
     * @private
     */
    $createTextureOnce($texture, $unitTexture) {

        if (this.$mappingTextures.hasOwnProperty($texture) === true) {

            return;
        }

        this.$mappingTextures[$texture] = undefined;

        const image = new Image();

        image.addEventListener('load', () => {

            const texture = this.$context.createTexture();

            this.$context.activeTexture($unitTexture);
            this.$context.bindTexture(this.$context.TEXTURE_2D, texture);

            this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_MIN_FILTER, this.$context.NEAREST);
            this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_MAG_FILTER, this.$context.NEAREST);
            this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_WRAP_S, this.$context.CLAMP_TO_EDGE);
            this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_WRAP_T, this.$context.CLAMP_TO_EDGE);

            this.$context.texImage2D(this.$context.TEXTURE_2D, 0, this.$context.RGBA, this.$context.RGBA, this.$context.UNSIGNED_BYTE, image);

            this.$mappingTextures[$texture] = texture;
        });

        image.src = $texture;
    }

    /**
     * Called when the scope is about to be unloaded.
     * @private
     */
    $onBeforeUnload() {

        this.$context.getExtension('WEBGL_lose_context').loseContext();
    }

    /**
     * Resets the canvas.
     * @param {number} $width The context viewport width.
     * @param {number} $height The context viewport height.
     * @private
     */
    $resetCanvas($width, $height) {

        this.$context.clearColor(0, 0, 0, 1);
        this.$context.clearDepth(1);

        this.$context.viewport(0, 0, $width, $height);
        this.$context.clear(this.$context.COLOR_BUFFER_BIT | this.$context.DEPTH_BUFFER_BIT);
    }

    /**
     * Resizes the rendering context.
     * @public
     */
    $resize() {

        const width = this.$resolution.x;
        const height = this.$resolution.y;

        const widthContext = Math.max(width, Math.floor(height * this.$canvas.clientWidth / this.$canvas.clientHeight));
        const heightContext = Math.max(height, Math.floor(width * this.$canvas.clientHeight / this.$canvas.clientWidth));

        this.$canvas.setAttribute('width', '' + widthContext);
        this.$canvas.setAttribute('height', '' + heightContext);
    }

    /**
     * Sends an attribute to the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @param {string} $name The name of the attribute.
     * @param {any} $value The value of the attribute.
     * @private
     */
    $sendAttribute($shader, $name, $value) {

        if (typeof $shader.attributes[$name] === 'undefined') {

            return;
        }

        const type = $shader.attributes[$name];

        switch (type) {

            case 'vec2': {

                this.$context.bindBuffer(this.$context.ARRAY_BUFFER, $value);
                const location = this.$locationsAttribute[$name];
                this.$context.vertexAttribPointer(location, 2, this.$context.FLOAT, false, 0, 0);
                this.$context.enableVertexAttribArray(location);

                break;
            }

            case 'vec3': {

                this.$context.bindBuffer(this.$context.ARRAY_BUFFER, $value);
                const location = this.$locationsAttribute[$name];
                this.$context.vertexAttribPointer(location, 3, this.$context.FLOAT, false, 0, 0);
                this.$context.enableVertexAttribArray(location);

                break;
            }
        }
    }

    /**
     * Sends a uniform to the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @param {string} $name The name of the uniform.
     * @param {any} $value The value of the uniform.
     * @private
     */
    $sendUniform($shader, $name, $value) {

        if (typeof $shader.uniforms[$name] === 'undefined') {

            return;
        }

        const type = $shader.uniforms[$name];

        switch (type) {

            case 'bool':
            case 'int':
            case 'sampler2D': {

                this.$context.uniform1i(this.$locationsUniform[$name], $value);

                break;
            }

            case 'bool[]':
            case 'int[]': {

                this.$context.uniform1iv(this.$locationsUniform[$name], $value);

                break;
            }

            case 'float': {

                this.$context.uniform1f(this.$locationsUniform[$name], $value);

                break;
            }

            case 'float[]': {

                this.$context.uniform1fv(this.$locationsUniform[$name], $value);

                break;
            }

            case 'mat4':
            case 'mat4[]': {

                this.$context.uniformMatrix4fv(this.$locationsUniform[$name], false, $value);

                break;
            }

            case 'vec2':
            case 'vec2[]': {

                this.$context.uniform2fv(this.$locationsUniform[$name], $value);

                break;
            }

            case 'vec3':
            case 'vec3[]': {

                this.$context.uniform3fv(this.$locationsUniform[$name], $value);

                break;
            }
        }
    }

    /**
     * Initiates the system.
     * @public
     */
    initiate() {

        if (this.$initiated === true) {

            return;
        }

        this.$indices = 0;
        this.$locationsAttribute = {};
        this.$locationsUniform = {};
        this.$mappingBuffersUv = {};
        this.$mappingTextures = {};

        this.$context.frontFace(this.$context.CW);
        this.$context.enable(this.$context.CULL_FACE);
        this.$context.cullFace(this.$context.BACK);

        this.$context.enable(this.$context.BLEND);
        this.$context.blendFunc(this.$context.SRC_ALPHA, this.$context.ONE_MINUS_SRC_ALPHA);

        this.$createProgram(ShaderStage);

        this.$context.useProgram(this.$program);

        this.$createLocationsUniform(this.$program, ShaderStage);
        this.$createLocationsAttribute(this.$program, ShaderStage);

        this.$createBufferPositions();
        this.$createIndices();

        this.$textureColorDefault = this.$createTextureDefault(new Vector3(127, 127, 127), SystemRender.UNITTEXTURE1);
        this.$textureEmissionDefault = this.$createTextureDefault(new Vector3(255, 255, 255), SystemRender.UNITTEXTURE2);
        this.$textureMetallicDefault = this.$createTextureDefault(new Vector3(0, 0, 0), SystemRender.UNITTEXTURE3);
        this.$textureNormalDefault = this.$createTextureDefault(new Vector3(127, 127, 255), SystemRender.UNITTEXTURE4);
        this.$textureOpacityDefault = this.$createTextureDefault(new Vector3(255, 255, 255), SystemRender.UNITTEXTURE5);

        this.$resizeOberver = new ResizeObserver(this.$resize.bind(this));
        this.$resizeOberver.observe(this.$container);

        window.addEventListener('beforeunload', this.$onBeforeUnload.bind(this));

        this.$initiated = true;
    }

    /**
     * Preloads the texture from the given texture source.
     * @param {string} $texture The texture source.
     * @public
     */
    preload($texture) {

        if (this.$initiated === false) {

            this.initiate();
        }

        this.$createTextureOnce($texture, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE0);
    }

    /**
     * Terminates the system.
     * @public
     */
    terminate() {

        if (this.$initiated === false) {

            return;
        }

        this.$resizeOberver.disconnect();

        window.removeEventListener('beforeunload', this.$onBeforeUnload.bind(this));

        this.$initiated = false;
    }

    /**
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    tick($stage) {

        if (this.$initiated === false) {

            this.initiate();
        }

        this.$resetCanvas(this.$canvas.width, this.$canvas.height);

        const lights = [...$stage.lights];

        if (lights.length === 0) {

            lights.push(SystemRender.LIGHTVOID);
        }

        this.$sendUniform(ShaderStage, 'uniformAspect', [this.$canvas.width, this.$canvas.height]);
        this.$sendUniform(ShaderStage, 'uniformColorsLight', lights.map(($light) => ([$light.color.x, $light.color.y, $light.color.z])).flat());
        this.$sendUniform(ShaderStage, 'uniformIntensitiesLight', lights.map(($light) => ($light.intensity)));
        this.$sendUniform(ShaderStage, 'uniformLights', lights.length);
        this.$sendUniform(ShaderStage, 'uniformPositionsLight', lights.map(($light) => ([$light.translation.x, $light.translation.y, $light.translation.z])).flat());
        this.$sendUniform(ShaderStage, 'uniformReflectiveLight', lights.map(($light) => ($light.reflective)));
        this.$sendUniform(ShaderStage, 'uniformTranslationPointOfView', [Math.floor($stage.pointOfView.translation.x), Math.floor($stage.pointOfView.translation.y)]);

        this.$sendAttribute(ShaderStage, 'attributePosition', this.$bufferPosition);

        const actors = [...$stage.actors];

        actors.sort(($a, $b) => {

            return $a.zIndex - $b.zIndex;
        });

        actors.forEach(($actor) => {

            if ($actor.hasSprite() === false) {

                return;
            }

            let textureColor = this.$textureColorDefault;

            this.$createTextureOnce($actor.sprite.textureColor, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE1);

            if (typeof this.$mappingTextures[$actor.sprite.textureColor] !== 'undefined') {

                textureColor = this.$mappingTextures[$actor.sprite.textureColor];
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE1);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureColor);
            this.$sendUniform(ShaderStage, 'uniformTextureColor', SystemRender.UNITTEXTURE1);

            let textureEmission = this.$textureEmissionDefault;

            if (typeof $actor.sprite.textureEmission !== 'undefined') {

                this.$createTextureOnce($actor.sprite.textureEmission, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE2);

                if (typeof this.$mappingTextures[$actor.sprite.textureEmission] !== 'undefined') {

                    textureEmission = this.$mappingTextures[$actor.sprite.textureEmission];
                }
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE2);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureEmission);
            this.$sendUniform(ShaderStage, 'uniformTextureEmission', SystemRender.UNITTEXTURE2);

            let textureMetallic = this.$textureMetallicDefault;

            if (typeof $actor.sprite.textureMetallic !== 'undefined') {

                this.$createTextureOnce($actor.sprite.textureMetallic, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE3);

                if (typeof this.$mappingTextures[$actor.sprite.textureMetallic] !== 'undefined') {

                    textureMetallic = this.$mappingTextures[$actor.sprite.textureMetallic];
                }
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE3);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureMetallic);
            this.$sendUniform(ShaderStage, 'uniformTextureMetallic', SystemRender.UNITTEXTURE3);

            let textureNormal = this.$textureNormalDefault;

            if (typeof $actor.sprite.textureNormal !== 'undefined') {

                this.$createTextureOnce($actor.sprite.textureNormal, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE4);

                if (typeof this.$mappingTextures[$actor.sprite.textureNormal] !== 'undefined') {

                    textureNormal = this.$mappingTextures[$actor.sprite.textureNormal];
                }
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE4);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureNormal);
            this.$sendUniform(ShaderStage, 'uniformTextureNormal', SystemRender.UNITTEXTURE4);

            let textureOpacity = this.$textureOpacityDefault;

            if (typeof $actor.sprite.textureOpacity !== 'undefined') {

                this.$createTextureOnce($actor.sprite.textureOpacity, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE5);

                if (typeof this.$mappingTextures[$actor.sprite.textureOpacity] !== 'undefined') {

                    textureOpacity = this.$mappingTextures[$actor.sprite.textureOpacity];
                }
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE5);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureOpacity);
            this.$sendUniform(ShaderStage, 'uniformTextureOpacity', SystemRender.UNITTEXTURE5);

            this.$sendUniform(ShaderStage, 'uniformSize', [$actor.sprite.sizeTarget.x, $actor.sprite.sizeTarget.y]);
            this.$sendUniform(ShaderStage, 'uniformTranslation', [Math.floor($actor.translation.x), Math.floor($actor.translation.y)]);

            this.$createBufferUvsOnce($actor.sprite);
            this.$sendAttribute(ShaderStage, 'attributeUvmapping', this.$mappingBuffersUv[$actor.sprite.frameSourceSerialized]);

            this.$context.drawElements(this.$context.TRIANGLE_FAN, this.$indices, this.$context.UNSIGNED_INT, 0);
        });
    }
}

export {

    SystemRender
};

export default SystemRender;
