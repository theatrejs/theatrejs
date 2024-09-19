module.exports = {

    'handlers': {

        'jsdocCommentFound': ($event) => {

            if (typeof $event.comment !== 'string') {

                return;
            }

            if ($event.comment === '') {

                return;
            }

            $event.comment = $event.comment.replace(/typeof\s+([A-Z][A-Za-z0-9]*)/g, 'Class<$1>');
        }
    }
};
