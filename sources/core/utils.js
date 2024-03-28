/**
 * Deduplicates the items of the given array (a new array is created).
 * @template T
 * @param {T[]} $array The array.
 * @returns {T[]}
 */
function deduplicate($array) {

    return Array.from(new Set($array));
}

/**
 * Extracts the given item from the given array.
 * @template T
 * @param {T} $item The item to remove.
 * @param {T[]} $array The array.
 * @returns {T[]}
 */
function extract($item, $array) {

    const index = $array.indexOf($item);

    if (index === -1) {

        return $array;
    }

    return $array.splice(index, 1);
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
    extract,
    uuid
};
