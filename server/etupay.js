const crypto = require('crypto');
const btoa   = require('btoa');
const atob   = require('atob');

const { isAuth } = require('./passport');

const config = require('../config.json');

const serialize   = str => `s:${str.length}:"${str}";`;
const unserialize = str => str.split(':').pop();

const base64_decode = enc => atob(enc);
const base64_encode = bytes => btoa(bytes);

const encrypt = payload => {
    const iv = crypto.randomBytes(16);
    const key = new Buffer(config.etupay.key, 'base64');
    console.log('IV is', iv.toString('base64'));
    console.log('KEY is', key.toString('base64'));
    console.log('VALUE is', serialize(JSON.stringify(payload)));

    const cipher  = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(false);
    let value = cipher.update(serialize(JSON.stringify(payload)), 'utf8', 'base64');

    value + cipher.final('base64');

    console.log('encrypted is', value);

    console.log('createHmac', key, 'with', iv.toString('base64') + value);
    const mac = crypto.createHmac('sha256', new Buffer(config.etupay.key, 'base64')).update(iv.toString('base64') + value).digest('hex');

    const json = JSON.stringify({ iv: iv.toString('base64'), value, mac });

    return base64_encode(json);
};

const decrypt = crypted => {
    const { iv, value, mac } = JSON.parse(base64_decode(crypted));


    const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(config.etupay.key, 'base64'), new Buffer(iv, 'base64'));
    decipher.setAutoPadding(false);
    let payload    = decipher.update(value);

    payload += decipher.final();

    const checkMac = crypto.createHmac('sha256', config.etupay.key).update(iv + value).digest('hex');

    if (checkMac === mac /* crypto.areKeysEqual */) {
        return JSON.parse(unserialize(payload));
    }
};

module.exports = app => {
    app.get('/success', (req, res) => {
        res.render('etupay', {
            success: true
        });
    });

    app.get('/error', (req, res) => {
        res.render('etupay', {
            success: false
        });
    });

    app.post('/etupay', (req, res) => {
        if (isAuth(req)) {
            const EURO = 100;

            const items = [
                { name: 'Place pour l\'UTT Arena', price: 10 * EURO, quantity: 1 }
            ];

            if (req.body.shirt) {
                items.push({ name: `T-Shirt ${req.body.shirt.gender} ${req.body.shirt.size}`, price: 10 * EURO, quantity: 1 });
            }

            if (req.body.ethernet) {
                items.push({ name: 'Câble réseau 5 mètres', price: 7 * EURO, quantity: 1 });
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
                service_data: config.etupay.id
            };

            const serviceId = config.etupay.id;
            const url       = config.etupay.url;
            const payload   = encrypt(basket);

            return res.redirect(`${url}?service_id=${serviceId}&payload=${payload}`);
        } else {
            return res.redirect('/error');
        }
    });

    app.post('/callback', (req, res) => {
    });
};
