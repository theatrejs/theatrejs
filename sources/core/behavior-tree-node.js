/**
 * Abstract behavior tree nodes.
 *
 * @example
 *
 * class BehaviorTreeNodeExample extends BehaviorTreeNode {}
 */
class BehaviorTreeNode {

    /**
     * Creates a new behavior tree node.
     * @protected
     */
    constructor() {}

    /**
     * Updates the behavior tree by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {boolean}
     * @public
     */
    tick($timetick) {

        void $timetick;

        return false;
    }
}

export {

    BehaviorTreeNode
};

export default BehaviorTreeNode;
