import {Actor} from '../index.js';

/**
 * @module ActorPreloadable
 */

/**
 * @typedef {typeof Actor} typeclassactor A class actor.
 * @protected
 *
 * @memberof module:ActorPreloadable
 */

/**
 * Factores an actor with preloadable assets.
 * @param {Array<string | typeclassactor>} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof Actor}
 *
 * @memberof module:ActorPreloadable
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
         * @type {typeof Actor.preloadables}
         */
        static preloadables = Array.from(preloadables);
    };
}

export {

    ActorPreloadable
};

export default ActorPreloadable;
