var helpers = require('../../helpers');
var User = require('../../models/User');
var Nut = require('../../models/Nut');

module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);

    var users = [];
    var dbUsers = await User.find().limit(20);
    dbUsers.forEach(user => {
        var frontUser = {}
        Nut.find({
            userId: user._id
        }).then(nuts => {
            frontUser.nutCount = nuts.length;
            frontUser.name = user.username;

            users.push(frontUser);
    
            users.sort((a, b) => {
                return b.fapCount - a.fapCount
            });

            res.render("pages/index", {
                users: users,
                loggedInUser: loggedInUser,
                notifications: helpers.getNotifications(req)
            });
        });
    });
}