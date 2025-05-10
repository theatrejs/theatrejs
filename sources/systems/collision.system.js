import {AABB, Actor, COLLIDER_TYPES, Stage, System, Vector2} from '../index.js';

/**
 * Creates collision systems.
 *
 * @example
 *
 * const system = new SystemCollision();
 */
class SystemCollision extends System {

    /**
     * @typedef {Array<Actor>} TypePairActor A pair of actors.
     * @private
     */

    /**
     * Stores the current collision pairs.
     * @type {Array<TypePairActor>}
     * @private
     */
    $current;

    /**
     * Stores the previous collision pairs.
     * @type {Array<TypePairActor>}
     * @private
     */
    $previous;

    /**
     * Creates a new collision system.
     */
    constructor() {

        super();
    }

    /**
     * Checks if a collision previously existed between two given actors.
     * @param {Actor} $dynamic The first actor to check on.
     * @param {Actor} $inert The second actor to check with.
     * @returns {boolean}
     * @private
     */
    $hasCollisionPrevious($dynamic, $inert) {

        const result = this.$previous.find(([$dynamicPrevious, $inertPrevious]) => {

            return $dynamic === $dynamicPrevious
            && $inert === $inertPrevious;
        });

        return typeof result !== 'undefined';
    }

    /**
     * Called when the system is being initiated.
     * @public
     */
    onInitiate() {

        this.$current = [];
        this.$previous = [];
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage}) {

        /**
         * @typedef {Object} TypePairCollision A pair of candidates for collision.
         * @property {number} TypePairCollision.$distance The manhattan distance between the two actors.
         * @property {Actor} TypePairCollision.$dynamic The first actor.
         * @property {Actor} TypePairCollision.$inert The second actor.
         * @private
         */

        /**
         * @type {Array<TypePairCollision>}
         */
        const pairs = [];

        /**
         * @type {Array<Actor>}
         */
        const dynamics = [];

        /**
         * @type {Array<Actor>}
         */
        const kinetics = [];

        /**
         * @type {Array<Actor>}
         */
        const statics = [];

        $stage.actors.forEach(($actor) => {

            if ($actor.hasCollider() === false) {

                return;
            }

            switch ($actor.collider.type) {

                case COLLIDER_TYPES.DYNAMIC: {

                    dynamics.push($actor);

                    break;
                }

                case COLLIDER_TYPES.KINETIC: {

                    kinetics.push($actor);

                    break;
                }

                case COLLIDER_TYPES.STATIC: {

                    statics.push($actor);

                    break;
                }
            }
        });

        const inerts = [...statics, ...kinetics];

        if (inerts.length === 0) {

            return;
        }

        dynamics.forEach(($dynamic) => {

            const boundariesDynamic = $dynamic.collider.boundaries.clone().translate($dynamic.translation);
            const centerBoundariesDynamic = new AABB(boundariesDynamic.center, boundariesDynamic.center);

            inerts.forEach(($inert) => {

                const boundariesInert = $inert.collider.boundaries.clone().translate($inert.translation);

                const distance = AABB.distanceManhattan(centerBoundariesDynamic, boundariesInert);

                pairs.push({

                    $distance: distance,
                    $dynamic: $dynamic,
                    $inert: $inert
                });
            });
        });

        pairs.sort(($a, $b) => {

            return $a.$distance - $b.$distance;
        });

        pairs.forEach(($pair) => {

            const {$dynamic, $inert} = $pair;

            if ($stage.hasActor($dynamic) === false) {

                return;
            }

            if ($stage.hasActor($inert) === false) {

                return;
            }

            const boundariesDynamic = $dynamic.collider.boundaries.clone().translate($dynamic.translation);
            const boundariesInert = $inert.collider.boundaries.clone().translate($inert.translation);

            const overlapX = AABB.overlapX(boundariesDynamic, boundariesInert);

            if (overlapX <= 0) {

                return;
            }

            const overlapY = AABB.overlapY(boundariesDynamic, boundariesInert);

            if (overlapY <= 0) {

                return;
            }

            this.$current.push([$dynamic, $inert]);

            const directionX = Math.sign($inert.translation.x - $dynamic.translation.x);
            const directionY = Math.sign($inert.translation.y - $dynamic.translation.y);

            const checkMinimumX = (overlapX <= overlapY);
            const checkMinimumY = (overlapY <= overlapX);

            if ($dynamic.collider.traversable === false
            && $inert.collider.traversable === false) {

                const resolverDynamic = new Vector2(

                    checkMinimumX ? - directionX * overlapX : 0,
                    checkMinimumY ? - directionY * overlapY : 0
                );

                $dynamic.translate(resolverDynamic);
            }

            const originDynamicEast = checkMinimumX === true && directionX === 1;
            const originDynamicNorth = checkMinimumY === true && directionY === 1;
            const originDynamicSouth = checkMinimumY === true && directionY === -1;
            const originDynamicWest = checkMinimumX === true && directionX === -1;

            if (this.$hasCollisionPrevious($dynamic, $inert) === false) {

                $dynamic.onCollideEnter({

                    $actor: $inert,
                    $east: originDynamicEast,
                    $north: originDynamicNorth,
                    $south: originDynamicSouth,
                    $west: originDynamicWest
                });

                $inert.onCollideEnter({

                    $actor: $dynamic,
                    $east: originDynamicWest,
                    $north: originDynamicSouth,
                    $south: originDynamicNorth,
                    $west: originDynamicEast
                });
            }

            $dynamic.onCollide({

                $actor: $inert,
                $east: originDynamicEast,
                $north: originDynamicNorth,
                $south: originDynamicSouth,
                $west: originDynamicWest
            });

            $inert.onCollide({

                $actor: $dynamic,
                $east: originDynamicWest,
                $north: originDynamicSouth,
                $south: originDynamicNorth,
                $west: originDynamicEast
            });
        });

        this.$previous.filter(([$dynamicPrevious, $inertPrevious]) => {

            const result = this.$current.find(([$dynamic, $inert]) => {

                return $dynamic === $dynamicPrevious
                && $inert === $inertPrevious;
            });

            return typeof result === 'undefined';

        }).forEach(([$dynamicPrevious, $inertPrevious]) => {

            $dynamicPrevious.onCollideLeave($inertPrevious);
            $inertPrevious.onCollideLeave($dynamicPrevious);
        });

        this.$previous = [...this.$current];
        this.$current = [];
    }
}

export {

    SystemCollision
};

export default SystemCollision;
