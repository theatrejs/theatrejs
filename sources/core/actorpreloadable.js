import {Actor} from '../index.js';

/**
 * Factores an actor with preloadable assets.
 * @param {(string | typeof import('../index.js').Actor)[]} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof import('../index.js').Actor}
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
         * @type {typeof import('../index.js').Actor.preloadables}
         */
        static preloadables = Array.from(preloadables);
    };
}

export {

    ActorPreloadable
};

export default ActorPreloadable;
