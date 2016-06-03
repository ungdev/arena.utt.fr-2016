const $sticky  = document.querySelector('.a-menu');
const waypoint = parseInt(getComputedStyle($sticky).top, 10);

const toggleClass = top => {
    if (top >= waypoint) {
        $sticky.classList.add('a-menu--fixed-top');
    } else {
        $sticky.classList.remove('a-menu--fixed-top');
    }
}

let previousTop = window.scrollY;
const checker = () => {
    requestAnimationFrame(checker);

    const top = window.scrollY;

    if (previousTop === top) {
        return;
    }

    previousTop = top;

    toggleClass(top);
};

checker();

// Initial check
toggleClass(window.scrollY);
