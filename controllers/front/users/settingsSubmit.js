const helpers = require("../../../helpers")
const User = require("../../../models/User")

module.exports = async (req, res) => {
    try {
        var user = await User.findOneAndUpdate({
            username: await helpers.getLoggedInUser(req)
        }, {
            username: req.body.username,
            avatar: req.body.avatar
        });

        res.redirect('/settings');
        helpers.addNotification(req, 'Your data was successfuly updated');
    } catch (err) {
        console.log(err);
    }
    
}