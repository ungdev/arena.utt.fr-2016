const $anchors = Array.from(document.querySelectorAll('.a-dashboard [data-scroll]'));

if ($anchors.length > 0) {
    $anchors.forEach($anchor => {
        $anchor.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const $active = document.querySelector('.a-anchor--active');
            const $target = document.querySelector($anchor.getAttribute('href'));

            $active.classList.remove('a-anchor--active');
            $target.classList.add('a-anchor--active');
        });
    });
}
