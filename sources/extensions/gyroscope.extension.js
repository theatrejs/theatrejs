import {EVENT_CODES, EVENT_TYPES, EventGyroscopeAnalog, EventGyroscopeDigital, MATHEMATICS} from '../index.js';

/**
 * The ordered list of the rotations event codes of the gyroscope.
 * @type {Array<Array<string>>}
 * @constant
 * @private
 */
const $GYROSCOPE_ROTATIONS = [

    [EVENT_CODES.GYROSCOPE.ROTATION_X_NEGATIVE, EVENT_CODES.GYROSCOPE.ROTATION_X_POSITIVE],
    [EVENT_CODES.GYROSCOPE.ROTATION_Y_NEGATIVE, EVENT_CODES.GYROSCOPE.ROTATION_Y_POSITIVE],
    [EVENT_CODES.GYROSCOPE.ROTATION_Z_NEGATIVE, EVENT_CODES.GYROSCOPE.ROTATION_Z_POSITIVE]
];

/**
 * The threshold of the gyroscope angular velocity (in radians/s).
 * @type {number}
 * @constant
 * @private
 */
const $THRESHOLD_GYROSCOPE_VELOCITY_ANGULAR = 1 * MATHEMATICS.RADIANS;

/**
 * Creates gyroscope extensions.
 *
 * @example
 *
 * ExtensionGyroscope.activate();
 */
class ExtensionGyroscope {

    /**
     * Stores the activated status.
     * @type {boolean}
     * @private
     * @static
     */
    static $activated = false;

    /**
     * Stores the gyroscope.
     * @type {Gyroscope}
     * @private
     */
    $gyroscope;

    /**
     * Stores the gyroscope state.
     * @type {Object<string, boolean>}
     * @private
     */
    $stateGyroscope;

    /**
     * Creates a new gyroscope extension.
     * @protected
     */
    constructor() {

        this.$stateGyroscope = {};

        [...$GYROSCOPE_ROTATIONS.flat()].forEach(($code) => {

            this.$stateGyroscope[$code] = false;
        });

        this.$gyroscope = new Gyroscope({

            'frequency': 60
        });

        window.addEventListener(EVENT_TYPES.NATIVE.BLUR, this.$onBlur.bind(this));

        this.$gyroscope.addEventListener(EVENT_TYPES.NATIVE.READING, this.$onGyroscope.bind(this));

        this.$gyroscope.start();
    }

    /**
     * Called when the focus is lost.
     * @private
     */
    $onBlur() {

        [this.$gyroscope.x, this.$gyroscope.y, this.$gyroscope.z].forEach(($rotation, $index) => {

            const [rotationMinimum, rotationMaximum] = $GYROSCOPE_ROTATIONS[$index];

            if (this.$stateGyroscope[rotationMinimum] === true) {

                this.$stateGyroscope[rotationMinimum] = false;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMinimum));
            }

            if (this.$stateGyroscope[rotationMaximum] === true) {

                this.$stateGyroscope[rotationMaximum] = false;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMaximum));
            }
        });
    }

    /**
     * Called when the gyroscope is updated.
     * @private
     */
    $onGyroscope() {

        [this.$gyroscope.x, this.$gyroscope.y, this.$gyroscope.z].forEach(($rotation, $index) => {

            const [rotationMinimum, rotationMaximum] = $GYROSCOPE_ROTATIONS[$index];

            if ($rotation <= - $THRESHOLD_GYROSCOPE_VELOCITY_ANGULAR) {

                if (this.$stateGyroscope[rotationMaximum] === true) {

                    this.$stateGyroscope[rotationMaximum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMaximum));
                }

                this.$stateGyroscope[rotationMinimum] = true;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, rotationMinimum));
                window.dispatchEvent(new EventGyroscopeAnalog(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, rotationMinimum, Math.sign($rotation) * $rotation));
            }

            else if ($rotation >= $THRESHOLD_GYROSCOPE_VELOCITY_ANGULAR) {

                if (this.$stateGyroscope[rotationMinimum] === true) {

                    this.$stateGyroscope[rotationMinimum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMinimum));
                }

                this.$stateGyroscope[rotationMaximum] = true;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, rotationMaximum));
                window.dispatchEvent(new EventGyroscopeAnalog(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, rotationMaximum, Math.sign($rotation) * $rotation));
            }

            else {

                if (this.$stateGyroscope[rotationMinimum] === true) {

                    this.$stateGyroscope[rotationMinimum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMinimum));
                }

                if (this.$stateGyroscope[rotationMaximum] === true) {

                    this.$stateGyroscope[rotationMaximum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, rotationMaximum));
                }
            }
        });
    }

    /**
     * Activates the extension.
     * @public
     * @static
     */
    static activate() {

        if (typeof window.Gyroscope === 'undefined') {

            return;
        }

        if (ExtensionGyroscope.$activated === true) {

            return;
        }

        new ExtensionGyroscope();

        ExtensionGyroscope.$activated = true;
    }
}

export {

    ExtensionGyroscope
};

export default ExtensionGyroscope;
