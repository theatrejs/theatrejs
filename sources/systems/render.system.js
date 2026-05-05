import {AABB, Actor, CONTEXT_TYPES, EVENT_TYPES, Mask, SHADER_PARAMETER_TYPES, Shader, Sprite, Stage, System, Vector2, Vector3} from '../index.js';

/**
 * The data URL of a PNG image of a black pixel.
 * @type {string}
 * @constant
 * @private
 */
const $DATA_URL_IMAGE_PNG_BASE64_PIXEL_BLACK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABBAEAwS2OUAAAAABJRU5ErkJggg==';

/**
 * Creates render systems.
 *
 * @example
 *
 * // minimal
 * const system = new SystemRender({$container, $framing});
 * system.initiate();
 * system.tick($stage);
 *
 * @example
 *
 * // full
 * const system = new SystemRender({$color, $container, $framing});
 * system.initiate();
 * system.tick($stage);
 */
class SystemRender extends System {

    /**
     * Stores the texture unit for the textures to preload.
     * @type {0}
     * @public
     * @readonly
     * @static
     */
    static UNIT_TEXTURE_0 = 0;

    /**
     * Stores the texture unit for the sprite textures.
     * @type {1}
     * @public
     * @readonly
     * @static
     */
    static UNIT_TEXTURE_1 = 1;

    /**
     * Stores the texture unit for the mask textures.
     * @type {2}
     * @public
     * @readonly
     * @static
     */
    static UNIT_TEXTURE_2 = 2;

    /**
     * Stores the common vertices positions of the sprites.
     * @type {WebGLBuffer}
     * @private
     */
    $bufferVertices;

    /**
     * Stores the cache of the texture assets.
     * @type {Map<string, WebGLTexture>}
     * @private
     */
    $cacheTextures;

    /**
     * Stores the canvas element.
     * @type {HTMLCanvasElement}
     * @private
     */
    $canvas;

    /**
     * Stores the background color.
     * @type {Vector3}
     * @private
     */
    $color;

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
     * Stores the framing (rendering resolution).
     * @type {Vector2}
     * @private
     */
    $framing;

    /**
     * Stores the number of indices of the vertices positions of the sprites.
     * @type {number}
     * @private
     */
    $indices;

    /**
     * Stores the shader program attribute locations.
     * @type {Map<string, number>}
     * @private
     */
    $locationsAttribute;

    /**
     * Stores the shader program uniform locations.
     * @type {Map<string, WebGLUniformLocation>}
     * @private
     */
    $locationsUniform;

    /**
     * Stores the mapping between the texture sources and their uvmappings.
     * @type {Map<string, WebGLBuffer>}
     * @private
     */
    $mappingBuffersUvs;

    /**
     * Stores the placeholder mask.
     * @type {Mask}
     * @private
     */
    $maskPlaceholder;

    /**
     * Stores the shader program.
     * @type {WebGLProgram}
     * @private
     */
    $program;

    /**
     * Stores the resized status.
     * @type {boolean}
     * @private
     */
    $resized;

    /**
     * Stores the ResizeObserver.
     * @type {ResizeObserver}
     * @private
     */
    $resizeObserver;

    /**
     * Stores the fragment shader.
     * @type {WebGLShader}
     * @private
     */
    $shaderFragment;

    /**
     * Stores the vertex shader.
     * @type {WebGLShader}
     * @private
     */
    $shaderVertex;

    /**
     * Stores the texture of the black texture source.
     * @type {WebGLTexture}
     * @private
     */
    $textureBlack;

    /**
     * Stores the texture of the placeholder texture source.
     * @type {WebGLTexture}
     * @private
     */
    $texturePlaceholder;

    /**
     * Creates a new render system.
     * @param {object} $parameters The given parameters.
     * @param {Vector3} [$parameters.$color] The rendering background color to use.
     * @param {HTMLElement} $parameters.$container The container on which to attach the canvas.
     * @param {Vector2} $parameters.$framing The framing (rendering resolution) to use.
     */
    constructor({$color = new Vector3(0, 0, 0), $container, $framing}) {

        super();

        this.$loseContext = this.$loseContext.bind(this);
        this.$setFocus = this.$setFocus.bind(this);

        this.$color = $color.clone();
        this.$container = $container;
        this.$framing = $framing.clone();

        this.$resized = false;
    }

    /**
     * Gets the key of the uvmapping from the given actor.
     * @param {Actor} $actor The actor.
     * @returns {string}
     * @private
     */
    $getKeyMappingBuffersUvs($actor) {

        return $actor.sprite.frameSourceSerialized + '@' + $actor.tilingSerialized;
    }

    /**
     * Creates the uvmapping from the given sprite.
     * @param {Actor} $actor The actor.
     * @private
     */
    $createBufferUvsOnce($actor) {

        if (this.$mappingBuffersUvs.has(this.$getKeyMappingBuffersUvs($actor)) === true) {

            return;
        }

        const uMinimum = 0.5 - $actor.tiling.x / 2;
        const uMaximum = 0.5 + $actor.tiling.x / 2;
        const vMinimum = 0.5 - $actor.tiling.y / 2;
        const vMaximum = 0.5 + $actor.tiling.y / 2;

        const uvs = [

            uMinimum, vMaximum,
            uMinimum, vMinimum,
            uMaximum, vMinimum,
            uMaximum, vMaximum
        ];

        const bufferUvs = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ARRAY_BUFFER, bufferUvs);
        this.$context.bufferData(this.$context.ARRAY_BUFFER, new Float32Array(uvs), this.$context.STATIC_DRAW);

        this.$mappingBuffersUvs.set(this.$getKeyMappingBuffersUvs($actor), bufferUvs);
    }

    /**
     * Creates the common vertices positions of the sprites.
     * @private
     */
    $createBufferVertices() {

        const vertices = [

            -0.5, -0.5,
            -0.5, 0.5,
            0.5, 0.5,
            0.5, -0.5
        ];

        const bufferVertices = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ARRAY_BUFFER, bufferVertices);
        this.$context.bufferData(this.$context.ARRAY_BUFFER, new Float32Array(vertices), this.$context.STATIC_DRAW);

        this.$bufferVertices = bufferVertices;
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

        const bufferIndices = this.$context.createBuffer();
        this.$context.bindBuffer(this.$context.ELEMENT_ARRAY_BUFFER, bufferIndices);
        this.$context.bufferData(this.$context.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), this.$context.STATIC_DRAW);

        this.$indices = indices.length;
    }

    /**
     * Creates the attributes locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof Shader} $shader The representation of the shader.
     * @private
     */
    $createLocationsAttribute($program, $shader) {

        Array.from($shader.attributes.keys()).forEach(($name) => {

            this.$locationsAttribute.set($name, this.$context.getAttribLocation($program, $name));
        });
    }

    /**
     * Creates the uniform locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof Shader} $shader The representation of the shader.
     * @private
     */
    $createLocationsUniform($program, $shader) {

        Array.from($shader.uniforms.keys()).forEach(($name) => {

            this.$locationsUniform.set($name, this.$context.getUniformLocation($program, $name));
        });
    }

    /**
     * Creates a default mask.
     * @returns {Mask}
     * @private
     */
    $createMaskDefault() {

        const sprite = new Sprite({

            $sizeTarget: new Vector2(1, 1),
            $texture: $DATA_URL_IMAGE_PNG_BASE64_PIXEL_BLACK
        });

        return new Mask(sprite);
    }

    /**
     * Creates the shader program.
     * @param {typeof Shader} $shader The representation of the shader.
     * @private
     */
    $createProgram($shader) {

        this.$shaderVertex = this.$context.createShader(this.$context.VERTEX_SHADER);
        this.$context.shaderSource(this.$shaderVertex, $shader.sourceVertex);
        this.$context.compileShader(this.$shaderVertex);

        this.$shaderFragment = this.$context.createShader(this.$context.FRAGMENT_SHADER);
        this.$context.shaderSource(this.$shaderFragment, $shader.sourceFragment);
        this.$context.compileShader(this.$shaderFragment);

        this.$program = this.$context.createProgram();
        this.$context.attachShader(this.$program, this.$shaderVertex);
        this.$context.attachShader(this.$program, this.$shaderFragment);
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
     * @param {Vector3} $color The texture color.
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
     * Gets all the visible actors within the given boundaries (from bottom to top).
     * @param {object} $parameters The given parameters.
     * @param {AABB} $parameters.$boundaries The boundaries to check.
     * @param {Stage} $parameters.$stage The stage.
     * @returns {Array<Actor>}
     * @public
     */
    $getActorsVisible({$boundaries, $stage}) {

        const actors = $stage.actors.filter(($actor) => {

            if ($actor.hasSprite() === false) {

                return false;
            }

            if ($actor.visible === false) {

                return false;
            }

            const sizeSprite = $actor.sprite.sizeTarget.clone()
            .multiply($actor.tiling);

            const boundariesSprite = AABB
            .fromSize(sizeSprite)
            .translate($actor.translation);

            const overlapX = AABB.overlapX($boundaries, boundariesSprite);

            if (overlapX <= 0) {

                return false;
            }

            const overlapY = AABB.overlapY($boundaries, boundariesSprite);

            if (overlapY <= 0) {

                return false;
            }

            return true;
        });

        actors.sort(($a, $b) => {

            return $a.zIndex - $b.zIndex;
        });

        return actors;
    }

    /**
     * Initiates the canvas element.
     * @private
     */
    $initiateCanvas() {

        this.$canvas = document.createElement('canvas');
        this.$canvas.style.setProperty('width', '100%');
        this.$canvas.style.setProperty('height', '100%');
        this.$canvas.style.setProperty('display', 'block');
        this.$canvas.style.setProperty('outline', '0');
        this.$canvas.style.setProperty('image-rendering', 'pixelated');

        this.$container.appendChild(this.$canvas);

        this.$resize();

        window.addEventListener(EVENT_TYPES.NATIVE.CLICK, this.$setFocus);
    }

    /**
     * Initiates the canvas context.
     * @private
     */
    $initiateContext() {

        this.$context = this.$canvas.getContext(CONTEXT_TYPES.WEBGL2, {

            'antialias': false
        });

        this.$context.frontFace(this.$context.CW);
        this.$context.enable(this.$context.CULL_FACE);
        this.$context.cullFace(this.$context.BACK);

        this.$context.enable(this.$context.BLEND);
        this.$context.blendFunc(this.$context.SRC_ALPHA, this.$context.ONE_MINUS_SRC_ALPHA);

        this.$createProgram(Shader);

        this.$context.useProgram(this.$program);

        this.$createLocationsUniform(this.$program, Shader);
        this.$createLocationsAttribute(this.$program, Shader);

        this.$createBufferVertices();
        this.$createIndices();

        this.$maskPlaceholder = this.$createMaskDefault();

        this.$texturePlaceholder = this.$createTextureDefault(new Vector3(127, 127, 127), SystemRender.UNIT_TEXTURE_1);
        this.$textureBlack = this.$createTextureDefault(new Vector3(0, 0, 0), SystemRender.UNIT_TEXTURE_2);

        window.addEventListener(EVENT_TYPES.NATIVE.BEFORE_UNLOAD, this.$loseContext);
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

                $textureBitmap.close();

                this.$cacheTextures.set($content.url, texture);

                $resolve(texture);
            });
        });

        return promise;
    }

    /**
     * Loses the canvas context.
     * @private
     */
    $loseContext() {

        if (this.$context instanceof WebGL2RenderingContext === false) {

            return;
        }

        if (this.$context.getExtension('WEBGL_lose_context') === null) {

            return;
        }

        this.$context.getExtension('WEBGL_lose_context').loseContext();
    }

    /**
     * Prepares the texture from the given texture source.
     * @param {string} $texture The texture source.
     * @param {number} $unitTexture The target texture unit.
     * @private
     */
    $prepareTexture($texture, $unitTexture) {

        if (this.$cacheTextures.has($texture) === true) {

            return;
        }

        this.$cacheTextures.set($texture, undefined);

        fetch($texture)
        .then(($content) => (this.$loadTexture($content, $unitTexture)));
    }

    /**
     * Resets the canvas.
     * @param {number} $width The context viewport width.
     * @param {number} $height The context viewport height.
     * @private
     */
    $resetCanvas($width, $height) {

        this.$context.clearColor(this.$color.x, this.$color.y, this.$color.z, 1);
        this.$context.clearDepth(1);

        this.$context.viewport(0, 0, $width, $height);
        this.$context.clear(this.$context.COLOR_BUFFER_BIT | this.$context.DEPTH_BUFFER_BIT);
    }

    /**
     * Resizes the rendering context.
     * @private
     */
    $resize() {

        const width = this.$framing.x;
        const height = this.$framing.y;

        const widthContext = Math.max(width, Math.floor(height * this.$canvas.clientWidth / this.$canvas.clientHeight));
        const heightContext = Math.max(height, Math.floor(width * this.$canvas.clientHeight / this.$canvas.clientWidth));

        this.$canvas.setAttribute('width', '' + Math.floor(widthContext / 2) * 2);
        this.$canvas.setAttribute('height', '' + Math.floor(heightContext / 2) * 2);

        this.$resized = true;
    }

    /**
     * Sends an attribute to the shader program.
     * @param {typeof Shader} $shader The representation of the shader.
     * @param {string} $name The name of the attribute.
     * @param {any} $value The value of the attribute.
     * @private
     */
    $sendAttribute($shader, $name, $value) {

        if ($shader.attributes.has($name) === false) {

            return;
        }

        const type = $shader.attributes.get($name);

        switch (type) {

            case SHADER_PARAMETER_TYPES.VECTOR_2: {

                this.$context.bindBuffer(this.$context.ARRAY_BUFFER, $value);
                const location = this.$locationsAttribute.get($name);
                this.$context.vertexAttribPointer(location, 2, this.$context.FLOAT, false, 0, 0);
                this.$context.enableVertexAttribArray(location);

                break;
            }

            case SHADER_PARAMETER_TYPES.VECTOR_3: {

                this.$context.bindBuffer(this.$context.ARRAY_BUFFER, $value);
                const location = this.$locationsAttribute.get($name);
                this.$context.vertexAttribPointer(location, 3, this.$context.FLOAT, false, 0, 0);
                this.$context.enableVertexAttribArray(location);

                break;
            }
        }
    }

    /**
     * Sends a uniform to the shader program.
     * @param {typeof Shader} $shader The representation of the shader.
     * @param {string} $name The name of the uniform.
     * @param {any} $value The value of the uniform.
     * @private
     */
    $sendUniform($shader, $name, $value) {

        if ($shader.uniforms.has($name) === false) {

            return;
        }

        const type = $shader.uniforms.get($name);

        switch (type) {

            case SHADER_PARAMETER_TYPES.BOOLEAN:
            case SHADER_PARAMETER_TYPES.INTEGER:
            case SHADER_PARAMETER_TYPES.SAMPLER_2D: {

                this.$context.uniform1i(this.$locationsUniform.get($name), $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.ARRAY_BOOLEAN:
            case SHADER_PARAMETER_TYPES.ARRAY_INTEGER: {

                this.$context.uniform1iv(this.$locationsUniform.get($name), $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.FLOAT: {

                this.$context.uniform1f(this.$locationsUniform.get($name), $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.ARRAY_FLOAT: {

                this.$context.uniform1fv(this.$locationsUniform.get($name), $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.MATRIX_4:
            case SHADER_PARAMETER_TYPES.ARRAY_MATRIX_4: {

                this.$context.uniformMatrix4fv(this.$locationsUniform.get($name), false, $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.VECTOR_2:
            case SHADER_PARAMETER_TYPES.ARRAY_VECTOR_2: {

                this.$context.uniform2fv(this.$locationsUniform.get($name), $value);

                break;
            }

            case SHADER_PARAMETER_TYPES.VECTOR_3:
            case SHADER_PARAMETER_TYPES.ARRAY_VECTOR_3: {

                this.$context.uniform3fv(this.$locationsUniform.get($name), $value);

                break;
            }
        }
    }

    /**
     * Sets the focus on the canvas element.
     * @private
     */
    $setFocus() {

        this.$canvas.setAttribute('tabindex', '0');
        this.$canvas.focus();
    }

    /**
     * Terminates the canvas.
     * @private
     */
    $terminateCanvas() {

        window.removeEventListener(EVENT_TYPES.NATIVE.CLICK, this.$setFocus);

        this.$container.removeChild(this.$canvas);
    }

    /**
     * Terminates the canvas context.
     * @private
     */
    $terminateContext() {

        window.removeEventListener(EVENT_TYPES.NATIVE.BEFORE_UNLOAD, this.$loseContext);

        this.$context.deleteBuffer(this.$bufferVertices);

        Array.from(this.$mappingBuffersUvs.values()).forEach(($buffer) => {

            this.$context.deleteBuffer($buffer);
        });

        this.$context.deleteTexture(this.$textureBlack);
        this.$context.deleteTexture(this.$texturePlaceholder);

        this.$cacheTextures.forEach(($texture) => {

            this.$context.deleteTexture($texture);
        });

        this.$context.deleteShader(this.$shaderFragment);
        this.$context.deleteShader(this.$shaderVertex);

        this.$context.deleteProgram(this.$program);

        this.$context = undefined;
    }

    /**
     * Checks the resized status.
     * @returns {boolean}
     * @public
     */
    checkResized() {

        return this.$resized === true;
    }

    /**
     * Gets the boundaries in the current stage from the framing (rendering resolution).
     * @param {Stage} $stage The current stage.
     * @returns {AABB}
     * @public
     */
    getBoundariesFromFraming($stage) {

        return AABB.fromSize(this.$framing).translate($stage.pointOfView.translation);
    }

    /**
     * Gets the boundaries in the current stage from the screen.
     * @param {Stage} $stage The current stage.
     * @returns {AABB}
     * @public
     */
    getBoundariesFromScreen($stage) {

        return new AABB(

            this.getTranslationFromScreen($stage, new Vector2(-1, 1)).ceil(),
            this.getTranslationFromScreen($stage, new Vector2(1, -1)).floor()
        );
    }

    /**
     * Gets the position in the current stage from the given clipped position in the screen.
     * @param {Stage} $stage The current stage.
     * @param {Vector2} $vector The position in the screen (with values in [-1, 1] ranges).
     * @returns {Vector2}
     * @public
     */
    getTranslationFromScreen($stage, $vector) {

        const width = this.$framing.x;
        const height = this.$framing.y;

        const widthContext = Math.max(width, Math.floor(height * this.$canvas.clientWidth / this.$canvas.clientHeight));
        const heightContext = Math.max(height, Math.floor(width * this.$canvas.clientHeight / this.$canvas.clientWidth));

        return new Vector2(

            ($vector.x * widthContext / 2) + $stage.pointOfView.translation.x,
            - ($vector.y * heightContext / 2) + $stage.pointOfView.translation.y
        );
    }

    /**
     * Checks if the system has loaded the given asset.
     * @param {string} $asset The asset source.
     * @returns {boolean}
     * @public
     */
    hasAssetLoaded($asset) {

        if (this.$initiated === false) {

            this.initiate();
        }

        return this.$cacheTextures.has($asset) === true;
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

        if (this.$cacheTextures.has($content.url) === true) {

            const promise = new Promise(($resolve) => {

                const texture = this.$cacheTextures.get($content.url);

                $resolve(texture);
            });

            return promise;
        }

        this.$cacheTextures.set($content.url, undefined);

        return this.$loadTexture($content, this.$context.TEXTURE0 + SystemRender.UNIT_TEXTURE_0);
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {

        this.$cacheTextures = new Map();
        this.$indices = 0;
        this.$locationsAttribute = new Map();
        this.$locationsUniform = new Map();
        this.$mappingBuffersUvs = new Map();

        this.$initiateCanvas();
        this.$initiateContext();

        this.$resizeObserver = new ResizeObserver(this.$resize.bind(this));
        this.$resizeObserver.observe(this.$container);
    }

    /**
     * Called when the system is being terminated.
     * @returns {(undefined | Promise<void>)}
     * @public
     */
    onTerminate() {

        this.$resizeObserver.disconnect();
        this.$resizeObserver = undefined;
        this.$resized = false;

        this.$terminateContext();
        this.$terminateCanvas();

        return undefined;
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage, $timetick}) {

        void $timetick;

        this.$resetCanvas(this.$canvas.width, this.$canvas.height);

        this.$sendUniform(Shader, Shader.UNIFORM_ASPECT, [this.$canvas.width, this.$canvas.height]);
        this.$sendUniform(Shader, Shader.UNIFORM_TRANSLATION_POINT_OF_VIEW, [Math.floor($stage.pointOfView.translation.x), Math.floor($stage.pointOfView.translation.y)]);

        this.$sendAttribute(Shader, Shader.ATTRIBUTE_VERTICES, this.$bufferVertices);

        const boundariesViewport = AABB
        .fromSize(new Vector2(this.$canvas.width, this.$canvas.height))
        .translate($stage.pointOfView.translation);

        const actors = this.$getActorsVisible({

            $boundaries: boundariesViewport,
            $stage: $stage
        });

        actors.forEach(($actor) => {

            let mask = this.$maskPlaceholder;

            if ($stage.hasMask($actor.mask) === true) {

                mask = $stage.getMask($actor.mask);
            }

            this.$prepareTexture($actor.sprite.texture, this.$context.TEXTURE0 + SystemRender.UNIT_TEXTURE_1);
            this.$prepareTexture(mask.sprite.texture, this.$context.TEXTURE0 + SystemRender.UNIT_TEXTURE_2);

            let textureSprite = this.$texturePlaceholder;
            let textureMask = this.$textureBlack;

            if (this.$cacheTextures.has($actor.sprite.texture) === true) {

                textureSprite = this.$cacheTextures.get($actor.sprite.texture);
            }

            if (this.$cacheTextures.has(mask.sprite.texture) === true) {

                textureMask = this.$cacheTextures.get(mask.sprite.texture);
            }

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNIT_TEXTURE_1);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureSprite);
            this.$sendUniform(Shader, Shader.UNIFORM_TEXTURE_SPRITE, SystemRender.UNIT_TEXTURE_1);

            this.$context.activeTexture(this.$context.TEXTURE0 + SystemRender.UNIT_TEXTURE_2);
            this.$context.bindTexture(this.$context.TEXTURE_2D, textureMask);
            this.$sendUniform(Shader, Shader.UNIFORM_TEXTURE_MASK, SystemRender.UNIT_TEXTURE_2);

            this.$sendUniform(Shader, Shader.UNIFORM_FRAME_MINIMUM, [$actor.sprite.frameSource.minimum.x, $actor.sprite.frameSource.minimum.y]);
            this.$sendUniform(Shader, Shader.UNIFORM_FRAME_MAXIMUM, [$actor.sprite.frameSource.maximum.x, $actor.sprite.frameSource.maximum.y]);

            this.$sendUniform(Shader, Shader.UNIFORM_SIZE_SPRITE, [$actor.sprite.sizeTarget.x * $actor.tiling.x, $actor.sprite.sizeTarget.y * $actor.tiling.y]);
            this.$sendUniform(Shader, Shader.UNIFORM_SIZE_MASK, [mask.sprite.sizeTarget.x, mask.sprite.sizeTarget.y]);

            this.$sendUniform(Shader, Shader.UNIFORM_TRANSLATION_SPRITE, [Math.floor($actor.translation.x), Math.floor($actor.translation.y)]);
            this.$sendUniform(Shader, Shader.UNIFORM_TRANSLATION_MASK, [Math.floor(mask.translation.x), Math.floor(mask.translation.y)]);

            this.$createBufferUvsOnce($actor);
            this.$sendAttribute(Shader, Shader.ATTRIBUTE_UVMAPPING_SPRITE, this.$mappingBuffersUvs.get(this.$getKeyMappingBuffersUvs($actor)));

            this.$context.drawElements(this.$context.TRIANGLE_FAN, this.$indices, this.$context.UNSIGNED_INT, 0);
        });

        this.$resized = false;
    }

    /**
     * Gets all the visible actors at the given position (from top to bottom).
     * @param {object} $parameters The given parameters.
     * @param {Vector2} $parameters.$position The position to use.
     * @param {Stage} $parameters.$stage The stage.
     * @returns {Array<Actor>}
     * @public
     */
    raycast({$position, $stage}) {

        const boundariesRay = AABB
        .fromSize(new Vector2(0, 0))
        .translate($position);

        const actors = this.$getActorsVisible({

            $boundaries: boundariesRay,
            $stage: $stage
        });

        return actors.reverse();
    }

    /**
     * Removes the native pointer display.
     * @public
     */
    removePointerNative() {

        if (this.$initiated === false) {

            this.initiate();
        }

        this.$canvas.style.setProperty('cursor', 'none');
    }

    /**
     * Sets the rendering background color.
     * @param {Vector3} $color The rendering background color to set.
     * @public
     */
    setColor($color) {

        this.$color = $color;
    }

    /**
     * Sets the framing (rendering resolution).
     * @param {Vector2} $framing The framing (rendering resolution) to set.
     * @public
     */
    setFraming($framing) {

        this.$framing = $framing.clone();

        this.$resize();
    }
}

export {

    SystemRender
};

export default SystemRender;
