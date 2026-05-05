import plugin from 'eslint-plugin-playwright';

const rules = plugin.configs['flat/recommended'].rules;

const configuration = {

    'files': ['tests/**'],
    'plugins': {

        'playwright': plugin
    },
    'rules': {

        ...rules,
        'playwright/no-useless-await': 'error'
    }
};

export default configuration;
