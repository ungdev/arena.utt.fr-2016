const $tabs = Array.from(document.querySelectorAll('.a-category__tabs__tab'));

const activatePanel = function ($sourceTab) {
    const $tabContainer   = $sourceTab.parentElement;
    const $panelContainer = $tabContainer.nextElementSibling;


    const $activeTab = $tabContainer.querySelector('.a-category__tabs__tab--active');

    const index = Array.from($tabContainer.children).indexOf($activeTab);

    $panelContainer.querySelector('.a-category__panels__panel--active').classList.remove('a-category__panels__panel--active');

    $panelContainer.children[index].classList.add('a-category__panels__panel--active');
};

$tabs.forEach($tab => {
    $tab.children[0].addEventListener('click', e => {
        e.preventDefault();

        const $activeTab = $tab.parentElement.querySelector('.a-category__tabs__tab--active');
        $activeTab.classList.remove('a-category__tabs__tab--active');

        $tab.classList.toggle('a-category__tabs__tab--active');

        activatePanel($tab);
    });
});
