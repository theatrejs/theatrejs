/**
 * Gets the stored data with the given name.
 * @param {string} $name The name of the stored data to get.
 * @returns {any}
 */
export function get($name: string): any;
/**
 * Checks if the storage has data stored with the given name.
 * @param {string} $name The name of the stored data to check.
 * @returns {boolean}
 */
export function has($name: string): boolean;
/**
 * Removes the stored data with the given name.
 * @param {string} $name The name of the stored data to remove.
 */
export function remove($name: string): void;
/**
 * Sets the data to store with the given name.
 * @param {string} $name The name of the data to store.
 * @param {any} $value The value of the data to store.
 */
export function set($name: string, $value: any): void;
