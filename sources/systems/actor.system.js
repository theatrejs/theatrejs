/**
 * Static actor system.
 *
 * @example
 *
 * SystemActor.tick({
 *
 *     $stage: StageExample,
 *     $timetick: timetick
 * });
 */
class SystemActor {

    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Stage} $parameters.$stage The stage on which to exectute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     * @static
     */
    static tick({$stage, $timetick}) {

        $stage.actors.forEach(($actor) => {

            $actor.onTick($timetick);
        });
    }
}

export {

    SystemActor
};

export default SystemActor;
