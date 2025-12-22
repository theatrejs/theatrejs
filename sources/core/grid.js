// 'ESLint' configuration
/* global TypeGenericData */

import {AABB, Vector2} from '../index.js';

/**
 * Creates two-dimensional grids.
 * @template {any} TypeGenericData The generic type of the data stored.
 *
 * @example
 *
 * const grid = new Grid();
 * grid.set(position, data);
 *
 * grid.traverse(aabb, handler);
 */
class Grid {

    /**
     * @callback TypeHandlerTraverseTerminate A handler to execute when terminating the traversal of the grid.
     * @returns {void}
     * @protected
     *
     * @memberof Grid
     */

    /**
     * @callback TypeHandlerTraverse A handler to execute when traversal a cell.
     * @param {object} $parameters The given parameters.
     * @param {TypeGenericData} $parameters.$data The data of the cell.
     * @param {Grid<TypeGenericData>} $parameters.$grid The reference grid.
     * @param {Vector2} $parameters.$position The position of the cell.
     * @param {TypeHandlerTraverseTerminate} $parameters.$terminate Terminates the traversal of the grid.
     * @returns {void}
     * @protected
     *
     * @memberof Grid
     */

    /**
     * Stores the grid structure.
     * @type {Map<string, TypeGenericData>}
     * @private
     */
    $grid;

    /**
     * Creates a new two-dimensional grid.
     */
    constructor() {

        this.$grid = new Map();
    }

    /**
     * Clears the grid.
     * @returns {this}
     * @public
     */
    clear() {

        this.$grid.clear();

        return this;
    }

    /**
     * Deletes the data from the given position.
     * @param {Vector2} $position The position to delete the data from.
     * @returns {this}
     * @public
     */
    delete($position) {

        this.$grid.delete(Vector2.serialize($position));

        return this;
    }

    /**
     * Gets the data from the given position.
     * @param {Vector2} $position The position to get the data from.
     * @returns {TypeGenericData}
     * @public
     */
    get($position) {

        return this.$grid.get(Vector2.serialize($position));
    }

    /**
     * Checks if the given position stores any data.
     * @param {Vector2} $position The given position to check.
     * @returns {boolean}
     * @public
     */
    has($position) {

        return this.$grid.has(Vector2.serialize($position)) === true;
    }

    /**
     * Iterates through the grid applying the given handler.
     * @param {TypeHandlerTraverse} $handler The handler to apply to each cell in the sector.
     * @public
     */
    iterate($handler) {

        let terminated = Boolean(false);

        /**
         * @type {TypeHandlerTraverseTerminate}
         */
        const terminate = () => {

            terminated = true;
        };

        const entries = [...this.$grid.entries()];

        for (const [$serialized, $data] of entries) {

            const position = Vector2.deserialize($serialized);

            $handler({

                $data: $data,
                $grid: this,
                $position: position,
                $terminate: terminate
            });

            if (terminated === true) {

                break;
            }
        }
    }

    /**
     * Sets the given data to the given position.
     * @param {Vector2} $position The position to set the data to (with integer values).
     * @param {TypeGenericData} $data The data to set.
     * @returns {this}
     * @public
     */
    set($position, $data) {

        this.$grid.set(Vector2.serialize($position), $data);

        return this;
    }

    /**
     * Traverses the given sector applying the given handler.
     * @param {AABB} $aabb The sector to traverse (with integer boundaries).
     * @param {TypeHandlerTraverse} $handler The handler to apply to each cell in the sector.
     * @public
     */
    traverse($aabb, $handler) {

        const minimumX = $aabb.minimum.x;
        const minimumY = $aabb.minimum.y;
        const maximumX = $aabb.maximum.x;
        const maximumY = $aabb.maximum.y;

        let terminated = Boolean(false);

        /**
         * @type {TypeHandlerTraverseTerminate}
         */
        const terminate = () => {

            terminated = true;
        };

        for (let x = minimumX; x <= maximumX; x += 1) {

            for (let y = minimumY; y <= maximumY; y += 1) {

                const position = new Vector2(x, y);

                $handler({

                    $data: this.get(position),
                    $grid: this,
                    $position: position,
                    $terminate: terminate
                });

                if (terminated === true) {

                    break;
                }
            }

            if (terminated === true) {

                break;
            }
        }
    }
}

export {

    Grid
};

export default Grid;
