const config        = require('./config.json');
const bcrypt        = require('bcrypt-nodejs')
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Sequelize     = require('sequelize');
const express       = require('express');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const serveStatic   = require('serve-static');
const session       = require('express-session');
const compression   = require('compression');
const helmet        = require('helmet');

// Database connection
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pwd, {
    host: config.db.host,
    dialect: config.db.dialect
});

const User = sequelize.define('user', {
    name    : Sequelize.STRING,
    email   : { type: Sequelize.STRING, validate: { isEmail: true } },
    password: Sequelize.STRING,
    paid    : { type: Sequelize.BOOLEAN, defaultValue: false },
    shirt   : { type: Sequelize.ENUM('none', 'XS', 'S', 'M', 'L', 'XL'), defaultValue: 'none' }
}, {
    instanceMethods: {
        validatePassword (pwd) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(pwd, this.password, (err, res) => {
                    if (err) { return reject(err); }

                    resolve(res);
                });
            });
        }
    }
});

// Auth strategy
passport.use(new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
    User
        .findOne({ where: { $or: [ { name }, { email: name } ] } })
        .then(user => {
            if (!user) {
                console.log('user', name, 'does not exists')
                return done(null, false);
            }

            user
                .validatePassword(password)
                .then(passwordOk => {
                    if (!passwordOk) {
                        console.log('user', name, 'doesnt have password to', password);
                        return done(null, false);
                    }

                    return done(null, user.toJSON());
                })
                .catch(err => {
                    console.log('ERR', err);
                    return done(err, false);
                });
        })
        .catch(err => {
            console.log('ERR', err);
            return done(err, false)
        });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Web server
const app = express();

app.use(compression());
app.use(helmet());
app.use(cookieParser(config.secret, { secure: config.isHTTPS, sameSite: 'strict' }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

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

app.get(
    '/dashboard',
    (req, res, next) => {
        if (req.session && req.session.passport && req.session.passport.user) {
            next();
        } else {
            res.redirect('/');
        }
    },
    (req, res) => {
        res.render('dashboard');
    }
);

// Disable dashboard.html file
app.get('dashboard.html', (req, res) => res.status(404).end());

// Redirect to dashboard if connected
app.get(/\/(index.html)?$/, (req, res) => {
    const isLoggedIn = (req.session &&
        req.session.hasOwnProperty('passport') &&
        req.session.passport.hasOwnProperty('user'));
    console.log('REQ.SESSION', req.session.passport);
    console.log('isLoggedIn', isLoggedIn);
    res.render('index', { isLoggedIn });
});

app.use(serveStatic('public/'));

sequelize
    .sync()
    .then(() => {
        app.listen(8080, () => {
            console.log('Listenning on port 8080');
        });
    });
