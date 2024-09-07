import {Actor, UTILS} from '../index.js';

/**
 * Factores an actor with preloadable assets.
 * @param {(string | typeof import('../index.js').Actor)[]} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof import('../index.js').Actor}
 */
function ActorPreloadable($preloadables = []) {

    /**
     * @type {string[]}
     */
    const preloadables = [];

    $preloadables.forEach(($preloadable) => {

        if (typeof $preloadable === 'string') {

            preloadables.push($preloadable);

            return;
        }

        if (typeof $preloadable === typeof Actor) {

            preloadables.push(...$preloadable.preloadables);

            return;
        }
    });

    return class extends Actor {

        /**
         * @type {typeof import('../index.js').Actor.preloadables}
         */
        static preloadables = UTILS.deduplicate(preloadables);
    };
}

export {

    ActorPreloadable
};

export default ActorPreloadable;
