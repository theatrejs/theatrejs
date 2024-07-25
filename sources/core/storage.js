/**
 * Gets the stored data with the given name.
 * @param {string} $name The name of the stored data to get.
 * @returns {any}
 */
function get($name) {

    const value = window.localStorage.getItem($name);

    if (value === null) {

        return undefined;
    }

    return JSON.parse(value);
}

/**
 * Checks if the storage has data stored with the given name.
 * @param {string} $name The name of the stored data to check.
 * @returns {boolean}
 */
function has($name) {

    const value = window.localStorage.getItem($name);

    if (value === null) {

        return false;
    }

    return true;
}

/**
 * Removes the stored data with the given name.
 * @param {string} $name The name of the stored data to remove.
 */
function remove($name) {

    window.localStorage.removeItem($name);
}

/**
 * Sets the data to store with the given name.
 * @param {string} $name The name of the data to store.
 * @param {any} $value The value of the data to store.
 */
function set($name, $value) {

    const value = JSON.stringify($value);

    if (typeof value === 'undefined') {

        return;
    }

    window.localStorage.setItem($name, value);
}

export {

    get,
    has,
    remove,
    set
};
