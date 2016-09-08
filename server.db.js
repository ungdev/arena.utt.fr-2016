const config    = require('./config.json');
const bcrypt    = require('bcrypt-nodejs')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pwd, {
    host   : config.db.host,
    dialect: config.db.dialect
});

const User = sequelize.define('user', {
    name         : { type: Sequelize.STRING, unique: true },
    email        : { type: Sequelize.STRING, validate: { isEmail: true }, unique: true },
    password     : Sequelize.STRING,
    paid         : { type: Sequelize.BOOLEAN, defaultValue: false },
    shirt        : { type: Sequelize.ENUM('none', 'XS', 'S', 'M', 'L', 'XL'), defaultValue: 'none' },
    registerToken: { type: Sequelize.UUID, unique: true, defaultValue: Sequelize.UUIDV4 }
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

module.exports = { sequelize, User };
