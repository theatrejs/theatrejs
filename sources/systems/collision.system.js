import {AABB, COLLIDERTYPES, Vector2} from '../index.js';

/**
 * Creates collision systems.
 *
 * @example
 *
 * const system = new SystemRender();
 */
class SystemCollision {

    /**
     * @typedef {[import('../index.js').Actor, import('../index.js').Actor]} typepairactor A pair of actors.
     */

    /**
     * Stores the current collision pairs.
     * @type {typepairactor[]}
     * @private
     */
    $current;

    /**
     * Stores the previous collision pairs.
     * @type {typepairactor[]}
     * @private
     */
    $previous;

    /**
     * Creates a new collision system.
     */
    constructor() {

        this.$current = [];
        this.$previous = [];
    }

    /**
     * Checks if a collision previously existed between two given actors.
     * @param {import('../index.js').Actor} $dynamic The first actor to check on.
     * @param {import('../index.js').Actor} $inert The second actor to check with.
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
     * Updates the system by one tick update.
     * @param {import('../index.js').Stage} $stage The stage on which to execute the system.
     * @public
     */
    tick($stage) {

        /**
         * @typedef {Object} typepaircollision A pair of candidates for collision.
         * @property {number} typepaircollision.$distance The manhattan distance between the two actors.
         * @property {import('../index.js').Actor} typepaircollision.$dynamic The first actor.
         * @property {import('../index.js').Actor} typepaircollision.$inert The second actor.
         */

        /**
         * @type {typepaircollision[]}
         */
        const pairs = [];

        /**
         * @type {import('../index.js').Actor[]}
         */
        const dynamics = [];

        /**
         * @type {import('../index.js').Actor[]}
         */
        const kinetics = [];

        /**
         * @type {import('../index.js').Actor[]}
         */
        const statics = [];

        $stage.actors.forEach(($actor) => {

            if ($actor.hasCollider() === false) {

                return;
            }

            switch ($actor.collider.type) {

                case COLLIDERTYPES.DYNAMIC: {

                    dynamics.push($actor);

                    break;
                }

                case COLLIDERTYPES.KINETIC: {

                    kinetics.push($actor);

                    break;
                }

                case COLLIDERTYPES.STATIC: {

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

            const resolverDynamic = new Vector2(

                checkMinimumX ? - directionX * overlapX : 0,
                checkMinimumY ? - directionY * overlapY : 0
            );

            $dynamic.translate(resolverDynamic);

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
