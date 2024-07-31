export default Actor;
/**
 * Abstract actors.
 *
 * @example
 *
 * class ActorExample extends Actor {}
 */
export class Actor {
    /**
     * Stores the preloadable assets.
     * @type {string[]}
     * @public
     * @static
     */
    public static preloadables: string[];
    /**
     * Create a new actor.
     * @param {import('../index.js').Stage} $stage The stage on which to create the actor.
     */
    constructor($stage: import("../index.js").Stage);
    /**
     * Stores the collider.
     * @type {import('../index.js').Collider}
     * @private
     */
    private $collider;
    /**
     * Stores the components.
     * @type {Object<string, any>}
     * @private
     */
    private $components;
    /**
     * Stores the sounds.
     * @type {import('../index.js').Sound[]}
     * @private
     */
    private $sounds;
    /**
     * Stores the sprite.
     * @type {import('../index.js').Sprite}
     * @private
     */
    private $sprite;
    /**
     * Stores the current stage.
     * @type {import('../index.js').Stage}
     * @private
     */
    private $stage;
    /**
     * Stores the position.
     * @type {import('../index.js').Vector2}
     * @private
     */
    private $translation;
    /**
     * Stores the uuid.
     * @type {string}
     * @private
     */
    private $uuid;
    /**
     * Stores the vibrations.
     * @type {import('../index.js').Vibration[]}
     * @private
     */
    private $vibrations;
    /**
     * Stores the z-index.
     * @type {number}
     * @private
     */
    private $zIndex;
    /**
     * Gets the collider.
     * @type {import('../index.js').Collider}
     * @public
     */
    public get collider(): Collider;
    /**
     * Gets the current engine.
     * @type {import('../index.js').Engine}
     * @public
     */
    public get engine(): import("./engine.js").Engine;
    /**
     * Gets the sounds.
     * @type {import('../index.js').Sound[]}
     * @public
     */
    public get sounds(): import("./sound.js").Sound[];
    /**
     * Gets the sprite.
     * @type {import('../index.js').Sprite}
     * @public
     */
    public get sprite(): Sprite;
    /**
     * Gets the current stage.
     * @type {import('../index.js').Stage}
     * @public
     */
    public get stage(): import("./stage.js").Stage;
    /**
     * Gets the position.
     * @type {import('../index.js').Vector2}
     * @public
     */
    public get translation(): Vector2;
    /**
     * Gets the uuid.
     * @type {string}
     * @public
     */
    public get uuid(): string;
    /**
     * Gets the vibrations.
     * @type {import('../index.js').Vibration[]}
     * @public
     */
    public get vibrations(): import("./vibration.js").Vibration[];
    /**
     * Gets the z-index.
     * @type {number}
     * @public
     */
    public get zIndex(): number;
    /**
     * Adds the given sound.
     * @param {import('../index.js').Sound} $sound The sound to add.
     * @returns {this}
     * @public
     */
    public addSound($sound: import("../index.js").Sound): this;
    /**
     * Adds the given vibration.
     * @param {import('../index.js').Vibration} $vibration The vibration to add.
     * @returns {this}
     * @public
     */
    public addVibration($vibration: import("../index.js").Vibration): this;
    /**
     * Gets a component.
     * @param {string} $name The name of the component to get.
     * return {any}
     * @public
     */
    public getComponent($name: string): any;
    /**
     * Checks if the actor has a collider.
     * return {boolean}
     * @public
     */
    public hasCollider(): boolean;
    /**
     * Checks if the actor has the given component.
     * @param {string} $name The name of the component to check.
     * return {boolean}
     * @public
     */
    public hasComponent($name: string): boolean;
    /**
     * Checks if the actor has a sprite.
     * @returns {boolean}
     * @public
     */
    public hasSprite(): boolean;
    /**
     * Called just after removing the actor.
     * @public
     */
    public onAfterRemove(): void;
    /**
     * Called just before removing the actor.
     * @public
     */
    public onBeforeRemove(): void;
    /**
     * Called when a collision is being resolved.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Actor} $parameters.$actor The colliding actor.
     * @param {boolean} $parameters.$east If the origin of collision is facing the east face.
     * @param {boolean} $parameters.$north If the origin of collision is facing the north face.
     * @param {boolean} $parameters.$south If the origin of collision is facing the south face.
     * @param {boolean} $parameters.$west If the origin of collision is facing the west face.
     * @public
     */
    public onCollide({ $actor, $east, $north, $south, $west }: {
        $actor: import("../index.js").Actor;
        $east: boolean;
        $north: boolean;
        $south: boolean;
        $west: boolean;
    }): void;
    /**
     * Called when a collision is being entered.
     * @param {Object} $parameters The given parameters.
     * @param {import('../index.js').Actor} $parameters.$actor The colliding actor.
     * @param {boolean} $parameters.$east If the origin of collision is facing the east face.
     * @param {boolean} $parameters.$north If the origin of collision is facing the north face.
     * @param {boolean} $parameters.$south If the origin of collision is facing the south face.
     * @param {boolean} $parameters.$west If the origin of collision is facing the west face.
     * @public
     */
    public onCollideEnter({ $actor, $east, $north, $south, $west }: {
        $actor: import("../index.js").Actor;
        $east: boolean;
        $north: boolean;
        $south: boolean;
        $west: boolean;
    }): void;
    /**
     * Called when a collision is being left.
     * @param {import('../index.js').Actor} $actor The colliding actor.
     * @public
     */
    public onCollideLeave($actor: import("../index.js").Actor): void;
    /**
     * Called when the actor is being created.
     * @public
     */
    public onCreate(): void;
    /**
     * Called when a sound is finishing playing.
     * @param {import('../index.js').Sound} $sound The sound.
     * @public
     */
    public onSoundFinish($sound: import("../index.js").Sound): void;
    /**
     * Called when the actor is being updated by one tick update.
     * @param {number} $timetick The tick duration (in ms).
     * @public
     */
    public onTick($timetick: number): void;
    /**
     * Removes the given sound.
     * @param {import('../index.js').Sound} $sound The sound to remove.
     * @returns {this}
     * @public
     */
    public removeSound($sound: import("../index.js").Sound): this;
    /**
     * Removes all sound.
     * @returns {this}
     * @public
     */
    public removeSounds(): this;
    /**
     * Removes the given vibration.
     * @param {import('../index.js').Vibration} $vibration The vibration to remove.
     * @returns {this}
     * @public
     */
    public removeVibration($vibration: import("../index.js").Vibration): this;
    /**
     * Removes all vibration.
     * @returns {this}
     * @public
     */
    public removeVibrations(): this;
    /**
     * Sets the collider.
     * @param {import('../index.js').Collider} $collider The collider to set.
     * @returns {this}
     * @public
     */
    public setCollider($collider: import("../index.js").Collider): this;
    /**
     * Sets a component.
     * @param {string} $name The name of the component to set.
     * @param {any} $component The value of the component to set.
     * @returns {this}
     * @public
     */
    public setComponent($name: string, $component: any): this;
    /**
     * Sets the sprite.
     * @param {import('../index.js').Sprite} $sprite The sprite to set.
     * @returns {this}
     * @public
     */
    public setSprite($sprite: import("../index.js").Sprite): this;
    /**
     * Sets the z-index.
     * @param {number} $zIndex The z-index to set.
     * @returns {this}
     * @public
     */
    public setZIndex($zIndex: number): this;
    /**
     * Translates the actor in the world space from a third person point of view.
     * @param {import('../index.js').Vector2} $vector The translation to apply.
     * @returns {this}
     * @public
     */
    public translate($vector: import("../index.js").Vector2): this;
    /**
     * Translates the actor in the world space to the given position.
     * @param {import('../index.js').Vector2} $vector The position to translate to.
     * @returns {this}
     * @public
     */
    public translateTo($vector: import("../index.js").Vector2): this;
}
import { Collider } from '../index.js';
import { Sprite } from '../index.js';
import { Vector2 } from '../index.js';
