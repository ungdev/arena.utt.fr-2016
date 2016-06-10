const smoothScroll = require('smooth-scroll/dist/js/smooth-scroll');

const $nav = document.querySelector('.a-mobile-menu');

smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: '[data-scroll-header]',
    speed: 750,
    easing: 'easeOutQuart',
    offset: 0,
    updateURL: false
});

[].slice.call(document.querySelectorAll('[data-scroll]')).forEach(function ($item) {
    $item.addEventListener('click', function () {
        $nav.classList.remove('a-mobile-menu--visible');
    }, false);
});
