document.addEventListener('DOMContentLoaded', () => {
    const scope = document.body;
    const tag = 'dialog';
    const fn = dialogPolyfill.registerDialog;

    // polyfill existing dialogs
    [].forEach.call(
        scope.getElementsByTagName(tag),
        fn
    );

    // polyfill new dialogs
    (new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            [].forEach.call(
                mutation.addedNodes,
                node => {
                    if(node.nodeName.toLowerCase() === tag)
                        fn(node);
                    else if(node.getElementsByTagName)
                        [].forEach.call(
                            node.getElementsByTagName(tag),
                            fn
                        );
                }
            );
        });
    })).observe(
        scope,
        {
            childList: true,
            subtree: true
        }
    );
});