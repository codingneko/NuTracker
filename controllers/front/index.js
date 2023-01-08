var helpers = require('../../helpers');
const UserRepo = require('../repository/UserRepo');
const NutRepo = require('../repository/NutRepo');

module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);
    var users = await UserRepo.getUserList(20);
    var latestNutters = await UserRepo.getUsersSortByLatestNut(20);

    res.render('pages/index', {
        users: users,
        loggedInUser: loggedInUser,
        latestNutters: latestNutters,
        notifications: helpers.getNotifications(req),
    });
};
