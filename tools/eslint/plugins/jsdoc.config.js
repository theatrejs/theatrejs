import plugin from 'eslint-plugin-jsdoc';

const rules = plugin.configs['flat/recommended-error'].rules;

const configuration = {

    'plugins': {

        'jsdoc': plugin
    },
    'rules': {

        ...rules,
        'jsdoc/check-types': 'off',
        'jsdoc/reject-any-type': 'off',
        'jsdoc/require-returns-description': 'off',
        'jsdoc/tag-lines': 'off'
    }
};

export default configuration;
