var helpers = require('../../helpers');

module.exports = (req, res) => {
    var loggedInUser = helpers.getLoggedInUser(req);

    var users = [];
    req.app.locals.db.get('users').value().forEach(user => {
        users.push(user.username);
    });

    res.render("pages/index", {
        users: users,
        loggedInUser: loggedInUser,
        notifications: helpers.getNotifications(req)
    });
}