const crypto = require('crypto');
const url    = require('url');
const btoa   = require('btoa');
const atob   = require('atob');

const { User } = require('./db');

const { isAuth } = require('./passport');

const config = require('../config.json');

const serialize   = str => `s:${str.length}:"${str}";`;
const unserialize = str => str.split(':').slice(2).join(':').slice(1, -2);
const base64_decode = enc => atob(enc);
const base64_encode = bytes => btoa(bytes);

const encrypt = payload => {
    const iv  = crypto.randomBytes(16);
    const key = new Buffer(config.etupay.key, 'base64');

    console.log('IV', iv.toString('base64'));
    console.log('KEY', key.toString('base64'));

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let value    = cipher.update(serialize(JSON.stringify(payload)), 'utf8');

    value = Buffer.concat([value, cipher.final()]).toString('base64');

    console.log('VALUE', value.toString('base64'));

    const mac = crypto
        .createHmac('sha256', new Buffer(config.etupay.key, 'base64'))
        .update(iv.toString('base64') + value).digest('hex');

    console.log('MAC', mac);

    const json = JSON.stringify({
        iv   : iv.toString('base64'),
        value: value,
        mac
    });

    return base64_encode(json);
};

const decrypt = crypted => {
    let { iv, value, mac } = JSON.parse(base64_decode(crypted));


    const key = new Buffer(config.etupay.key, 'base64');
    iv        = new Buffer(iv, 'base64');
    value     = new Buffer(value, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let payload    = decipher.update(value, 'utf8');

    payload = Buffer.concat([payload, decipher.final()]);

    const checkMac = crypto
        .createHmac('sha256', new Buffer(config.etupay.key, 'base64'))
        .update(iv.toString('base64') + value.toString('base64')).digest('hex');

    if (checkMac === mac /* crypto.areKeysEqual */) {
        return unserialize(payload.toString());
    }
};

module.exports = app => {
    app.post('/etupay', (req, res) => {
        if (isAuth(req)) {
            const EURO = 100;

            console.log(req.body);

            const items = [
                { name: 'Place UTT Arena', price: 10 * EURO, quantity: 1 }
            ];

            if (req.body.shirt) {
                req.body.shirt = JSON.parse(req.body.shirt);
                items.push({ name: `T-Shirt ${req.body.shirt.gender} ${req.body.shirt.size}`, price: 10 * EURO, quantity: 1 });
            }

            if (req.body.ethernet) {
                items.push({ name: 'Cable reseau 5m', price: 7 * EURO, quantity: 1 });
            }

            if (req.body.menu) {
                items.push({ name: 'Menu nourriture', price: 4.5 * EURO, quantity: 1 });
            }

            if (req.body.visit) {
                items.push({ name: 'Place visiteur', price: 10 * EURO, quantity: 1 });
            }

            const name = req.session.passport.user.name.split(' ');
            const firstname = name.shift();
            const lastname  = name.join(' ');

            const basket = {
                type        : 'checkout',
                amount      : items.map(item => item.price).reduce((a, b) => a + b, 0),
                client_mail : req.session.passport.user.email,
                firstname   : firstname,
                lastname    : lastname,
                description : 'Inscription UTT Arena 2016',
                articles    : items,
                service_data: req.session.passport.user.id,
            };

            console.log('basket is', basket);

            const serviceId = config.etupay.id;
            const url       = config.etupay.url;
            const payload   = encrypt(basket);

            return res.redirect(`${url}?service_id=${serviceId}&payload=${payload}`);
        } else {
            return res.redirect('/error');
        }
    });

    const callback = (req, res) => {
        if (req.query.payload) {
            req.session.payload = req.query.payload;
            res.redirect(url.parse(req.originalUrl).pathname);
        }

        const payload = JSON.parse(decrypt(req.body.payload || req.session.payload));

        if (!payload) {
            return res.status(500).end();
        }

        if (payload && payload.service_data) {
            payload.step = payload.step.toLowerCase();

            User
                .findById(payload.service_data)
                .then(user => {
                    user.transactionId    = payload.transaction_id;
                    user.transactionState = payload.step;

                    return user.save();
                })
                .then(() => {
                    if (req.route.path === '/callback') {
                        // callback needs to answer 302
                        return res.redirect('/success');
                    } else {
                        return res.render('etupay', {
                            status: payload.step
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).json(err).end();
                });
        } else {
            return res.status(500).json({ err: 'Missing payload or service_data' }).end();
        }
    };

    app.use('/callback', callback);
    app.use('/success', callback);
    app.use('/error', callback);
};
