const helpers = require("../../../helpers");
const User = require("../../../models/User");

module.exports = async (req, res) => {
    var user = await User.findOne({
        username: await helpers.getLoggedInUser(req)
    });

    if (user) {
        res.render("pages/custom-nut", {
            loggedInUser: user.username,
            user: user,
            notifications: helpers.getNotifications(req)
        });
    } else {
        res.status(401).redirect('/login');
    }
    
}