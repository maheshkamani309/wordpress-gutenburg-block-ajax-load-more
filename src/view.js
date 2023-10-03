/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

if (typeof window.makAjaxLoadFunction == 'undefined') {
    window.makAjaxLoadFunction = function (args) {
        console.log(args)
    };
}
document.addEventListener('DOMContentLoaded', function () {
    // Find all elements with a specific class
    const elements = document.querySelectorAll('.mak-ajax-load-more');

    // Check if elements with the class were found
    if (elements.length === 0) {
        console.log('No block for mak ajax load more');
    } else {
        // Loop through each element and perform an action
        elements.forEach(function (element) {

            const button = element.getElementsByClassName('mak-load-more-btn');
            let settings = JSON.parse(element.dataset['json']);
            if (button.length > 0) {
                button[0].addEventListener('click', async function () {
                    fetch(settings.ajaxUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(settings).toString(),
                    }) // wrapped
                        .then(res => res.json())
                        .then(data => {
                            element.getElementsByClassName('mak-ajax-load-more-posts-list')[0].insertAdjacentHTML("beforeend", data.data.html);
                            settings.currentPage += 1;
                            if (settings.maxNumPages == settings.currentPage) {
                                button[0].style.visibility = "hidden";
                            }
                        })
                        .catch(err => console.log(err));
                })
            } else {
                const button = element.getElementsByClassName('mak-infimate-load-btn')[0];
                // Create an Intersection Observer to watch the button
                const buttonObserver = new IntersectionObserver(function (entries) {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Button is in the viewport, load more content
                            fetch(settings.ajaxUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: new URLSearchParams(settings).toString(),
                            }) // wrapped
                                .then(res => res.json())
                                .then(data => {
                                    element.getElementsByClassName('mak-ajax-load-more-posts-list')[0].insertAdjacentHTML("beforeend", data.data.html);
                                    settings.currentPage += 1;
                                    if (settings.maxNumPages == settings.currentPage) {
                                        button.style.visibility = "hidden";
                                    }
                                })
                                .catch(err => console.log(err));
                        }
                    });
                });
                // Start observing the button
                buttonObserver.observe(button);
            }
        });
    }
})