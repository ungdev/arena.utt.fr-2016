const config          = require('./config.json');
const passport        = require('passport');
const express         = require('express');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const serveStatic     = require('serve-static');
const session         = require('express-session');
const compression     = require('compression');
const helmet          = require('helmet');
const logger          = require('./server/log');
const { isAuth }      = require('./server/passport');
const isSpotlightFull = require('./server/full');

// Database connection
const { sequelize, User, Team, Spotlight } = require('./server/db');

// Auth strategy
passport.use(require('./server/passport'));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Web server
const app = express();

app.use(compression());
app.use(helmet());
app.use(cookieParser(config.secret, { secure: config.isHTTPS, sameSite: 'strict' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

if (config.disableCache) {
    app.disable('view cache');
}

require('./server/user')(app);
require('./server/teams')(app);
require('./server/etupay')(app);

app.get('/pass', (req, res) => {
    if (isAuth(req)) {
        console.log('send pdf');
    } else {
        res.redirect('/');
    }
});

app.get(
    '/dashboard',
    (req, res) => {
        if (isAuth(req)) {
            let user;
            let spotlights;

            User
                .findById(req.session.passport.user.id, {
                    include: [ { model: Team, include: [ User ] } ]
                })
                .then(user_ => {
                    user = user_.toJSON();

                    return Spotlight.findAll({
                        include: [ { model: Team, include: [ User ] } ]
                    });
                })
                .then(spotlights_ => {
                    spotlights = spotlights_.map(spotlight => spotlight.toJSON());

                    return Promise.all(
                        spotlights.map(spotlight => isSpotlightFull.fromModel(spotlight))
                    );
                })
                .then(areSpotlightFull => {
                    spotlights.forEach((spotlight, i) => {
                        spotlight.isFull = areSpotlightFull[i];
                    });

                    return Team.findAll();
                })
                .then(teams_ => {
                    const teams = teams_.map(team => team.toJSON());

                    res.render('dashboard', { user, spotlights, config, teams });
                })
                .catch(err => {
                    res.status(500).end();
                });
        } else {
            res.redirect('/');
        }
    }
);

// Disable dashboard.html file
app.get('dashboard.html', (req, res) => res.status(404).end());

// Redirect to dashboard if connected
app.get(/\/(index.html)?$/, (req, res) => {
    const isLoggedIn   = isAuth(req);
    const disableLogin = config.disableLogin;
    res.render('index', { isLoggedIn, disableLogin });
});

app.use(serveStatic('public/', { maxAge: '7 days' }));

sequelize
    .sync({ force: config.db.reset })
    .then(() => {
        return Spotlight
            .findOrCreate({ where: { name: 'League of Legends', max: 32, maxInTeam: 5, minInTeam: 5 } })
            .then(() => Spotlight.findOrCreate({ where: { name: 'Hearthstone', max: 24, maxInTeam: 1, minInTeam: 1 } }))
            .then(() => Spotlight.findOrCreate({ where: { name: 'Overwatch', max: 16, maxInTeam: 6, minInTeam: 6 } }))
    })
    .then(() => {
        app.listen(8080, () => {
            logger.info('Listenning on port 8080');
        });
    });
