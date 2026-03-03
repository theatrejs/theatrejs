import {BehaviorTreeNode} from '../index.js';

/**
 * Creates behavior tree selector nodes.
 *
 * @example
 *
 * const first = new BehaviorTreeNodeAction(handler);
 * const second = new BehaviorTreeNodeAction(handler);
 *
 * const selection = new BehaviorTreeNodeSelector(node);
 *
 * const tree = new BehaviorTree(selection);
 *
 * const success = tree.tick(timetick);
 */
class BehaviorTreeNodeSelector extends BehaviorTreeNode {

    /**
     * Stores the nodes.
     * @type {Array<BehaviorTreeNode>}
     * @private
     */
    $nodes;

    /**
     * Creates a new behavior tree selector node.
     * @param {Array<BehaviorTreeNode>} $nodes The nodes.
     */
    constructor($nodes) {

        super();

        this.$nodes = [...$nodes];
    }

    /**
     * Updates the behavior tree by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {boolean}
     * @public
     */
    tick($timetick) {

        for (const node of this.$nodes) {

            if (node.tick($timetick) === true) {

                return true;
            }
        }

        return false;
    }
}

export {

    BehaviorTreeNodeSelector
};

export default BehaviorTreeNodeSelector;
