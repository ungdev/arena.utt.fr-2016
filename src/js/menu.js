const $menuItem   = document.querySelector('.a-menu__item--right-mobile');
const $mobileMenu = document.querySelector('.a-mobile-menu');

let isMenuOpen = false;

$menuItem.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if ($mobileMenu.classList.contains('a-mobile-menu--visible')) {
        $mobileMenu.classList.remove('a-mobile-menu--visible');
    } else {
        $mobileMenu.classList.add('a-mobile-menu--visible');
    }
}, false);
