import {Actor, Stage} from '../index.js';

/**
 * @module FACTORIES
 */

/**
 * Factores an actor with preloadable assets.
 * @param {Array<string | typeof Actor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Actor}
 *
 * @memberof module:FACTORIES
 */
function ActorPreloadable($preloadables = []) {

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
 * Factores a stage with preloadable assets.
 * @param {Array<string | typeof Actor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Stage}
 *
 * @memberof module:FACTORIES
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
         * Stores the preloadable assets.
         * @type {Array<string>}
         * @public
         * @static
         */
        static preloadables = Array.from(preloadables);
    };
}

export {

    ActorPreloadable,
    StagePreloadable
};
