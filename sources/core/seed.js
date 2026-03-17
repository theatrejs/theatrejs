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

        this.$current = $seed;
        this.$origin = $seed;
    }

    /**
     * Gets a pseudo-random number (in [0, 1[ range) ("Mulberry32").
     * @returns {number}
     * @public
     */
    random() {

        this.$current = (this.$current + 0x6D2B79F5) >>> 0;

        let result = this.$current;
        result = Math.imul(result ^ (result >>> 15), result | 1) >>> 0;
        result = (result + Math.imul(result ^ (result >>> 7), result | 61)) >>> 0;
        result = (result ^ (result >>> 14)) >>> 0;

        return result / 0x100000000;
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
