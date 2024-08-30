import {Shader, Vector3} from '../index.js';

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
     * Stores the texture unit for the opacity textures.
     * @type {2}
     * @public
     * @readonly
     * @static
     */
    static UNITTEXTURE2 = 2;

    /**
     * Stores the common vertices positions of the sprites.
     * @type {WebGLBuffer}
     * @private
     */
    $bufferPosition;

    /**
     * Stores the cache of the texture assets.
     * @type {Map<string, WebGLTexture>}
     * @private
     */
    $cache;

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

        this.$cache = new Map();
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
     * Creates a texture from the given bitmap texture data.
     * @param {ImageBitmap} $textureBitmap The bitmap texture data.
     * @param {number} $unitTexture The target texture unit.
     * @returns {WebGLTexture}
     * @private
     */
    $createTexture($textureBitmap, $unitTexture) {

        const texture = this.$context.createTexture();

        this.$context.activeTexture($unitTexture);
        this.$context.bindTexture(this.$context.TEXTURE_2D, texture);

        this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_MIN_FILTER, this.$context.NEAREST);
        this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_MAG_FILTER, this.$context.NEAREST);
        this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_WRAP_S, this.$context.CLAMP_TO_EDGE);
        this.$context.texParameteri(this.$context.TEXTURE_2D, this.$context.TEXTURE_WRAP_T, this.$context.CLAMP_TO_EDGE);

        this.$context.texImage2D(this.$context.TEXTURE_2D, 0, this.$context.RGBA, this.$context.RGBA, this.$context.UNSIGNED_BYTE, $textureBitmap);

        return texture;
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
     * Loads the texture from the given texture file content.
     * @param {Response} $content The texture file content.
     * @param {number} $unitTexture The target texture unit.
     * @returns {Promise<WebGLTexture>}
     * @private
     */
    $loadTexture($content, $unitTexture) {

        const promise = new Promise(($resolve) => {

            $content.blob()
            .then(($blob) => (createImageBitmap($blob)))
            .then(($textureBitmap) => {

                const texture = this.$createTexture($textureBitmap, $unitTexture);

                this.$cache.set($content.url, texture);

                $resolve(texture);
            });
        });

        return promise;
    }

    /**
     * Prepares the texture from the given texture source.
     * @param {string} $texture The texture source.
     * @param {number} $unitTexture The target texture unit.
     * @private
     */
    $prepareTexture($texture, $unitTexture) {

        if (this.$cache.has($texture) === true) {

            return;
        }

        this.$cache.set($texture, undefined);

        fetch($texture)
        .then(($content) => (this.$loadTexture($content, $unitTexture)));
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
     * Checks if the system has loaded the given asset.
     * @param {string} $asset The asset source.
     * @returns {boolean}
     * @public
     */
    hasAssetLoaded($asset) {

        return this.$cache.has($asset) === true;
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

        this.$context.frontFace(this.$context.CW);
        this.$context.enable(this.$context.CULL_FACE);
        this.$context.cullFace(this.$context.BACK);

        this.$context.enable(this.$context.BLEND);
        this.$context.blendFunc(this.$context.SRC_ALPHA, this.$context.ONE_MINUS_SRC_ALPHA);

        this.$createProgram(Shader);

        this.$context.useProgram(this.$program);

        this.$createLocationsUniform(this.$program, Shader);
        this.$createLocationsAttribute(this.$program, Shader);

        this.$createBufferPositions();
        this.$createIndices();

        this.$textureColorDefault = this.$createTextureDefault(new Vector3(127, 127, 127), SystemRender.UNITTEXTURE1);
        this.$textureOpacityDefault = this.$createTextureDefault(new Vector3(255, 255, 255), SystemRender.UNITTEXTURE2);

        this.$resizeOberver = new ResizeObserver(this.$resize.bind(this));
        this.$resizeOberver.observe(this.$container);

        window.addEventListener('beforeunload', this.$onBeforeUnload.bind(this));

        this.$initiated = true;
    }

    /**
     * Loads the texture from the given texture file content.
     * @param {Response} $content The texture file content.
     * @returns {Promise<WebGLTexture>}
     * @public
     */
    loadTexture($content) {

        if (this.$initiated === false) {

            this.initiate();
        }

        if (this.$cache.has($content.url) === true) {

            const promise = new Promise(($resolve) => {

                const texture = this.$cache.get($content.url);

                $resolve(texture);
            });

            return promise;
        }

        this.$cache.set($content.url, undefined);

        return this.$loadTexture($content, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE0);
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

        this.$sendUniform(Shader, 'uniformAspect', [this.$canvas.width, this.$canvas.height]);
        this.$sendUniform(Shader, 'uniformTranslationPointOfView', [Math.floor($stage.pointOfView.translation.x), Math.floor($stage.pointOfView.translation.y)]);

        this.$sendAttribute(Shader, 'attributePosition', this.$bufferPosition);

        const actors = [...$stage.actors];

        actors.sort(($a, $b) => {

            return $a.zIndex - $b.zIndex;
        });

        actors.forEach(($actor) => {

            if ($actor.hasSprite() === false) {

                return;
            }

            let textureColor = this.$textureColorDefault;

            this.$prepareTexture($actor.sprite.textureColor, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE1);

            if (typeof this.$cache.get($actor.sprite.textureColor) !== 'undefined') {

                textureColor = this.$cache.get($actor.sprite.textureColor);
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE1);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureColor);
            this.$sendUniform(Shader, 'uniformTextureColor', SystemRender.UNITTEXTURE1);

            let textureOpacity = this.$textureOpacityDefault;

            if (typeof $actor.sprite.textureOpacity !== 'undefined') {

                this.$prepareTexture($actor.sprite.textureOpacity, this.$context.TEXTURE0 + SystemRender.UNITTEXTURE2);

                if (typeof this.$cache.get($actor.sprite.textureOpacity) !== 'undefined') {

                    textureOpacity = this.$cache.get($actor.sprite.textureOpacity);
                }
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNITTEXTURE2);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureOpacity);
            this.$sendUniform(Shader, 'uniformTextureOpacity', SystemRender.UNITTEXTURE2);

            this.$sendUniform(Shader, 'uniformSize', [$actor.sprite.sizeTarget.x, $actor.sprite.sizeTarget.y]);
            this.$sendUniform(Shader, 'uniformTranslation', [Math.floor($actor.translation.x), Math.floor($actor.translation.y)]);

            this.$createBufferUvsOnce($actor.sprite);
            this.$sendAttribute(Shader, 'attributeUvmapping', this.$mappingBuffersUv[$actor.sprite.frameSourceSerialized]);

            this.$context.drawElements(this.$context.TRIANGLE_FAN, this.$indices, this.$context.UNSIGNED_INT, 0);
        });
    }
}

export {

    SystemRender
};

export default SystemRender;
