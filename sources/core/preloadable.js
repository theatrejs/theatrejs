/**
 * Abstract preloadables.
 *
 * @example
 *
 * class PreloadableExample extends Preloadable {}
 */
class Preloadable {

    /**
     * Stores the preloadable assets.
     * @type {Array<string>}
     * @public
     * @static
     */
    static preloadables = [];
}

export {

    Preloadable
};

export default Preloadable;
