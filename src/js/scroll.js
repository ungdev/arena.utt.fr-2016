const smoothScroll = require('smooth-scroll/dist/js/smooth-scroll');

const $menu      = document.querySelector('.a-menu');
const $nav       = document.querySelector('.a-mobile-menu');
const $scrollers = Array.from(document.querySelectorAll('[data-scroll]'));


let isMenuFixed;
let offset;

setTimeout(() => {
    isMenuFixed = $menu.classList.contains('a-menu--fixed-top');
    offset = isMenuFixed ? 0 : -75;
}, 50);

$scrollers.forEach(function ($item) {
    $item.addEventListener('click', function () {
        const $target = $item.getAttribute('href');

        if ($target === '#a-anchor--event') {
            offset = 0;
        }

        smoothScroll.animateScroll($target, $item, {
            speed: 750,
            easing: 'easeOutQuart',
            offset: offset,
            updateURL: false
        });

        $nav.classList.remove('a-mobile-menu--visible');
    }, false);
});
