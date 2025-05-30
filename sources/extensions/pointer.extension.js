import {EVENT_CODES, EVENT_TYPES, EventPointerAnalog, EventPointerDigital} from '../index.js';

/**
 * Creates pointer extensions.
 *
 * @example
 *
 * ExtensionPointer.activate($container);
 */
class ExtensionPointer {

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores the container.
     * @type {HTMLElement}
     * @private
     */
    $container;

    /**
     * Stores the pointer state.
     * @type {boolean}
     * @private
     */
    $statePointer;

    /**
     * Creates a new pointer extension.
     * @param {HTMLElement} $container The container on which to attach the extension.
     * @protected
     */
    constructor($container) {

        this.$container = $container;

        this.$statePointer = false;

        window.addEventListener(EVENT_TYPES.NATIVE.BLUR, this.$onBlur.bind(this));

        this.$container.addEventListener(EVENT_TYPES.POINTER.POINTER_DOWN, this.$onPointerDown.bind(this));
        this.$container.addEventListener(EVENT_TYPES.POINTER.POINTER_LEAVE, this.$onPointerLeave.bind(this));
        this.$container.addEventListener(EVENT_TYPES.POINTER.POINTER_MOVE, this.$onPointerMove.bind(this));
        this.$container.addEventListener(EVENT_TYPES.POINTER.POINTER_UP, this.$onPointerUp.bind(this));
    }

    /**
     * Activates the extension.
     * @param {HTMLElement} [$container] The container on which to attach the extension.
     * @public
     * @static
     */
    static activate($container = document.body) {

        if (ExtensionPointer.$activated === true) {

            return;
        }

        new ExtensionPointer($container);

        ExtensionPointer.$activated = true;
    }

    /**
     * Called when the focus is lost.
     * @private
     */
    $onBlur() {

        if (this.$statePointer === false) {

            return;
        }

        this.$statePointer = false;

        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_UP, EVENT_CODES.POINTER.POINT));
        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_UP, EVENT_CODES.POINTER.POSITION));
    }

    /**
     * Called when the pointer is down.
     * @param {PointerEvent} $event The native pointer down event.
     * @private
     */
    $onPointerDown($event) {

        if (this.$statePointer === true) {

            return;
        }

        this.$statePointer = true;

        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_DOWN, EVENT_CODES.POINTER.POINT));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_X, 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_Y, 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }

    /**
     * Called when the pointer has left.
     * @param {PointerEvent} $event The native pointer up event.
     * @private
     */
    $onPointerLeave($event) {

        if (this.$statePointer === false) {

            return;
        }

        this.$statePointer = false;

        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_UP, EVENT_CODES.POINTER.POINT));
        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_UP, EVENT_CODES.POINTER.POSITION));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_X, 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_Y, 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }

    /**
     * Called when the pointer has moved.
     * @param {PointerEvent} $event The native pointer move event.
     * @private
     */
    $onPointerMove($event) {

        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_DOWN, EVENT_CODES.POINTER.POSITION));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_X, 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_Y, 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }

    /**
     * Called when the pointer is up.
     * @param {PointerEvent} $event The native pointer up event.
     * @private
     */
    $onPointerUp($event) {

        if (this.$statePointer === false) {

            return;
        }

        this.$statePointer = false;

        window.dispatchEvent(new EventPointerDigital(EVENT_TYPES.POINTER.POINTER_UP, EVENT_CODES.POINTER.POINT));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_X, 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog(EVENT_TYPES.POINTER.POINTER_ANALOG, EVENT_CODES.POINTER.POSITION_Y, 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }
}

export {

    ExtensionPointer
};

export default ExtensionPointer;
