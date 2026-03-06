// 'ESLint' configuration
/* global TypeGeneric */

/**
 * Creates Event Buses.
 * @template {string} [TypeGeneric=string] The generic type of the events.
 *
 * @example
 *
 * const eventbus = new EventBus();
 *
 * eventbus.trigger(EVENT);
 *
 * eventbus.listen(EVENT, handler);
 */
class EventBus {

    /**
     * @callback TypeListener An event listener.
     * @param {TypeGeneric} $event The event to listen.
     * @protected
     *
     * @memberof Actor
     */

    /**
     * Stores the event listeners.
     * @type {Object<string, Array<TypeListener>>}
     * @private
     */
    $listeners;

    /**
     * Creates a new event bus.
     */
    constructor() {

        this.$listeners = {};
    }

    /**
     * Listens an event.
     * @param {TypeGeneric} $event The event to listen.
     * @param {TypeListener} $handler The listener to add.
     * @returns {this}
     * @public
     */
    listen($event, $handler) {

        if (Object.hasOwn(this.$listeners, $event) === false) {

            this.$listeners[$event] = [];
        }

        this.$listeners[$event].push($handler);

        return this;
    }

    /**
     * Triggers an event.
     * @param {TypeGeneric} $event The event to trigger.
     * @returns {this}
     * @public
     */
    trigger($event) {

        if (Object.hasOwn(this.$listeners, $event) === false) {

            return this;
        }

        this.$listeners[$event].forEach(($handler) => {

            $handler($event);
        });

        return this;
    }
}

export {

    EventBus
};

export default EventBus;
