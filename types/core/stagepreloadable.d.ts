export default StagePreloadable;
/**
 * Factores a stage with preloadable assets.
 * @param {(string | typeof import('../index.js').Actor)[]} $preloadables The preloadable assets (mix of preloadable assets and/or actors with preloadable assets).
 * @returns {typeof import('../index.js').Stage}
 */
export function StagePreloadable($preloadables?: (string | typeof import("../index.js").Actor)[]): typeof import("../index.js").Stage;
