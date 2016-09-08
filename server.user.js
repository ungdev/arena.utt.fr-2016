const bcrypt   = require('bcrypt-nodejs');
const passport = require('passport');
const { User } = require('./server.db');

module.exports = function (app) {
    app.post(
        '/login',
        passport.authenticate('local'),
        (req, res) => {
            return res
                .status(200)
                .json({ user: req.user })
                .end();
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        return res.redirect('/');
    });

    app.post('/register', (req, res) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }

            bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).end();
                }

                if (req.body.password.length < 6) {
                    return res.status(400).json({ error: 'pwdlen' });
                }

                if (req.body.name.length < 6) {
                    return res.status(400).json({ error: 'namelen' });
                }

                req.body.password = hash;

                const user = User
                    .build(req.body)
                    .save()
                    .then(() => res.status(200).end())
                    .catch(err => {
                        console.log(err);
                        if (err.name === 'SequelizeValidationError') {
                            return res.status(400).json({ error: 'mail' }).end();
                        }

                        if (err.name === 'SequelizeUniqueConstraintError') {
                            const field = err.errors[0].path;
                            return res.status(400).json({ error: 'duplicate', field }).end();
                        }

                        return res.status(500).end();
                    });
            });
        });
    });
};
