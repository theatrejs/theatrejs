import {Sprite, Vector2} from '../index.js';

/**
 * Creates masks.
 *
 * @example
 *
 * const mask = new Mask(sprite);
 */
class Mask {

    /**
     * Stores the sprite.
     * @type {Sprite}
     * @private
     */
    $sprite;

    /**
     * Stores the position.
     * @type {Vector2}
     * @private
     */
    $translation;

    /**
     * Gets the sprite.
     * @type {Sprite}
     * @public
     */
    get sprite() {

        return this.$sprite;
    }

    /**
     * Gets the position.
     * @type {Vector2}
     * @public
     */
    get translation() {

        return this.$translation;
    }

    /**
     * Creates a new mask.
     * @param {Sprite} $sprite The sprite.
     */
    constructor($sprite) {

        this.$sprite = $sprite;
        this.$translation = new Vector2(0, 0);
    }

    /**
     * Translates the mask in the world space.
     * @param {Vector2} $vector The translation to apply.
     * @private
     */
    $translate($vector) {

        this.$translation.add($vector);
    }

    /**
     * Sets the sprite.
     * @param {Sprite} $sprite The sprite to set.
     * @returns {this}
     * @public
     */
    setSprite($sprite) {

        this.$sprite = $sprite;

        return this;
    }

    /**
     * Translates the mask in the world space from a third person point of view.
     * @param {Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    translate($vector) {

        const translation = $vector.clone();

        this.$translate(translation);

        return this;
    }

    /**
     * Translates the mask in the world space to the given position.
     * @param {Vector2} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    translateTo($vector) {

        const translation = $vector.clone().subtract(this.$translation);

        this.$translate(translation);

        return this;
    }

    /**
     * Translates the mask in the world space from a third person point of view on the x-axis.
     * @param {number} $x The translation to apply on the x-axis.
     * @returns {this}
     * @public
     */
    translateX($x) {

        const translation = new Vector2($x, 0);

        this.$translate(translation);

        return this;
    }

    /**
     * Translates the mask in the world space from a third person point of view on the y-axis.
     * @param {number} $y The translation to apply on the y-axis.
     * @returns {this}
     * @public
     */
    translateY($y) {

        const translation = new Vector2(0, $y);

        this.$translate(translation);

        return this;
    }
}

export {

    Mask
};

export default Mask;
