const helpers = require('../../../helpers');

module.exports = (req, res) => {
    if (typeof req.session.sessionToken === 'undefined') {
        res.render('pages/login', {
            notifications: helpers.getNotifications(req)
        });
    } else {
        res.redirect('/');
    }
}