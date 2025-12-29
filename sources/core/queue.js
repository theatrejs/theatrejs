// 'ESLint' configuration
/* global TypeGeneric */

/**
 * Creates queues.
 * @template {any} TypeGeneric The generic type of the items.
 *
 * @example
 *
 * // without chaining
 * const queue = new Queue();
 * queue.push(top);
 * queue.push(middle);
 * queue.push(bottom);
 *
 * @example
 *
 * // with chaining
 * const queue = new Queue().push(top).push(middle).push(bottom);
 */
class Queue {

    /**
     * Stores the items.
     * @type {Array<TypeGeneric>}
     * @private
     */
    $items;

    /**
     * Creates a new queue.
     */
    constructor() {

        this.$items = [];
    }

    /**
     * Clears the queue.
     * @returns {this}
     * @public
     */
    clear() {

        this.$items = [];

        return this;
    }

    /**
     * Pops an item.
     * @returns {(TypeGeneric | undefined)}
     * @public
     */
    pop() {

        return this.$items.shift();
    }

    /**
     * Pushes an item.
     * @param {TypeGeneric} $item The item to push.
     * @returns {this}
     * @public
     */
    push($item) {

        this.$items.push($item);

        return this;
    }
}

export {

    Queue
};

export default Queue;
