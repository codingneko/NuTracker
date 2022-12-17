const User = require('../../../models/User');
const UserRepo = require('../../repository/UserRepo');
const Nut = require('../../../models/Nut');

module.exports = async (req, res) => {
    var user = await UserRepo.getUser(req.params.user);

    if (user !== null) {
        user[0].rank = await UserRepo.getUserRank(user[0]);
        user[0].nuts.sort((a, b) => b.date - a.date);
        res.json(user[0]);
    } else {
        res.status(404).json({
            status: 'User not found.',
        });
    }
};
