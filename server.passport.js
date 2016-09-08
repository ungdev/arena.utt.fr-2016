const LocalStrategy = require('passport-local').Strategy;
const { User }      = require('./server.db');

module.exports = new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
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
                    return done(err, false);
                });
        })
        .catch(err => {
            return done(err, false)
        });
});
