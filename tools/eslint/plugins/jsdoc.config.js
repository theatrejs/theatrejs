import plugin from 'eslint-plugin-jsdoc';

const rules = plugin.configs['flat/recommended-error'];

const configuration = {

    ...rules,
    'plugins': {

        'jsdoc': plugin
    },
    'rules': {

        'jsdoc/check-types': 'off',
        'jsdoc/reject-any-type': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/tag-lines': 'off'
    }
};

export default configuration;
