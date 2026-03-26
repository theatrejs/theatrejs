const {merge} = require('webpack-merge');
const path = require('path');

function configuration() {

    return merge(require('./webpack.common.cjs')(), {

        'devServer': {

            'client': {

                'logging': 'none'
            },
            'devMiddleware': {

                'publicPath': '/'
            },
            'static': {

                'directory': path.resolve(__dirname, 'sandboxes', 'distribution')
            }
        },
        'devtool': 'inline-source-map',
        'infrastructureLogging': {

            'level': 'none'
        },
        'mode': 'development'
    });
}

module.exports = configuration;
