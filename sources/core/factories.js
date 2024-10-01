import {Actor, Preloadable, Stage} from '../index.js';

/**
 * @module FACTORIES
 */

/**
 * Prepares an actor with preloadable assets.
 * @param {Array<typeof Preloadable | typeof Actor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Actor}
 *
 * @memberof module:FACTORIES
 */
function ActorWithPreloadables($preloadables) {

    /**
     * @type {Set<string>}
     */
    const preloadables = new Set();

    $preloadables.forEach(($preloadable) => {

        if (typeof $preloadable !== typeof Preloadable) {

            return;
        }

        $preloadable.preloadables.forEach(($preloadable) => {

            if (preloadables.has($preloadable) === true) {

                return;
            }

            preloadables.add($preloadable);
        });
    });

    return class extends Actor {

        /**
         * Stores the preloadable assets.
         * @type {Array<string>}
         * @public
         * @static
         */
        static preloadables = Array.from(preloadables);
    };
}

/**
 * Prepares a preloadable sound.
 * @param {string} $sound The preloadable sound.
 * @returns {typeof Preloadable}
 *
 * @memberof module:FACTORIES
 */
function PreloadableSound($sound) {

    return class extends Preloadable {

        /**
         * Stores the preloadable assets.
         * @type {Array<string>}
         * @public
         * @static
         */
        static preloadables = [$sound];
    };
}

/**
 * Prepares a preloadable texture.
 * @param {string} $texture The preloadable texture.
 * @returns {typeof Preloadable}
 *
 * @memberof module:FACTORIES
 */
function PreloadableTexture($texture) {

    return class extends Preloadable {

        /**
         * Stores the preloadable assets.
         * @type {Array<string>}
         * @public
         * @static
         */
        static preloadables = [$texture];
    };
}

/**
 * Prepares a stage with preloadable assets.
 * @param {Array<typeof Preloadable | typeof Actor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Stage}
 *
 * @memberof module:FACTORIES
 */
function StageWithPreloadables($preloadables) {

    /**
     * @type {Set<string>}
     */
    const preloadables = new Set();

    $preloadables.forEach(($preloadable) => {

        if (typeof $preloadable !== typeof Preloadable) {

            return;
        }

        $preloadable.preloadables.forEach(($preloadable) => {

            if (preloadables.has($preloadable) === true) {

                return;
            }

            preloadables.add($preloadable);
        });
    });

    return class extends Stage {

        /**
         * Stores the preloadable assets.
         * @type {Array<string>}
         * @public
         * @static
         */
        static preloadables = Array.from(preloadables);
    };
}

export {

    ActorWithPreloadables,
    PreloadableSound,
    PreloadableTexture,
    StageWithPreloadables
};
