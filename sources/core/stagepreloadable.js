import {Actor, Stage} from '../index.js';

/**
 * @module StagePreloadable
 */

/**
 * @typedef {typeof Actor} typeclassactor A class actor.
 * @protected
 *
 * @memberof module:StagePreloadable
 */

/**
 * Factores a stage with preloadable assets.
 * @param {Array<string | typeclassactor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Stage}
 *
 * @memberof module:StagePreloadable
 */
function StagePreloadable($preloadables = []) {

    /**
     * @type {Set<string>}
     */
    const preloadables = new Set();

    $preloadables.forEach(($preloadable) => {

        if (typeof $preloadable === 'string') {

            if (preloadables.has($preloadable) === true) {

                return;
            }

            preloadables.add($preloadable);

            return;
        }

        if (typeof $preloadable === typeof Actor) {

            $preloadable.preloadables.forEach(($preloadable) => {

                if (preloadables.has($preloadable) === true) {

                    return;
                }

                preloadables.add($preloadable);
            });

            return;
        }
    });

    return class extends Stage {

        /**
         * @type {typeof Stage.preloadables}
         */
        static preloadables = Array.from(preloadables);
    };
}

export {

    StagePreloadable
};

export default StagePreloadable;
