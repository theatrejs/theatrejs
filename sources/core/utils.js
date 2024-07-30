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

        return [];
    }

    return $array.splice(index, 1);
}

/**
 * Resolves when the user has interacted at least once since page load.
 * @returns {Promise<void>}
 */
function ready() {

    /**
     * @type {Promise<void>}
     */
    const promise = new Promise(($resolve) => {

        /**
         * @type {number}
         */
        let id;

        const check = () => {

            if (navigator.userActivation.hasBeenActive === false) {

                id = window.requestAnimationFrame(check);

                return;
            }

            window.cancelAnimationFrame(id);

            $resolve();
        };

        id = window.requestAnimationFrame(check);
    });

    return promise;
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
    ready,
    uuid
};
