const $modalOpeners = Array.from(document.querySelectorAll('[data-modal]'));
const $modalCloser  = document.querySelector('.a-modal__closer');

function elasticTransition ($modal) {
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

        const $modal = document.querySelector($modalOpener.getAttribute('data-modal'));

        if ($modal) {
            elasticTransition($modal);
            $modal.classList.add('a-modal--opened');
        }

    }, false);
});

$modalCloser.addEventListener('click', e => {
    e.preventDefault();

    const $activeModal = document.querySelector('.a-modal.a-modal--opened');
    elasticTransition($activeModal);

    $activeModal.classList.remove('a-modal--opened');
}, false);
