import {Actor, Stage, UTILS} from '../index.js';

/**
 * Factores a stage with preloadable assets.
 * @param {(string | typeof import('../index.js').Actor)[]} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof import('../index.js').Stage}
 */
function StagePreloadable($preloadables = []) {

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

    return class extends Stage {

        /**
         * @type {typeof import('../index.js').Stage.preloadables}
         */
        static preloadables = UTILS.deduplicate(preloadables);
    };
}

export {

    StagePreloadable
};

export default StagePreloadable;
