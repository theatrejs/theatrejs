export default SystemRender;
/**
 * Creates render systems.
 *
 * @example
 *
 * const system = new SystemRender({$container, $resolution});
 * system.initiate();
 * system.tick($stage);
 */
export class SystemRender {
    /**
     * Stores the texture unit for the textures to preload.
     * @type {0}
     * @public
     * @readonly
     * @static
     */
    public static readonly UNITTEXTURE0: 0;
    /**
     * Stores the texture unit for the color textures.
     * @type {1}
     * @public
     * @readonly
     * @static
     */
    public static readonly UNITTEXTURE1: 1;
    /**
     * Stores the texture unit for the opacity textures.
     * @type {2}
     * @public
     * @readonly
     * @static
     */
    public static readonly UNITTEXTURE2: 2;
    /**
     * Creates a new render system.
     * @param {Object} $parameters The given parameters.
     * @param {HTMLElement} $parameters.$container The container on which to attach the canvas.
     * @param {import('../index.js').Vector2} $parameters.$resolution The rendering resolution to use.
     */
    constructor({ $container, $resolution }: {
        $container: HTMLElement;
        $resolution: import("../index.js").Vector2;
    });
    /**
     * Stores the common vertices positions of the sprites.
     * @type {WebGLBuffer}
     * @private
     */
    private $bufferPosition;
    /**
     * Stores the cache of the texture assets.
     * @type {Map<string, WebGLTexture>}
     * @private
     */
    private $cache;
    /**
     * Stores the canvas element.
     * @type {HTMLCanvasElement}
     * @private
     */
    private $canvas;
    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    private $container;
    /**
     * Stores the canvas context.
     * @type {WebGL2RenderingContext}
     * @private
     */
    private $context;
    /**
     * Stores the number of indices of the vertices positions of the sprites.
     * @type {number}
     * @private
     */
    private $indices;
    /**
     * Stores the initiated status.
     * @type {boolean}
     * @private
     */
    private $initiated;
    /**
     * Stores the shader program attribute locations.
     * @type {Object.<string, number>}
     * @private
     */
    private $locationsAttribute;
    /**
     * Stores the shader program uniform locations.
     * @type {Object.<string, WebGLUniformLocation>}
     * @private
     */
    private $locationsUniform;
    /**
     * Stores the mapping between the texture sources and their uvmappings.
     * @type {Object.<string, WebGLBuffer>}
     * @private
     */
    private $mappingBuffersUv;
    /**
     * Stores the shader program.
     * @type {WebGLProgram}
     * @private
     */
    private $program;
    /**
     * Stores the ResizeObserver.
     * @type {ResizeObserver}
     * @private
     */
    private $resizeOberver;
    /**
     * Stores the rendering resolution.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $resolution;
    /**
     * Stores the texture of the default color texture source.
     * @type {WebGLTexture}
     * @private
     */
    private $textureColorDefault;
    /**
     * Stores the texture of the default opacity texture source.
     * @type {WebGLTexture}
     * @private
     */
    private $textureOpacityDefault;
    /**
     * Creates the common vertices positions of the sprites.
     * @private
     */
    private $createBufferPositions;
    /**
     * Creates the uvmapping from the given sprite.
     * @param {import('../index.js').Sprite} $sprite The sprite.
     * @private
     */
    private $createBufferUvsOnce;
    /**
     * Creates the indices of the vertices positions of the sprites.
     * @private
     */
    private $createIndices;
    /**
     * Creates the attributes locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    private $createLocationsAttribute;
    /**
     * Creates the uniform locations to use by the shader program.
     * @param {WebGLProgram} $program The shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    private $createLocationsUniform;
    /**
     * Creates the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @private
     */
    private $createProgram;
    /**
     * Creates a texture from the given bitmap texture data.
     * @param {ImageBitmap} $textureBitmap The bitmap texture data.
     * @param {number} $unitTexture The target texture unit.
     * @returns {WebGLTexture}
     * @private
     */
    private $createTexture;
    /**
     * Creates a default texture (1 pixel texture).
     * @param {import('../index.js').Vector3} $color The target texture unit.
     * @param {number} $unitTexture The target texture unit.
     * @returns {WebGLTexture}
     * @private
     */
    private $createTextureDefault;
    /**
     * Loads the texture from the given texture file content.
     * @param {Response} $content The texture file content.
     * @param {number} $unitTexture The target texture unit.
     * @returns {Promise<WebGLTexture>}
     * @private
     */
    private $loadTexture;
    /**
     * Prepares the texture from the given texture source.
     * @param {string} $texture The texture source.
     * @param {number} $unitTexture The target texture unit.
     * @private
     */
    private $prepareTexture;
    /**
     * Called when the scope is about to be unloaded.
     * @private
     */
    private $onBeforeUnload;
    /**
     * Resets the canvas.
     * @param {number} $width The context viewport width.
     * @param {number} $height The context viewport height.
     * @private
     */
    private $resetCanvas;
    /**
     * Resizes the rendering context.
     * @public
     */
    public $resize(): void;
    /**
     * Sends an attribute to the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @param {string} $name The name of the attribute.
     * @param {any} $value The value of the attribute.
     * @private
     */
    private $sendAttribute;
    /**
     * Sends a uniform to the shader program.
     * @param {typeof import('../index.js').Shader} $shader The representation of the shader.
     * @param {string} $name The name of the uniform.
     * @param {any} $value The value of the uniform.
     * @private
     */
    private $sendUniform;
    /**
     * Checks if the system has loaded the given asset.
     * @param {string} $asset The asset source.
     * return {boolean}
     * @public
     */
    public hasAssetLoaded($asset: string): boolean;
    /**
     * Initiates the system.
     * @public
     */
    public initiate(): void;
    /**
     * Loads the texture from the given texture file content.
     * @param {Response} $content The texture file content.
     * @returns {Promise<WebGLTexture>}
     * @public
     */
    public loadTexture($content: Response): Promise<WebGLTexture>;
    /**
     * Terminates the system.
     * @public
     */
    public terminate(): void;
    /**
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    public tick($stage: import("../index.js").Stage): void;
}
