/**
 * @module UTILS
 */

/**
 * Deduplicates the items of the given array (a new array is created).
 * @template {any} T The generic type of the values of the array.
 * @param {Array<T>} $array The array.
 * @returns {Array<T>}
 *
 * @memberof module:UTILS
 */
function deduplicate($array) {

    return Array.from(new Set($array));
}

/**
 * Extracts the given item from the given array.
 * @template {any} T The generic type of the values of the array.
 * @param {T} $item The item to remove.
 * @param {Array<T>} $array The array.
 * @returns {Array<T>}
 *
 * @memberof module:UTILS
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
 * @returns {Promise<number>}
 *
 * @memberof module:UTILS
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
 *
 * @memberof module:UTILS
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
 * @returns {Promise<void>}
 *
 * @memberof module:UTILS
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
 *
 * @memberof module:UTILS
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
