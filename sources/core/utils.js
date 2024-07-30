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
 * Resolves when the browser is ready to perform an animation frame request.
 * @returns Promise<void>
 */
function frame() {

    /**
     * @type {Promise<number>}
     */
    const promise = new Promise(($resolve) => {

        window.requestAnimationFrame($resolve);
    });

    return promise;
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
 * Resolves when the given delay has passed.
 * @param {number} $delay The delay (in ms).
 * @returns Promise<void>
 */
function sleep($delay) {

    /**
     * @type {Promise<void>}
     */
    const promise = new Promise(($resolve) => {

        window.setTimeout($resolve, $delay);
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
    frame,
    ready,
    sleep,
    uuid
};
