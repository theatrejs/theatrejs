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
    $data;

    /**
     * Creates a new stack.
     */
    constructor() {

        this.$data = [];
    }

    /**
     * Clears the stack.
     * @returns {this}
     * @public
     */
    clear() {

        this.$data = [];

        return this;
    }

    /**
     * Pops an item.
     * @returns {(TypeGeneric | undefined)}
     * @public
     */
    pop() {

        return this.$data.pop();
    }

    /**
     * Pushes an item.
     * @param {TypeGeneric} $item The item to push.
     * @returns {this}
     * @public
     */
    push($item) {

        this.$data.unshift($item);

        return this;
    }
}

export {

    Stack
};

export default Stack;
