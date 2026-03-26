const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @returns {import('webpack').Configuration}
 */
function configuration() {

    const sandboxes = path.resolve(__dirname, 'sandboxes', 'sources');

    const entries = Object.fromEntries(

        fs.readdirSync(sandboxes, {'withFileTypes': true})
        .filter(($item) => ($item.isDirectory()))
        .map(($folder) => ([$folder.name, path.resolve(sandboxes, $folder.name, 'index.js')]))
    );

    return {

        'entry': {

            ...entries
        },
        'experiments': {

            'topLevelAwait': true
        },
        'module': {

            'rules': [

                {
                    'test': /\.png$/,
                    'type': 'asset/resource'
                }
            ]
        },
        'output': {

            'assetModuleFilename': '[hash][ext]',
            'filename': '[name].bundle.js',
            'path': path.resolve(__dirname, 'sandboxes', 'distribution', 'bundle')
        },
        'performance': {

            'hints': false
        },
        'plugins': [

            ...Object.keys(entries).map(($sandbox) => {

                return new HtmlWebpackPlugin({

                    'chunks': [$sandbox],
                    'filename': $sandbox + '.html',
                    'template': path.resolve(__dirname, 'sandboxes', 'templates', 'index.html')
                });
            })
        ],
        'resolve': {

            'alias': {

                '@theatrejs/theatrejs': path.resolve(__dirname, '..', '..', 'sources')
            }
        },
        'stats': 'none'
    };
}

module.exports = configuration;
