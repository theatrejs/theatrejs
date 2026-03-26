import globals from 'globals';

import cspell from './plugins/cspell.config.js';
import javascript from './plugins/javascript.config.js';
import jsdoc from './plugins/jsdoc.config.js';
import playwright from './plugins/playwright.config.js';
import stylistic from './plugins/stylistic.config.js';

const configuration = [

    javascript,
    cspell,
    stylistic,
    jsdoc,
    playwright,
    {
        'languageOptions': {

            'globals': {

                ...globals.browser
            }
        }
    }
];

export default configuration;
