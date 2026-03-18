import {BehaviorTreeNode} from '../index.js';

/**
 * Creates behavior tree sequencer nodes.
 *
 * @example
 *
 * const first = new BehaviorTreeNodeAction(handler);
 * const second = new BehaviorTreeNodeAction(handler);
 *
 * const sequence = new BehaviorTreeNodeSequencer(node);
 *
 * const tree = new BehaviorTree(sequence);
 *
 * const success = tree.tick(timetick);
 */
class BehaviorTreeNodeSequencer extends BehaviorTreeNode {

    /**
     * Stores the nodes.
     * @type {Array<BehaviorTreeNode>}
     * @private
     */
    $nodes;

    /**
     * Creates a new behavior tree sequencer node.
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

        for (const $node of this.$nodes) {

            if ($node.tick($timetick) === false) {

                return false;
            }
        }

        return true;
    }
}

export {

    BehaviorTreeNodeSequencer
};

export default BehaviorTreeNodeSequencer;
