// 'ESLint' configuration
/* global TypeGeneric */

import {AABB, Vector2} from '../index.js';

/**
 * Creates two-dimensional grids.
 * @template {any} TypeGeneric The generic type of the data stored.
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
     * @template {any} TypeGenericMapped The generic type of the mapped data stored.
     * @callback TypeHandlerMap A handler to execute when mapping this grid.
     * @param {object} $parameters The given parameters.
     * @param {TypeGeneric} $parameters.$data The data of the cell.
     * @param {Grid<TypeGenericMapped>} $parameters.$grid The reference grid.
     * @param {Vector2} $parameters.$position The position of the cell.
     * @returns {TypeGenericMapped}
     * @protected
     *
     * @memberof Grid
     */

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
     * @param {TypeGeneric} $parameters.$data The data of the cell.
     * @param {Grid<TypeGeneric>} $parameters.$grid The reference grid.
     * @param {Vector2} $parameters.$position The position of the cell.
     * @param {TypeHandlerTraverseTerminate} $parameters.$terminate Terminates the traversal of the grid.
     * @returns {void}
     * @protected
     *
     * @memberof Grid
     */

    /**
     * @callback TypeWatcherCell A cell changing handler.
     * @param {object} $parameters The given parameters.
     * @param {TypeGeneric} $parameters.$current The current data of the cell.
     * @param {Grid<TypeGeneric>} $parameters.$grid The reference grid.
     * @param {Vector2} $parameters.$position The position of the cell.
     * @param {TypeGeneric} $parameters.$previous The previous data of the cell.
     * @returns {void}
     * @protected
     *
     * @memberof Grid
     */

    /**
     * Stores the grid structure.
     * @type {Map<string, TypeGeneric>}
     * @private
     */
    $grid;

    /**
     * Stores the cell changing handlers.
     * @type {Map<string, Array<TypeWatcherCell>>}
     * @private
     */
    $watchers;

    /**
     * Creates a new two-dimensional grid.
     */
    constructor() {

        this.$grid = new Map();
        this.$watchers = new Map();
    }

    /**
     * Creates a new grid from the given grid.
     * @template {any} TypeGeneric The generic type of the data stored.
     * @param {Grid<TypeGeneric>} $grid The given grid.
     * @returns {Grid<TypeGeneric>}
     * @public
     * @static
     */
    static from($grid) {

        return $grid.clone();
    }

    /**
     * Clears the grid.
     * @returns {this}
     * @public
     */
    clear() {

        this.iterate(({$position}) => {

            this.delete($position);
        });

        this.$grid.clear();

        return this;
    }

    /**
     * Clones the grid.
     * @returns {Grid<TypeGeneric>}
     * @public
     */
    clone() {

        /**
         * @type {Grid<TypeGeneric>}
         */
        const grid = new Grid();

        this.iterate(({$data, $position}) => {

            grid.set($position, $data);
        });

        return grid;
    }

    /**
     * Deletes the data from the given position.
     * @param {Vector2} $position The position to delete the data from.
     * @returns {this}
     * @public
     */
    delete($position) {

        const position = Vector2.serialize($position);
        const previous = this.$grid.get(position);

        this.$grid.delete(position);

        if (this.$watchers.has(position) === true) {

            this.$watchers.get(position).forEach(($handler) => {

                $handler({

                    $current: undefined,
                    $grid: this,
                    $position: $position.clone(),
                    $previous: previous
                });
            });
        }

        return this;
    }

    /**
     * Gets the data from the given position.
     * @param {Vector2} $position The position to get the data from.
     * @returns {TypeGeneric}
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
     * @returns {this}
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

        for (const [$serialized, $data] of Array.from(this.$grid.entries())) {

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

        return this;
    }

    /**
     * Maps this grid data stored to other data (a new grid is created).
     * @template {any} TypeGenericMapped The generic type of the mapped data stored.
     * @param {TypeHandlerMap<TypeGenericMapped>} $handler The handler to execute when mapping this grid.
     * @returns {Grid<TypeGenericMapped>}
     * @public
     */
    map($handler) {

        /**
         * @type {Grid<TypeGenericMapped>}
         */
        const grid = new Grid();

        this.iterate(({$data, $position}) => {

            grid.set($position, $handler({

                $data: $data,
                $grid: grid,
                $position: $position
            }));
        });

        return grid;
    }

    /**
     * Sets the given data to the given position.
     * @param {Vector2} $position The position to set the data to (with integer values).
     * @param {TypeGeneric} $data The data to set.
     * @returns {this}
     * @public
     */
    set($position, $data) {

        const position = Vector2.serialize($position);
        const previous = this.$grid.get(position);

        this.$grid.set(Vector2.serialize($position), $data);

        if (this.$watchers.has(position) === true) {

            this.$watchers.get(position).forEach(($handler) => {

                $handler({

                    $current: $data,
                    $grid: this,
                    $position: $position.clone(),
                    $previous: previous
                });
            });
        }

        return this;
    }

    /**
     * Traverses the given sector applying the given handler.
     * @param {AABB} $aabb The sector to traverse (with integer boundaries).
     * @param {TypeHandlerTraverse} $handler The handler to apply to each cell in the sector.
     * @returns {this}
     * @public
     */
    traverse($aabb, $handler) {

        const xMinimum = $aabb.minimum.x;
        const xMaximum = $aabb.maximum.x;
        const yMinimum = $aabb.minimum.y;
        const yMaximum = $aabb.maximum.y;

        let terminated = Boolean(false);

        /**
         * @type {TypeHandlerTraverseTerminate}
         */
        const terminate = () => {

            terminated = true;
        };

        for (let $x = xMinimum; $x <= xMaximum; $x += 1) {

            for (let $y = yMinimum; $y <= yMaximum; $y += 1) {

                const position = new Vector2($x, $y);

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

        return this;
    }

    /**
     * Removes a watcher of the given cell.
     * @param {Vector2} $position The position of the cell to unwatch.
     * @param {TypeWatcherCell} $handler The cell changing handler to detach.
     * @returns {this}
     * @public
     */
    unwatch($position, $handler) {

        const position = Vector2.serialize($position);

        if (this.$watchers.has(position) === false) {

            return this;
        }

        const watchers = this.$watchers.get(position);

        while (watchers.indexOf($handler) !== -1) {

            watchers.splice(watchers.indexOf($handler), 1);
        }

        return this;
    }

    /**
     * Removes all watchers of the cells.
     * @returns {this}
     * @public
     */
    unwatchAll() {

        this.$watchers.clear();

        return this;
    }

    /**
     * Adds a watcher for the given cell.
     * @param {Vector2} $position The position of the cell to watch.
     * @param {TypeWatcherCell} $handler The cell changing handler to attach.
     * @returns {this}
     * @public
     */
    watch($position, $handler) {

        const position = Vector2.serialize($position);

        if (this.$watchers.has(position) === false) {

            this.$watchers.set(position, []);
        }

        this.$watchers.get(position).push($handler);

        return this;
    }
}

export {

    Grid
};

export default Grid;
