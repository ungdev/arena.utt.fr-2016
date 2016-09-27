const logger    = require('./log');
const config    = require('../config.json');
const bcrypt    = require('bcrypt-nodejs')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pwd, {
    host   : config.db.host,
    dialect: config.db.dialect,
    logging: query => {
        logger.debug(query);
    }
});

const TRANSACTION_STATES = ['initialized', 'paid', 'authorization', 'refused', 'canceled', 'refunded'];

const User = sequelize.define('user', {
    name            : { type: Sequelize.STRING, unique: true },
    email           : { type: Sequelize.STRING, validate: { isEmail: true }, unique: true },
    password        : Sequelize.STRING,
    paid            : { type: Sequelize.BOOLEAN, defaultValue: false },
    shirt           : { type: Sequelize.ENUM('none', 'XS', 'S', 'M', 'L', 'XL'), defaultValue: 'none' },
    plusone         : { type: Sequelize.BOOLEAN, defaultValue: false },
    accepted        : { type: Sequelize.BOOLEAN, defaultValue: false },
    transactionId   : { type: Sequelize.INTEGER, defaultValue: 0 },
    transactionState: { type: Sequelize.ENUM(...TRANSACTION_STATES) },
    registerToken   : { type: Sequelize.UUID, unique: true, defaultValue: Sequelize.UUIDV4 }
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

const Team = sequelize.define('team', {
    name      : { type: Sequelize.STRING, unique: true },
    capitainId: { type: Sequelize.INTEGER },
});

const Spotlight = sequelize.define('spotlight', {
    name     : { type: Sequelize.STRING, unique: true },
    max      : { type: Sequelize.INTEGER },
    maxInTeam: { type: Sequelize.INTEGER, defaultValue: 5 },
    minInTeam: { type: Sequelize.INTEGER, defaultValue: 5 }
})

User.belongsTo(Team);
Team.hasMany(User);

Team.belongsTo(Spotlight);
Spotlight.hasMany(Team);

module.exports = { sequelize, User, Team, Spotlight };
