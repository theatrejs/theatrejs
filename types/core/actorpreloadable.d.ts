export default ActorPreloadable;
/**
 * Factores an actor with preloadable assets.
 * @param {string[]} $preloadables The preloadable assets.
 * @returns {typeof import('../index.js').Actor}
 */
export function ActorPreloadable($preloadables?: string[]): typeof import("../index.js").Actor;
