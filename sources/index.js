import {ExtensionGamepad} from './extensions/gamepad.extension.js';

new ExtensionGamepad();

export {Actor} from './core/actor.js';
export * as CONSTANTS from './core/constants.js';
export {Engine} from './core/engine.js';
export {Loop} from './core/loop.js';
export {Stage} from './core/stage.js';
export * as UTILS from './core/utils.js';
export {Vector2} from './core/vector2.js';

export {EventGamepadAnalog} from './events/gamepadanalog.js';
export {EventGamepadDigital} from './events/gamepaddigital.js';

export {SystemActor} from './systems/actor.system.js';
