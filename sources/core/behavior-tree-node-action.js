import {BehaviorTreeNode} from '../index.js';

/**
 * Creates behavior tree action nodes.
 *
 * @example
 *
 * const action = new BehaviorTreeNodeAction(handler);
 *
 * const tree = new BehaviorTree(action);
 *
 * const success = tree.tick(timetick);
 */
class BehaviorTreeNodeAction extends BehaviorTreeNode {

    /**
     * @callback TypeHandlerAction A behavior tree action node handler.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {boolean}
     * @protected
     *
     * @memberof BehaviorTreeNodeAction
     */

    /**
     * Stores the handler.
     * @type {TypeHandlerAction}
     * @private
     */
    $handler;

    /**
     * Creates a new behavior tree action node.
     * @param {TypeHandlerAction} $handler The handler.
     */
    constructor($handler) {

        super();

        this.$handler = $handler;
    }

    /**
     * Updates the behavior tree by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @returns {boolean}
     * @public
     */
    tick($timetick) {

        return this.$handler($timetick);
    }
}

export {

    BehaviorTreeNodeAction
};

export default BehaviorTreeNodeAction;
