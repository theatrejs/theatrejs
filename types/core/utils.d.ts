/**
 * Deduplicates the items of the given array (a new array is created).
 * @template T
 * @param {T[]} $array The array.
 * @returns {T[]}
 */
export function deduplicate<T>($array: T[]): T[];
/**
 * Extracts the given item from the given array.
 * @template T
 * @param {T} $item The item to remove.
 * @param {T[]} $array The array.
 * @returns {T[]}
 */
export function extract<T>($item: T, $array: T[]): T[];
/**
 * Resolves when the browser is ready to perform an animation frame request.
 * @returns Promise<void>
 */
export function frame(): Promise<number>;
/**
 * Resolves when the user has interacted at least once since page load.
 * @returns {Promise<void>}
 */
export function ready(): Promise<void>;
/**
 * Resolves when the given delay has passed.
 * @param {number} $delay The delay (in ms).
 * @returns Promise<void>
 */
export function sleep($delay: number): Promise<void>;
/**
 * Gets a new UUID.
 * @returns {string}
 */
export function uuid(): string;
