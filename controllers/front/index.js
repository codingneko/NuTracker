var helpers = require('../../helpers');
var User = require('../../models/User');
var Nut = require('../../models/Nut');
const UserRepo = require('../repository/UserRepo');
const NutRepo = require('../repository/NutRepo');

module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);
    var users = await UserRepo.getUserList(20);
    var latestNuts = await NutRepo.getLatestNuts(20);

    res.render('pages/index', {
        users: users,
        loggedInUser: loggedInUser,
        latestNuts: latestNuts,
        notifications: helpers.getNotifications(req),
    });
};
