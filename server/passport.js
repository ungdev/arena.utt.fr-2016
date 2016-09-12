const LocalStrategy             = require('passport-local').Strategy;
const logger                    = require('./log');
const { User, Team, Spotlight } = require('./db');

module.exports = new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
    User
        .findOne({ where: { $or: [ { name }, { email: name } ] }, include: [
            { model: Team, include: [ User, Spotlight ] }
        ] })
        .then(user => {
            if (!user) {
                logger.warn('user', name, 'does not exists')
                return done(null, false);
            }

            user
                .validatePassword(password)
                .then(passwordOk => {
                    if (!passwordOk) {
                        logger.warn('user', name, 'doesnt have password to', password);
                        return done(null, false);
                    }

                    return done(null, user.toJSON());
                })
                .catch(err => {
                    return done(err, false);
                });
        })
        .catch(err => {
            return done(err, false)
        });
});

module.exports.isAuth = req => req.session && req.session.hasOwnProperty('passport') && req.session.passport.hasOwnProperty('user');
