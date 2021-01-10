var helpers = require('../../helpers');

module.exports = async (req, res) => {
    var loggedInUser = helpers.getLoggedInUser(req);

    var users = [];
    req.app.locals.db.get('users').value().forEach(user => {
        var frontUser = {}
        frontUser.fapCount = req.app.locals.db.get('faps').filter({userId: user.id}).value().length;
        frontUser.name = user.username;
        if (users.length < 20) users.push(frontUser);
    });
    
    users.sort((a, b) => {
        return b.fapCount - a.fapCount
    });

    res.render("pages/index", {
        users: users,
        loggedInUser: loggedInUser,
        notifications: helpers.getNotifications(req)
    });
}