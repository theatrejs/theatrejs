// 'ESLint' configuration
/* global GravitySensor */

import {EVENT_CODES, EVENT_TYPES, EventGravityAnalog, EventGravityDigital, Vector3} from '../index.js';

/**
 * The ordered list of the gravity event codes.
 * @type {Array<Array<string>>}
 * @constant
 * @private
 */
const $GRAVITY_DIRECTIONS = [

    [EVENT_CODES.GRAVITY.DIRECTION_X_NEGATIVE, EVENT_CODES.GRAVITY.DIRECTION_X_POSITIVE],
    [EVENT_CODES.GRAVITY.DIRECTION_Y_NEGATIVE, EVENT_CODES.GRAVITY.DIRECTION_Y_POSITIVE],
    [EVENT_CODES.GRAVITY.DIRECTION_Z_NEGATIVE, EVENT_CODES.GRAVITY.DIRECTION_Z_POSITIVE]
];

/**
 * Creates gravity extensions.
 *
 * @example
 *
 * ExtensionGravity.activate();
 */
class ExtensionGravity {

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores the gravity.
     * @type {GravitySensor}
     * @private
     */
    $gravity;

    /**
     * Stores the gravity state.
     * @type {Object<string, boolean>}
     * @private
     */
    $stateGravity;

    /**
     * Creates a new gravity extension.
     * @protected
     */
    constructor() {

        this.$stateGravity = {};

        [...$GRAVITY_DIRECTIONS.flat()].forEach(($code) => {

            this.$stateGravity[$code] = false;
        });

        this.$gravity = new GravitySensor({

            'frequency': 60
        });

        window.addEventListener(EVENT_TYPES.NATIVE.BLUR, this.$onBlur.bind(this));

        this.$gravity.addEventListener(EVENT_TYPES.NATIVE.READING, this.$onGravity.bind(this));

        this.$gravity.start();
    }

    /**
     * Called when the focus is lost.
     * @private
     */
    $onBlur() {

        $GRAVITY_DIRECTIONS.forEach(($pair) => {

            const [directionMinimum, directionMaximum] = $pair;

            if (this.$stateGravity[directionMinimum] === true) {

                this.$stateGravity[directionMinimum] = false;
                window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMinimum));
            }

            if (this.$stateGravity[directionMaximum] === true) {

                this.$stateGravity[directionMaximum] = false;
                window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMaximum));
            }
        });
    }

    /**
     * Called when the gravity is updated.
     * @private
     */
    $onGravity() {

        const gravity = new Vector3(this.$gravity.x, this.$gravity.y, this.$gravity.z).scale(-1);
        const gravityNormalized = gravity.normalize();
        const gravityAnalog = [gravityNormalized.x, gravityNormalized.y, gravityNormalized.z];

        const gravityMaximum = [0, 0, 0];

        const lengthX = Math.abs(gravity.x);
        const lengthY = Math.abs(gravity.y);
        const lengthZ = Math.abs(gravity.z);

        const lengthMaximum = Math.max(lengthX, lengthY, lengthZ);

        if (lengthX === lengthMaximum) {

            gravityMaximum[0] = Math.sign(gravity.x);
        }

        else if (lengthY === lengthMaximum) {

            gravityMaximum[1] = Math.sign(gravity.y);
        }

        else if (lengthZ === lengthMaximum) {

            gravityMaximum[2] = Math.sign(gravity.z);
        }

        gravityMaximum.forEach(($direction, $index) => {

            const [directionMinimum, directionMaximum] = $GRAVITY_DIRECTIONS[$index];

            if ($direction < 0) {

                if (this.$stateGravity[directionMaximum] === true) {

                    this.$stateGravity[directionMaximum] = false;
                    window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMaximum));
                }

                this.$stateGravity[directionMinimum] = true;
                window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_DOWN, directionMinimum));
            }

            else if ($direction > 0) {

                if (this.$stateGravity[directionMinimum] === true) {

                    this.$stateGravity[directionMinimum] = false;
                    window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMinimum));
                }

                this.$stateGravity[directionMaximum] = true;
                window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_DOWN, directionMaximum));
            }

            else {

                if (this.$stateGravity[directionMinimum] === true) {

                    this.$stateGravity[directionMinimum] = false;
                    window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMinimum));
                }

                if (this.$stateGravity[directionMaximum] === true) {

                    this.$stateGravity[directionMaximum] = false;
                    window.dispatchEvent(new EventGravityDigital(EVENT_TYPES.GRAVITY.GRAVITY_UP, directionMaximum));
                }
            }

            window.dispatchEvent(new EventGravityAnalog(EVENT_TYPES.GRAVITY.GRAVITY_ANALOG, directionMinimum, - gravityAnalog[$index]));
            window.dispatchEvent(new EventGravityAnalog(EVENT_TYPES.GRAVITY.GRAVITY_ANALOG, directionMaximum, gravityAnalog[$index]));
        });
    }

    /**
     * Activates the extension.
     * @public
     * @static
     */
    static activate() {

        if (typeof window.GravitySensor === 'undefined') {

            return;
        }

        if (ExtensionGravity.$activated === true) {

            return;
        }

        new ExtensionGravity();

        ExtensionGravity.$activated = true;
    }
}

export {

    ExtensionGravity
};

export default ExtensionGravity;
