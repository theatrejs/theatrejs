/**
 * Listens to an event from the page.
 * @param {import('@playwright/test').Page} $page The page context.
 * @param {string} $event The event to listen to.
 * @returns {Promise<boolean>}
 */
function listen($page, $event) {

    return $page.evaluate(

        ($event) => {

            return new Promise((resolve) => {

                const resolver = () => (resolve(true));

                window.addEventListener($event, resolver, {'once': true});
            });
        },
        $event
    );
}

/**
 * Sends an event to the page.
 * @param {import('@playwright/test').Page} $page The page context.
 * @param {string} $event The event to send.
 * @returns {Promise<boolean>}
 */
function send($page, $event) {

    return $page.evaluate(

        ($event) => {

            return window.dispatchEvent(new CustomEvent($event));
        },
        $event
    );
}

export {

    listen,
    send
};
