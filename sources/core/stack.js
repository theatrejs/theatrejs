// 'ESLint' configuration
/* global TypeGeneric */

/**
 * Creates stacks.
 * @template {any} TypeGeneric The generic type of the items.
 *
 * @example
 *
 * // without chaining
 * const stack = new Stack();
 * stack.push(bottom);
 * stack.push(middle);
 * stack.push(top);
 *
 * @example
 *
 * // with chaining
 * const stack = new Stack().push(bottom).push(middle).push(top);
 */
class Stack {

    /**
     * Stores the items.
     * @type {Array<TypeGeneric>}
     * @private
     */
    $items;

    /**
     * Creates a new stack.
     */
    constructor() {

        this.$items = [];
    }

    /**
     * Clears the stack.
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

        return this.$items.pop();
    }

    /**
     * Pushes an item.
     * @param {TypeGeneric} $item The item to push.
     * @returns {this}
     * @public
     */
    push($item) {

        this.$items.unshift($item);

        return this;
    }
}

export {

    Stack
};

export default Stack;
