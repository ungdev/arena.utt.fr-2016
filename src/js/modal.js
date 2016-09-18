const $modal        = document.querySelector('.a-modal');
const $modalOpeners = Array.from(document.querySelectorAll('[data-modal]'));
const $modalCloser  = document.querySelector('.a-modal__closer');
const $switchers    = Array.from(document.querySelectorAll('.a-modal__switch'));

let opened = false;

const animationend = (() => {
    const el = document.createElement('fakeelement');
    const animations = {
        'animation'      : 'animationend',
        'OAnimation'     : 'oAnimationEnd',
        'MozAnimation'   : 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
    };

    for(let t of Object.keys(animations)) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
})();

const once = (elem, name, listener) => {
    const onceListener = () => {
        elem.removeEventListener(name, onceListener);

        listener();
    };

    elem.addEventListener(name, onceListener, false);
};

$modalOpeners.forEach($modalOpener => {
    $modalOpener.addEventListener('click', e => {
        e.preventDefault();

        if (opened) {
            return;
        }

        opened = true;

        $modal.classList.add('a--animated');
        $modal.classList.add('a--bounceIn');

        once($modal, animationend, () => {
            $modal.classList.remove('a--animated');
            $modal.classList.remove('a--bounceIn');
            $modal.classList.remove('a-modal--hidden');
        });

        document.getElementById('loginNickname').focus();
    }, false);
});

$switchers.forEach($switcher => {
    $switcher.addEventListener('click', e => {
        e.preventDefault();

        $modal.classList.toggle('a-modal--switched');

        if ($modal.classList.contains('a-modal--switched')) {
            document.getElementById('registerNickname').focus();
        } else {
            document.getElementById('loginNickname').focus();
        }
    });
});

if ($modalCloser) {
    $modalCloser.addEventListener('click', e => {
        e.preventDefault();

        opened = false;

        $modal.classList.add('a--animated');
        $modal.classList.add('a--bounceOut');

        once($modal, animationend, () => {
            $modal.classList.remove('a--animated');
            $modal.classList.remove('a--bounceOut');
            $modal.classList.add('a-modal--hidden');
        });
    }, false);
}
