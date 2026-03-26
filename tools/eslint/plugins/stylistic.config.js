import plugin from '@stylistic/eslint-plugin';

const rules = plugin.configs['all'];

const configuration = {

    ...rules,
    'plugins': {

        '@stylistic': plugin
    },
    'rules': {

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
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/quote-props': ['error', 'consistent'],
        '@stylistic/space-before-function-paren': ['error', {'named': 'never'}],
        '@stylistic/space-unary-ops': 'off'
    }
};

export default configuration;
