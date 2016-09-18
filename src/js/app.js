require('../css/index.css');

require('./sticky.js');
require('./scroll.js');
require('./menu.js');
require('./countdown.js');
require('./modal.js');
require('./tabs.js');
require('./login.js');
require('./dashboard.js');
require('./payment.js');

if (navigator.userAgent.indexOf('Firefox') > -1) {
    document.body.classList.add('a--firefox');
}
