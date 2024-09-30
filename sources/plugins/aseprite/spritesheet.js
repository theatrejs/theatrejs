import {AABB, Actor, Sprite, Timeline, TimelineKeyframe, Vector2} from '../../index.js';

/**
 * Creates spritesheets from the given Asperite JSON files.
 * @template {string} T The generic type of the tags.
 *
 * @example
 *
 * const spritesheet = new Spritesheet(texture, data);
 * spritesheet.createTimeline({actor, framerate, loop, tag});
 */
class Spritesheet {

    /**
     * @template {string} T The generic type of the tags.
     * @typedef {Object} typeaseprite An Asperite JSON data.
     * @property {Array<typeasepriteframe>} typeaseprite.frames The Asperite JSON frames data.
     * @property {typeasepritemeta<T>} typeaseprite.meta The Asperite JSON meta data.
     * @protected
     *
     * @memberof Spritesheet
     */

    /**
     * @typedef {Object} typeasepriteframe An Asperite JSON frame data.
     * @property {number} typeasepriteframe.duration The duration.
     * @property {string} typeasepriteframe.filename The file name.
     * @property {Object} typeasepriteframe.frame The frame.
     * @property {number} typeasepriteframe.frame.x The x position of the frame.
     * @property {number} typeasepriteframe.frame.y The y position of the frame.
     * @property {number} typeasepriteframe.frame.w The width of the frame.
     * @property {number} typeasepriteframe.frame.h The height of the frame.
     * @property {boolean} typeasepriteframe.rotated The rotated status.
     * @property {Object} typeasepriteframe.spriteSourceSize The sprite source size.
     * @property {number} typeasepriteframe.spriteSourceSize.x The x position of the sprite source.
     * @property {number} typeasepriteframe.spriteSourceSize.y The y position of the sprite source.
     * @property {number} typeasepriteframe.spriteSourceSize.w The width of the sprite source.
     * @property {number} typeasepriteframe.spriteSourceSize.h The height of the sprite source.
     * @property {Object} typeasepriteframe.sourceSize The sprite size.
     * @property {number} typeasepriteframe.sourceSize.w The width of the source.
     * @property {number} typeasepriteframe.sourceSize.h The height of the source.
     * @property {boolean} typeasepriteframe.trimmed The trimmed status.
     * @protected
     *
     * @memberof Spritesheet
     */

    /**
     * @template {string} T The generic type of the tags.
     * @typedef {Object} typeasepritemeta An Asperite JSON meta data.
     * @property {string} typeasepritemeta.app The app meta data.
     * @property {string} typeasepritemeta.format The format meta data.
     * @property {string} typeasepritemeta.image The image meta data.
     * @property {string} typeasepritemeta.scale The scale meta data.
     * @property {Object} typeasepritemeta.size The size meta data.
     * @property {number} typeasepritemeta.size.w The size width meta data.
     * @property {number} typeasepritemeta.size.h The size height meta data.
     * @property {string} typeasepritemeta.version The version meta data.
     * @property {Array<typeasepriteframetag<T>>} typeasepritemeta.frameTags The Asperite JSON tags meta data.
     * @protected
     *
     * @memberof Spritesheet
     */

    /**
     * @template {string} T The generic type of the tags.
     * @typedef {Object} typeasepriteframetag An Asperite JSON tag meta data.
     * @property {T} typeasepriteframetag.name The nameg.
     * @property {number} typeasepriteframetag.from The first frameg.
     * @property {number} typeasepriteframetag.to The last frameg.
     * @property {string} typeasepriteframetag.direction The animation direction.
     * @property {string} typeasepriteframetag.color The color.
     * @protected
     *
     * @memberof Spritesheet
     */

    /**
     * Stores the sprites.
     * @type {Array<Sprite>}
     * @private
     */
    $sprites;

    /**
     * Stores the sprites by tags.
     * @type {Object.<T, Array<Sprite>>}
     * @private
     */
    $tags;

    /**
     * Creates a new spritesheet from the given Asperite JSON file.
     * @param {string} $texture The texture source.
     * @param {typeaseprite<T>} $data The Asperite JSON file.
     */
    constructor($texture, $data) {

        this.$sprites = $data.frames.map(($frame) => {

            return new Sprite({

                $frameSource: new AABB(

                    new Vector2($frame.frame.x / $data.meta.size.w, $frame.frame.y / $data.meta.size.h),
                    new Vector2(($frame.frame.x + $frame.frame.w) / $data.meta.size.w, ($frame.frame.y + $frame.frame.h) / $data.meta.size.h)
                ),
                $sizeTarget: new Vector2($frame.frame.w, $frame.frame.h),
                $textureColor: $texture
            });
        });

        this.$tags = {};

        $data.meta.frameTags.forEach(($tag) => {

            this.$tags[$tag.name] = this.$sprites.slice($tag.from, $tag.to + 1);
        });
    }

    /**
     * Creates a timeline for the given actor with the given tag.
     * @param {Object} $parameters The given parameters.
     * @param {Actor} $parameters.$actor The given actor.
     * @param {number} [$parameters.$framerate] The number of timeline keyframes to show per second.
     * @param {boolean} [$parameters.$loop] The loop status.
     * @param {T} $parameters.$tag The given tag.
     * @returns {Timeline}
     * @public
     */
    createTimeline({$actor, $framerate = 8, $loop = false, $tag}) {

        const keyframes = this.getTag($tag).map(($sprite, $index) => {

            return new TimelineKeyframe({

                $onEnter: () => {

                    $actor.setSprite($sprite);
                },
                $timecode: $index * 1000 / $framerate
            });
        });

        if ($loop === true) {

            keyframes.push(new TimelineKeyframe({

                $onEnter: ($timeline) => {

                    $timeline.seekTimecode(0);
                },
                $timecode: keyframes.length * 1000 / $framerate
            }));
        }

        return new Timeline(keyframes);
    }

    /**
     * Gets the sprites for the given tag.
     * @param {T} $tag The given tag.
     * @returns {Array<Sprite>}
     * @public
     */
    getTag($tag) {

        return this.$tags[$tag];
    }
}

export {

    Spritesheet
};

export default Spritesheet;
