module.exports = {

    'handlers': {

        'jsdocCommentFound': ($event) => {

            if (typeof $event.comment !== 'string') {

                return;
            }

            if ($event.comment === '') {

                return;
            }

            $event.comment = $event.comment.replace(/\{\s*typeof\s+([^\s]+)\s*\}/g, '{Class<$1>}');
        }
    }
};
