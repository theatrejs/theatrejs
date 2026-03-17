/**
 * Creates seeded pseudo-random number generators.
 *
 * @example
 *
 * const seed = new Seed(seed);
 * const random = seed.random();
 */
class Seed {

    /**
     * @callback TypeGenerator A pseudo-random number generator.
     * @returns {number}
     * @protected
     *
     * @memberof Seed
     */

    /**
     * Stores the pseudo-random number generator.
     * @type {TypeGenerator}
     * @private
     */
    $generator;

    /**
     * Stores the current seed.
     * @type {number}
     * @private
     */
    $current;

    /**
     * Stores the seed of origin.
     * @type {number}
     * @private
     */
    $origin;

    /**
     * Gets the current seed.
     * @type {number}
     * @public
     */
    get current() {

        return this.$current;
    }

    /**
     * Gets the seed of origin.
     * @type {number}
     * @public
     */
    get origin() {

        return this.$origin;
    }

    /**
     * Creates a new seeded pseudo-random number generator.
     * @param {number} $seed The seed.
     */
    constructor($seed) {

        this.$origin = $seed;

        this.$current = this.$origin;

        this.$generator = this.$mulberry32(this.$current);
    }

    /**
     * Creates a 'Mulberry32' pseudo-random number generator.
     * @param {number} $seed The seed.
     * @returns {TypeGenerator}
     * @private
     */
    $mulberry32($seed) {

        let seed = $seed >>> 0;

        /**
         * @type {TypeGenerator}
         */
        const generator = () => {

            seed += 0x6D2B79F5;
            seed = Math.imul(seed ^ (seed >>> 15), seed | 1);
            seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61);

            this.$current = seed;

            return ((seed ^ (seed >>> 14)) >>> 0) / 2 ** 32;
        };

        return generator;
    }

    /**
     * Gets a pseudo-random number (in [0, 1[ range).
     * @returns {number}
     * @public
     */
    random() {

        return this.$generator();
    }

    /**
     * Shuffles the given array ("Fisher–Yates").
     * @template {any} TypeGeneric The generic type of the values of the array.
     * @param {Array<TypeGeneric>} $array The array to shuffle.
     * @returns {Array<TypeGeneric>}
     * @public
     */
    shuffle($array) {

        for (let $iterator = $array.length - 1; $iterator > 0; $iterator -= 1) {

            const index = Math.floor(this.random() * ($iterator + 1));

            [$array[$iterator], $array[index]] = [$array[index], $array[$iterator]];
        }

        return $array;
    }

    /**
     * Performs a success roll based on the given probability (in [0, 1] range).
     * @param {number} $probability The probability to succeed.
     * @returns {boolean}
     * @public
     */
    success($probability) {

        const success = (this.random() < $probability);

        return success === true;
    }
}

export {

    Seed
};

export default Seed;
