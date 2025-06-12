module.exports = {

    'env': {

        'browser': true,
        'es6': true
    },
    'extends': [

        'eslint:all'
    ],
    'parserOptions': {

        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [

        'jsdoc'
    ],
    'rules': {

        'arrow-body-style': 'off',
        'class-methods-use-this': 'off',
        'complexity': 'off',
        'func-style': 'off',
        'id-length': 'off',
        'init-declarations': 'off',
        'max-classes-per-file': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-params': 'off',
        'max-statements': 'off',
        'no-bitwise': 'off',
        'no-empty-function': 'off',
        'no-implicit-coercion': 'off',
        'no-lonely-if': 'off',
        'no-magic-numbers': 'off',
        'no-new': 'off',
        'no-shadow': 'off',
        'no-ternary': 'off',
        'no-undefined': 'off',
        'no-useless-constructor': 'off',
        'no-useless-return': 'off',
        'no-void': 'off',
        'object-shorthand': 'off',
        'one-var': 'off',
        'prefer-template': 'off',

        'jsdoc/no-undefined-types': 'error'
    }
};
