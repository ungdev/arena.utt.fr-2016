const logger                    = require('./log');
const { Team, Spotlight, User } = require('./db');

const isTeamFull = (spotlight, team) => {
    const users = team.users.filter(user => user.accepted).length;

    return users <= spotlight.maxInTeam && users >= spotlight.minInTeam;
};

const isSpotlightFull = spotlight => {
    const teams = spotlight.teams
        .filter(team => isTeamFull(spotlight, team))
        .length;

    return teams === spotlight.max;
}

module.exports = id => {
    return Spotlight
        .findById(id, {
            include: [
                { model: Team, include: [ User ] }
            ]
        })
        .then(spotlight => {
            return isSpotlightFull(spotlight.toJSON());
        })
        .catch(err => {
            logger.error(err);
        })
};

module.exports.fromModel  = isSpotlightFull;
module.exports.isTeamFull = isTeamFull;
