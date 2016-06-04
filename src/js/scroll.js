const smoothScroll = require('smooth-scroll/dist/js/smooth-scroll');

smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: '[data-scroll-header]',
    speed: 750,
    easing: 'easeOutQuart',
    offset: 0,
    updateURL: false
});
