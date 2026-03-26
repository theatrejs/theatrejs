import {expect, test} from '@playwright/test';

import {listen, send} from './sources/events.js';

test('stage preloads and renders correctly', async ({page}) => {

    await page.goto('/sandbox-smoke.html');

    const promiseStageRendered = listen(page, 'stage-rendered');

    await send(page, 'start-engine');

    const stageRendered = await promiseStageRendered;
    expect(stageRendered).toBe(true);
    await expect(page).toHaveScreenshot('stage-rendered.png');
});
