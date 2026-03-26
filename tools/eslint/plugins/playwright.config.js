import plugin from 'eslint-plugin-playwright';

const rules = plugin.configs['flat/recommended'];

const configuration = {

    ...rules,
    'files': ['tests/**'],
    'plugins': {

        'playwright': plugin
    },
    'rules': {

        'playwright/no-useless-await': 'error'
    }
};

export default configuration;
