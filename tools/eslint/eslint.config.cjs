module.exports = {

    'env': {

        'browser': true,
        'es6': true
    },
    'extends': [

        'eslint:all',

        'plugin:@stylistic/all-extends',
        'plugin:jsdoc/recommended-error'
    ],
    'parserOptions': {

        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [

        '@stylistic',
        'jsdoc'
    ],
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
        'no-bitwise': 'off',
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

        '@stylistic/array-element-newline': 'off',
        '@stylistic/brace-style': ['error', 'stroustrup'],
        '@stylistic/dot-location': ['error', 'property'],
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],
        '@stylistic/indent': ['error', 4, {'MemberExpression': 0, 'SwitchCase': 1}],
        '@stylistic/indent-binary-ops': ['error', 0],
        '@stylistic/multiline-ternary': ['error', 'never'],
        '@stylistic/no-extra-parens': 'off',
        '@stylistic/object-property-newline': ['error', {'allowAllPropertiesOnSameLine': true}],
        '@stylistic/operator-linebreak': ['error', 'none', {'overrides': {'&&': 'before', '||': 'before'}}],
        '@stylistic/padded-blocks': ['error', 'start'],
        '@stylistic/quotes': ['error', 'single', {'allowTemplateLiterals': false}],
        '@stylistic/quote-props': ['error', 'consistent'],
        '@stylistic/space-before-function-paren': ['error', {'named': 'never'}],
        '@stylistic/space-unary-ops': 'off',

        'jsdoc/newline-after-description': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/tag-lines': 'off'
    },
    'settings': {

        'jsdoc': {

            'mode': 'typescript'
        }
    }
};
