[![Copyright](https://img.shields.io/badge/©-deformhead-white.svg)](https://github.com/deformhead) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theatrejs/theatrejs/blob/master/LICENSE) [![Bundle Size (Gzipped)](https://img.shields.io/bundlejs/size/@theatrejs/theatrejs@latest)](https://www.npmjs.com/package/@theatrejs/theatrejs/v/latest) [![NPM Version](https://img.shields.io/npm/v/@theatrejs/theatrejs/latest)](https://www.npmjs.com/package/@theatrejs/theatrejs/v/latest)

# Theatre.js

> *🎮 A JavaScript 2D Game Engine focused on creating pixel art games.*

## Installation

```shell
npm install @theatrejs/theatrejs --save
```

## Quick Start

> *⚠️ This example does not include the preloading of assets.*

```javascript
import {Actor, Engine, Sprite, Stage, Vector2} from '@theatrejs/theatrejs';

import textureHero from './hero-16x16.png';

class Hero extends Actor {
    onCreate() {
        this.setSprite(new Sprite({
            $sizeTarget: new Vector2(16, 16),
            $texture: textureHero
        }));
    }
}

class Level1 extends Stage {
    onCreate() {
        this.createActor(Hero);
    }
}

const engine = new Engine();
engine.initiate();
engine.createStage(Level1);
```

## With Preloading

> *⚠️ Assets are preloaded asynchronously.*

#### `asynchronous module`

```javascript
import {Engine, FACTORIES, Sprite, Vector2} from '@theatrejs/theatrejs';

import textureHero from './hero-16x16.png';

class Hero extends FACTORIES.ActorWithPreloadables([FACTORIES.PreloadableTexture(textureHero)]) {
    onCreate() {
        this.setSprite(new Sprite({
            $sizeTarget: new Vector2(16, 16),
            $texture: textureHero
        }));
    }
}

class Level1 extends FACTORIES.StageWithPreloadables([Hero]) {
    onCreate() {
        this.createActor(Hero);
    }
}

const engine = new Engine();
engine.initiate();

await engine.preloadStage(Level1);

engine.createStage(Level1);
```

#### `synchronous module`

```javascript
...

const engine = new Engine();
engine.initiate();

engine.preloadStage(Level1).then(() => {
    engine.createStage(Level1);
});
```

## [API](https://theatrejs.github.io/theatrejs/index.html)
