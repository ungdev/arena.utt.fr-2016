const $modalOpeners = [].slice.call(document.querySelectorAll('[data-modal]'));
const $modalCloser  = document.querySelector('.a-menu__item--close');

for (let $modalOpener of $modalOpeners) {
    $modalOpener.addEventListener('click', e => {
        e.preventDefault();

        const $modal = document.querySelector($modalOpener.getAttribute('data-modal'));

        if ($modal) {
            $modal.className += ' a-modal--opened';

            document.body.className = 'a-modal-opened';
        }

    }, false);
}

$modalCloser.addEventListener('click', e => {
    e.preventDefault();

    const $activeModal = document.querySelector('.a-modal.a-modal--opened');

    document.body.className = '';
    $activeModal.className = 'a-modal';
}, false);
