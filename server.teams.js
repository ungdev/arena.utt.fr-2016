const { isAuth }                = require('./server.passport');
const { User, Team, Spotlight } = require('./server.db');

module.exports = app => {
    app.post('/createTeam', (req, res) => {
        if (!isAuth(req)) {
            return res.status(401).end();
        }

        if (req.session.passport.user.team) {
            return res.status(400).json({ error: 'alreadyInteam' }).end();
        }

        if (req.body.name.length < 6) {
            return res.status(400).json({ error: 'teamlen' }).end();
        }

        if (!req.body.spotlight) {
            return res.status(400).json({ error: 'spotlight' }).end();
        }

        let team;
        let capitain;

        Team
            .build({
                name       : req.body.name,
                capitainId : req.session.passport.user.id,
                spotlightId: req.body.spotlight
            })
            .save()
            .then(createdTeam => {
                team = createdTeam;
                return User.findById(req.session.passport.user.id)
            })
            .then(user => {
                capitain = user;
                user.accepted = true;
                return user.save();
            })
            .then(() => {
                return capitain.setTeam(team);
            })
            .then(() => res.status(200).end())
            .catch(err => {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    return res.status(400).json({ err: 'duplicate' });
                }

                return res.status(500).end();
            });
    });

    app.post('/joinTeam', (req, res) => {
        if (!isAuth(req)) {
            return res.status(401).end();
        }

        if (req.session.passport.user.team) {
            return res.status(400).json({ error: 'alreadyInteam' }).end();
        }

        if (!req.body.name || req.body.name.length < 6) {
            return res.status(400).json({ error: 'name' }).end();
        }

        let team;

        Team
            .findOne({ where: { name: req.body.name }, include: [ User, Spotlight ] })
            .then(joinTeam => {
                team = joinTeam;

                console.log('LEN', team.users.length);
                console.log('MAX', team.spotlight.maxInTeam);
                if (team.users.length >= team.spotlight.maxInTeam) {
                    throw 'full';
                }

                return User.findById(req.session.passport.user.id);
            })
            .then(fullUser => fullUser.setTeam(team))
            .then(() => res.status(200).end())
            .catch(err => {
                if (err === 'full') {
                    return res.status(400).json({ error: 'full' }).end();
                }

                console.error(err);
                return res.status(500).end();
            });
    });

    app.post('/allowPlayer', (req, res) => {
        if (!isAuth(req)) {
            return res.status(401).end();
        }

        const capitain = req.session.passport.user;

        if (!capitain.team || capitain.team.capitainId !== capitain.id) {
            return res.status(400).json({ error: 'team' }).end();
        }

        if (!req.body.id) {
            return res.status(400).json({ error: 'id' }).end();
        }

        User
            .findById(req.body.id)
            .then(user => {
                user.accepted = true;

                return user.save();
            })
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);

                return res.status(500).end();
            });
    });

    app.post('/denyPlayer', (req, res) => {
        if (!isAuth(req)) {
            return res.status(401).end();
        }

        const capitain = req.session.passport.user;

        if (!capitain.team || capitain.team.capitainId !== capitain.id) {
            return res.status(400).json({ error: 'team' }).end();
        }

        if (!req.body.id) {
            return res.status(400).json({ error: 'id' }).end();
        }

        User.findById(req.body.id)
            .then(user => {
                return user.setTeam(null);
            })
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                return res.status(500).end();
            });
    });
};
