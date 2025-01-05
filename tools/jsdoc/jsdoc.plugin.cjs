module.exports = {

    'handlers': {

        'jsdocCommentFound': ($event) => {

            if (typeof $event.comment !== 'string') {

                return;
            }

            if ($event.comment === '') {

                return;
            }

            const regex = /typeof\s+([A-Z][A-Za-z0-9]*)(<.+>)?/g;

            while (regex.test($event.comment) === true) {

                $event.comment = $event.comment.replace(regex, 'Class<$1$2>');
            }
        }
    }
};
