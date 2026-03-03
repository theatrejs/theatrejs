import {BehaviorTreeNode} from '../index.js';

/**
 * Creates behavior trees.
 *
 * @example
 *
 * const first = new BehaviorTreeNodeAction(handler);
 * const second = new BehaviorTreeNodeAction(handler);
 *
 * const selection = new BehaviorTreeNodeSelector([first, second]);
 *
 * const tree = new BehaviorTree(selection);
 *
 * const success = tree.tick(timetick);
 */
class BehaviorTree {

    /**
     * Stores the root node.
     * @type {BehaviorTreeNode}
     * @private
     */
    $node;

    /**
     * Creates a new behavior tree.
     * @param {BehaviorTreeNode} $node The root node.
     */
    constructor($node) {

        this.$node = $node;
    }

    /**
     * Updates the behavior tree by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {boolean}
     * @public
     */
    tick($timetick) {

        return this.$node.tick($timetick);
    }
}

export {

    BehaviorTree
};

export default BehaviorTree;
