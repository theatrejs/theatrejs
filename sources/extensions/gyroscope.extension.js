import {EVENT_CODES, EVENT_TYPES, EventGyroscopeAnalog, EventGyroscopeDigital, MATHEMATICS} from '../index.js';

/**
 * The ordered list of the orientations event codes of the gyroscope.
 * @type {Array<Array<string>>}
 * @constant
 * @private
 */
const $GYROSCOPE_ORIENTATIONS = [

    [EVENT_CODES.GYROSCOPE.ORIENTATION_X_NEGATIVE, EVENT_CODES.GYROSCOPE.ORIENTATION_X_POSITIVE],
    [EVENT_CODES.GYROSCOPE.ORIENTATION_Y_NEGATIVE, EVENT_CODES.GYROSCOPE.ORIENTATION_Y_POSITIVE],
    [EVENT_CODES.GYROSCOPE.ORIENTATION_Z_NEGATIVE, EVENT_CODES.GYROSCOPE.ORIENTATION_Z_POSITIVE]
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

        [...$GYROSCOPE_ORIENTATIONS.flat()].forEach(($code) => {

            this.$stateGyroscope[$code] = false;
        });

        this.$gyroscope = new Gyroscope({

            'frequency': 60
        });

        window.addEventListener(EVENT_TYPES.FOCUS.BLUR, this.$onBlur.bind(this));

        this.$gyroscope.addEventListener(EVENT_TYPES.GYROSCOPE.READING, this.$onGyroscope.bind(this));

        this.$gyroscope.start();
    }

    /**
     * Called when the focus is lost.
     * @private
     */
    $onBlur() {

        [this.$gyroscope.x, this.$gyroscope.y, this.$gyroscope.z].forEach(($orientation, $index) => {

            const [orientationMinimum, orientationMaximum] = $GYROSCOPE_ORIENTATIONS[$index];

            if (this.$stateGyroscope[orientationMinimum] === true) {

                this.$stateGyroscope[orientationMinimum] = false;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMinimum));
            }

            if (this.$stateGyroscope[orientationMaximum] === true) {

                this.$stateGyroscope[orientationMaximum] = false;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMaximum));
            }
        });
    }

    /**
     * Called when the gyroscope is updated.
     * @private
     */
    $onGyroscope() {

        [this.$gyroscope.x, this.$gyroscope.y, this.$gyroscope.z].forEach(($orientation, $index) => {

            const [orientationMinimum, orientationMaximum] = $GYROSCOPE_ORIENTATIONS[$index];

            if ($orientation <= - $THRESHOLD_GYROSCOPE_VELOCITY_ANGULAR) {

                if (this.$stateGyroscope[orientationMaximum] === true) {

                    this.$stateGyroscope[orientationMaximum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMaximum));
                }

                this.$stateGyroscope[orientationMinimum] = true;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, orientationMinimum));
                window.dispatchEvent(new EventGyroscopeAnalog(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, orientationMinimum, Math.sign($orientation) * $orientation));
            }

            else if ($orientation >= $THRESHOLD_GYROSCOPE_VELOCITY_ANGULAR) {

                if (this.$stateGyroscope[orientationMinimum] === true) {

                    this.$stateGyroscope[orientationMinimum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMinimum));
                }

                this.$stateGyroscope[orientationMaximum] = true;
                window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_DOWN, orientationMaximum));
                window.dispatchEvent(new EventGyroscopeAnalog(EVENT_TYPES.GYROSCOPE.GYROSCOPE_ANALOG, orientationMaximum, Math.sign($orientation) * $orientation));
            }

            else {

                if (this.$stateGyroscope[orientationMinimum] === true) {

                    this.$stateGyroscope[orientationMinimum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMinimum));
                }

                if (this.$stateGyroscope[orientationMaximum] === true) {

                    this.$stateGyroscope[orientationMaximum] = false;
                    window.dispatchEvent(new EventGyroscopeDigital(EVENT_TYPES.GYROSCOPE.GYROSCOPE_UP, orientationMaximum));
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
