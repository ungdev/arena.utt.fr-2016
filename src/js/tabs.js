const $tabs = Array.from(document.querySelectorAll('.a-tabs__tab'));

const activatePanel = function ($sourceTab) {
    const $tabContainer   = $sourceTab.parentElement;
    const $panelContainer = $tabContainer.nextElementSibling;

    const $activePanel = $panelContainer.querySelector('.a-panels__panel--active');
    $activePanel.classList.remove('a-panels__panel--active');

    const $activeTab = $tabContainer.querySelector('.a-tabs__tab--active');
    const index      = Array.from($tabContainer.children).indexOf($activeTab);
    const $newTab    = $panelContainer.children[index];
    $newTab.classList.add('a-panels__panel--active');
};

$tabs.forEach($tab => {
    $tab.addEventListener('click', e => {
        e.preventDefault();

        const $activeTab = $tab.parentElement.querySelector('.a-tabs__tab--active');
        $activeTab.classList.remove('a-tabs__tab--active');

        $tab.classList.toggle('a-tabs__tab--active');

        activatePanel($tab);
    });
});

