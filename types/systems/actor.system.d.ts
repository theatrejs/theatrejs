export default SystemActor;
/**
 * Creates actor systems.
 *
 * @example
 *
 * const system = new SystemActor();
 * system.tick({$stage, $timetick});
 */
export class SystemActor {
    /**
     * Updates the system by one tick update.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Stage} $parameters.$stage The stage on which to execute the system.
     * @param {number} $parameters.$timetick The tick duration (in ms).
     * @public
     */
    public tick({ $stage, $timetick }: {
        $stage: import("../index.js").Stage;
        $timetick: number;
    }): void;
}
