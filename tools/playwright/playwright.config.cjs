const path = require('path');

const {defineConfig} = require('@playwright/test');

const configuration = defineConfig({

    'expect': {

        'toHaveScreenshot': {

            'pathTemplate': './screenshots/{testFileName}/{testName}/{arg}{ext}'
        }
    },
    'outputDir': path.resolve(__dirname, 'results'),
    'testDir': path.resolve(__dirname, '..', '..', 'tests'),
    'use': {

        'baseURL': 'http://localhost:7357',
        'browserName': 'chromium',
        'headless': true,
        'launchOptions': {

            'args': [

                '--disable-dev-shm-usage',
                '--no-sandbox'
            ]
        },
        'screenshot': 'on',
        'trace': 'on',
        'video': {

            'mode': 'on',
            'size': {

                'height': 1080,
                'width': 1920
            }
        },
        'viewport': {

            'height': 1080,
            'width': 1920
        }
    },
    'webServer': {

        'command': 'webpack-dev-server --config ./webpack.development.cjs --port 7357',
        'port': 7357,
        'reuseExistingServer': true
    }
});

module.exports = configuration;
