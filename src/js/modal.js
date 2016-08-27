const $modal        = document.querySelector('.a-modal');
const $modalOpeners = Array.from(document.querySelectorAll('[data-modal]'));
const $modalCloser  = document.querySelector('.a-modal__closer');
const $switchers    = Array.from(document.querySelectorAll('.a-modal__switch'));

const elasticTransition = function ($modal) {
    $modal.style.transition = '.4s right cubic-bezier(0.175, 0.885, 0.320, 1.275)';
    $modal.clientWidth;
    setTimeout(() => {
        $modal.style.transition = '';
        $modal.clientWidth;
    }, 400);
}

$modalOpeners.forEach($modalOpener => {
    $modalOpener.addEventListener('click', e => {
        e.preventDefault();

        if ($modal) {
            elasticTransition($modal);
            $modal.classList.add('a-modal--opened');
        }

    }, false);
});

$switchers.forEach($switcher => {
    $switcher.addEventListener('click', e => {
        e.preventDefault();

        $modal.classList.toggle('a-modal--switched');
    });
});

$modalCloser.addEventListener('click', e => {
    e.preventDefault();

    elasticTransition($modal);

    $modal.classList.remove('a-modal--opened');
}, false);
