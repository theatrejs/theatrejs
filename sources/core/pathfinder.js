import {Grid, Heap, UTILS, Vector2} from '../index.js';

/**
 * Creates pathfinders.
 *
 * @example
 *
 * // minimal
 * const pathfinder = new Pathfinder();
 *
 * const path = pathfinder.find({
 *
 *     $access: accessor,
 *     $finish: new Vector2(2, 0),
 *     $grid: grid,
 *     $start: new Vector2(-2, 0)
 * });
 *
 * // full
 * const pathfinder = new Pathfinder(heuristic);
 *
 * const path = pathfinder.find({
 *
 *     $access: accessor,
 *     $finish: new Vector2(2, 0),
 *     $grid: grid,
 *     $start: new Vector2(-2, 0)
 * });
 */
class Pathfinder {

    /**
     * @template {any} TypeGeneric The generic type of the items.
     * @callback TypeAccessor An accessor to the cost of a cell.
     * @param {TypeGeneric} $item The item.
     * @returns {number}
     * @protected
     *
     * @memberof Pathfinder
     */

    /**
     * @callback TypeHeuristic A heuristic to use during a pathfinding.
     * @param {Vector2} $a The position of the first cell to compare.
     * @param {Vector2} $b The position of the second cell to compare.
     * @returns {number}
     * @protected
     *
     * @memberof Pathfinder
     */

    /**
     * @typedef {object} TypeNode A pathfinder node.
     * @property {number} $cost The current cost.
     * @property {number} $heuristic The heuristic cost.
     * @property {TypeNode} [$parent] The parent node.
     * @property {Vector2} $position The position.
     * @protected
     *
     * @memberof Pathfinder
     */

    /**
     * Stores the heuristic function.
     * @type {TypeHeuristic}
     * @private
     */
    $heuristic;

    /**
     * Creates a new pathfinder.
     * @param {TypeHeuristic} $heuristic The heuristic function to use.
     */
    constructor($heuristic = Vector2.distanceManhattan) {

        this.$heuristic = $heuristic;
    }

    /**
     * Gets the shortest path between the positions of the two given cells of the given weighted grid.
     * @template {any} TypeGeneric The generic type of the items.
     * @param {object} $parameters The given parameters.
     * @param {TypeAccessor<TypeGeneric>} $parameters.$access The accessor to the cost of a cell.
     * @param {Vector2} $parameters.$finish The position of the 'finish' cell.
     * @param {Grid<TypeGeneric>} $parameters.$grid The weighted grid.
     * @param {Vector2} $parameters.$start The position of the 'start' cell.
     * @returns {Array<Vector2>}
     * @public
     */
    find({$access, $finish, $grid, $start}) {

        if ($grid.has($start) === false) {

            return [];
        }

        if ($grid.has($finish) === false) {

            return [];
        }

        if ($finish.equal($start) === true) {

            return [$finish.clone()];
        }

        /**
         * @type {Heap<TypeNode>}
         */
        const open = new Heap(($a, $b) => {

            const a = $a.$cost + $a.$heuristic;
            const b = $b.$cost + $b.$heuristic;

            if (a === b) {

                return $a.$heuristic - $b.$heuristic;
            }

            return a - b;
        });

        open.push({

            $cost: 0,
            $heuristic: this.$heuristic($start, $finish),
            $position: $start.clone()
        });

        const closed = new Set();

        while (open.size > 0) {

            const current = open.pop();
            const key = Vector2.serialize(current.$position);

            if (closed.has(key) === true) {

                continue;
            }

            if (current.$position.equal($finish) === true) {

                const path = [];

                let node = current;

                while (typeof node !== 'undefined') {

                    path.unshift(node.$position.clone());

                    node = node.$parent;
                }

                return path;
            }

            closed.add(key);

            const neighbors = UTILS.shuffle([

                new Vector2(-1, 0),
                new Vector2(1, 0),
                new Vector2(0, -1),
                new Vector2(0, 1)
            ]);

            neighbors.forEach(($position) => {

                const position = $position.add(current.$position);

                if ($grid.has(position) === false) {

                    return;
                }

                const key = Vector2.serialize(position);

                if (closed.has(key) === true) {

                    return;
                }

                open.push({

                    $cost: current.$cost + $access($grid.get(position)),
                    $heuristic: this.$heuristic(position, $finish),
                    $parent: current,
                    $position: position
                });
            });
        }

        return [];
    }
}

export {

    Pathfinder
};

export default Pathfinder;
