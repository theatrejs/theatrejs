import plugin from '@cspell/eslint-plugin';
import rules from '@cspell/eslint-plugin/recommended';

const configuration = {

    ...rules,
    'plugins': {

        '@cspell': plugin
    },
    'rules': {

        '@cspell/spellchecker': ['error', {

            'checkComments': true,
            'checkIdentifiers': true,
            'checkStrings': true,
            'checkStringTemplates': true,
            'cspell': {

                'ignoreWords': [

                    'aabb',
                    'azerty',
                    'deadzone',
                    'debouncer',
                    'eventbus',
                    'gamepadanalog',
                    'gamepadconnect',
                    'gamepadconnected',
                    'gamepaddisconnected',
                    'gamepaddown',
                    'gamepadup',
                    'gamepadvibrate',
                    'gravityanalog',
                    'gravitydown',
                    'gravityup',
                    'gyroscopeanalog',
                    'gyroscopedown',
                    'gyroscopeup',
                    'highp',
                    'midiinputanalog',
                    'midiinputdown',
                    'midiinputup',
                    'midimessage',
                    'midioutput',
                    'pathfinding',
                    'pointeranalog',
                    'preloadable',
                    'preloadables',
                    'timecode',
                    'timetick',
                    'unmimic',
                    'unmimics',
                    'uvmapping',
                    'uvmappings',
                    'webgpu'
                ]
            }
        }]
    }
};

export default configuration;
