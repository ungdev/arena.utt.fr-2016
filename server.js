const express     = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const helmet      = require('helmet');

const app = express();

app.use(compression());
app.use(serveStatic('public/'));
app.use(helmet());

app.listen(8080, () => {
    console.log('Listenning on port 8080');
});
