import {EventPointerAnalog, EventPointerDigital} from '../index.js';

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

        window.addEventListener('blur', this.$onPointerblur.bind(this));

        this.$container.addEventListener('pointerdown', this.$onPointerDown.bind(this));
        this.$container.addEventListener('pointerleave', this.$onPointerLeave.bind(this));
        this.$container.addEventListener('pointermove', this.$onPointerMove.bind(this));
        this.$container.addEventListener('pointerup', this.$onPointerUp.bind(this));
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
     * Called when the pointer has left.
     * @private
     */
    $onPointerblur() {

        if (this.$statePointer === false) {

            return;
        }

        this.$statePointer = false;

        window.dispatchEvent(new EventPointerDigital('pointerup', 'Point'));
        window.dispatchEvent(new EventPointerDigital('pointerup', 'Position'));
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

        window.dispatchEvent(new EventPointerDigital('pointerdown', 'Point'));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionX', 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionY', 2 * ($event.offsetY / this.$container.clientHeight) - 1));
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

        window.dispatchEvent(new EventPointerDigital('pointerup', 'Point'));
        window.dispatchEvent(new EventPointerDigital('pointerup', 'Position'));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionX', 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionY', 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }

    /**
     * Called when the pointer has moved.
     * @param {PointerEvent} $event The native pointer move event.
     * @private
     */
    $onPointerMove($event) {

        window.dispatchEvent(new EventPointerDigital('pointerdown', 'Position'));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionX', 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionY', 2 * ($event.offsetY / this.$container.clientHeight) - 1));
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

        window.dispatchEvent(new EventPointerDigital('pointerup', 'Point'));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionX', 2 * ($event.offsetX / this.$container.clientWidth) - 1));
        window.dispatchEvent(new EventPointerAnalog('pointeranalog', 'PositionY', 2 * ($event.offsetY / this.$container.clientHeight) - 1));
    }
}

export {

    ExtensionPointer
};

export default ExtensionPointer;
