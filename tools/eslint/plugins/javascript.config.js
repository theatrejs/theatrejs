import plugin from '@eslint/js';

const rules = plugin.configs['all'];

const configuration = {

    ...rules,
    'plugins': {

        'javascript': plugin
    },
    'rules': {

        'arrow-body-style': 'off',
        'class-methods-use-this': 'off',
        'complexity': 'off',
        'default-case': 'off',
        'func-style': 'off',
        'id-length': 'off',
        'init-declarations': 'off',
        'max-classes-per-file': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-params': 'off',
        'max-statements': 'off',
        'new-cap': 'off',
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-empty-function': 'off',
        'no-implicit-coercion': 'off',
        'no-lonely-if': 'off',
        'no-magic-numbers': 'off',
        'no-new': 'off',
        'no-shadow': 'off',
        'no-ternary': 'off',
        'no-undefined': 'off',
        'no-use-before-define': ['error', {'classes': false, 'functions': false}],
        'no-useless-constructor': 'off',
        'no-useless-return': 'off',
        'no-void': 'off',
        'object-shorthand': 'off',
        'one-var': 'off',
        'prefer-template': 'off',
        'sort-imports': 'error'
    }
};

export default configuration;
