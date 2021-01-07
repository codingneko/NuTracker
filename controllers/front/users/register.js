const helpers = require('../../../helpers')

module.exports =  (req, res) => {
    if (typeof req.session.sessionToken === 'undefined') {
        res.render('pages/register', {
            notification: helpers.getNotifications(req)
        });
    } else {
        res.redirect('/');
    }
}