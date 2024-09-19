import {Stage} from '../index.js';

/**
 * Creates actor systems.
 *
 * @example
 *
 * const system = new SystemActor();
 * system.tick({$stage, $timetick});
 */
class SystemActor {

    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    tick({$stage, $timetick}) {

        $stage.actors.forEach(($actor) => {

            $actor.onTick($timetick);
        });
    }
}

export {

    SystemActor
};

export default SystemActor;
