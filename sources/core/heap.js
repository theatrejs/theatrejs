// 'ESLint' configuration
/* global TypeGeneric */

/**
 * Creates heaps.
 * @template {any} TypeGeneric The generic type of the items.
 *
 * @example
 *
 * // without chaining
 * const heap = new Heap(compare);
 * heap.push(four);
 * heap.push(one);
 * heap.push(two);
 *
 * const maximum = heap.pop();
 *
 * @example
 *
 * // with chaining
 * const heap = new Heap(compare).push(four).push(one).push(two);
 *
 * const maximum = heap.pop();
 */
class Heap {

    /**
     * @template {any} TypeGeneric The generic type of the items.
     * @callback TypeHandlerCompare A handler to use to compare the two given items.
     * @param {TypeGeneric} $a The first item to compare.
     * @param {TypeGeneric} $b The second item to compare.
     * @returns {number}
     * @protected
     *
     * @memberof Heap
     */

    /**
     * Stores the compare handler.
     * @type {TypeHandlerCompare<TypeGeneric>}
     * @private
     */
    $compare;

    /**
     * Stores the items.
     * @type {Array<TypeGeneric>}
     * @private
     */
    $items;

    /**
     * Gets the size of the heap.
     * @type {number}
     * @public
     */
    get size() {

        return this.$items.length;
    }

    /**
     * Creates a new heap.
     * @param {TypeHandlerCompare<TypeGeneric>} $compare The compare handler.
     */
    constructor($compare) {

        this.$compare = $compare;

        this.$items = [];
    }

    /**
     * Shifts down an item from its given index.
     * @param {number} [$index] The index of the item to shift down.
     * @private
     */
    $shiftDown($index = 0) {

        const left = ($index * 2) + 1;
        const right = ($index * 2) + 2;

        let best = $index;

        if (left < this.$items.length
        && this.$compare(this.$items[best], this.$items[left]) > 0) {

            best = left;
        }

        if (right < this.$items.length
        && this.$compare(this.$items[best], this.$items[right]) > 0) {

            best = right;
        }

        if (best === $index) {

            return;
        }

        this.$swap($index, best);

        this.$shiftDown(best);
    }

    /**
     * Shifts up the last item.
     * @private
     */
    $shiftUp() {

        let index = this.$items.length - 1;

        while (index > 0) {

            const parent = Math.floor((index - 1) / 2);

            if (this.$compare(this.$items[index], this.$items[parent]) >= 0) {

                break;
            }

            this.$swap(index, parent);

            index = parent;
        }
    }

    /**
     * Swaps items at the two given indices.
     * @param {number} $a The index of the first item to swap.
     * @param {number} $b The index of the second item to swap.
     * @private
     */
    $swap($a, $b) {

        [this.$items[$a], this.$items[$b]] = [this.$items[$b], this.$items[$a]];
    }

    /**
     * Pops an item.
     * @returns {(TypeGeneric | undefined)}
     * @public
     */
    pop() {

        if (this.$items.length === 0) {

            return undefined;
        }

        if (this.$items.length === 1) {

            return this.$items.pop();
        }

        this.$swap(0, this.$items.length - 1);

        const best = this.$items.pop();

        this.$shiftDown();

        return best;
    }

    /**
     * Pushes an item.
     * @param {TypeGeneric} $item The item to push.
     * @returns {this}
     * @public
     */
    push($item) {

        this.$items.push($item);

        this.$shiftUp();

        return this;
    }
}

export {

    Heap
};

export default Heap;
