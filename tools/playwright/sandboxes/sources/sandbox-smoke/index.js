import {Engine, FACTORIES, Sprite, UTILS, Vector2} from '@theatrejs/theatrejs';

import texture from './assets/theatrejs.png';

class ActorHero extends FACTORIES.ActorWithPreloadables([FACTORIES.PreloadableTexture(texture)]) {

    onCreate() {

        this.setSprite(new Sprite({

            $sizeTarget: new Vector2(32, 32),
            $texture: texture
        }));
    }
}

class StageSandbox extends FACTORIES.StageWithPreloadables([ActorHero]) {

    onCreate() {

        this.createActor(ActorHero);
    }
}

const starter = async () => {

    await UTILS.ready();

    const engine = new Engine();
    engine.initiate(25);

    await engine.preloadStage(StageSandbox);
    engine.createStage(StageSandbox);

    window.dispatchEvent(new CustomEvent('stage-rendered'));
};

window.addEventListener('start-engine', starter, {'once': true});
