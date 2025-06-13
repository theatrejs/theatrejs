import {Stage, System} from '../index.js';

/**
 * Creates actor systems.
 *
 * @example
 *
 * const system = new SystemActor();
 * system.tick({$stage, $timetick});
 */
class SystemActor extends System {

    /**
     * Creates a new actor system.
     */
    constructor() {

        super();
    }

    /**
     * Called when the system is being updated by one tick update.
     * @param {object} $parameters The given parameters.
     * @param {Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    onTick({$stage, $timetick}) {

        $stage.actors.forEach(($actor) => {

            $actor.onTick($timetick);
        });
    }
}

export {

    SystemActor
};

export default SystemActor;
