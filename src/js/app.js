require('../css/index.css');

// Require assets to be copied
const imgDir   = require.context('../img', true, /.*/);
const fontsDir = require.context('../fonts', true, /.*/);

imgDir.keys().forEach(img => imgDir(img));
fontsDir.keys().forEach(font => fontsDir(font));

require('./sticky.js');
require('./scroll.js');
require('./menu.js');
require('./countdown.js');
require('./modal.js');
