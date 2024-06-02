import {Actor} from '../index.js';

/**
 * Factores an actor with preloadable assets.
 * @param {string[]} $preloadables The preloadable assets.
 * @returns {typeof import('../index.js').Actor}
 */
function ActorPreloadable($preloadables = []) {

    /**
     * @type {string[]}
     */
    const preloadables = [...$preloadables];

    return class extends Actor {

        /**
         * @type {typeof import('../index.js').Actor.preloadables}
         */
        static preloadables = preloadables;
    };
}

export {

    ActorPreloadable
};

export default ActorPreloadable;
