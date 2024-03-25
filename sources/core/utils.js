/**
 * Deduplicates the items of the given array (a new array is created).
 * @template T
 * @param {Array<T>} $array The array
 * @returns {Array<T>}
 */
function deduplicate($array) {

    return Array.from(new Set($array));
}

/**
 * Gets a new UUID.
 * @returns {string}
 */
function uuid() {

    return window.crypto.randomUUID();
}

export {

    deduplicate,
    uuid
};
