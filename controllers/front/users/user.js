const axios = require('axios');
const helpers = require('../../../helpers');
module.exports = async (req, res) => {
    var loggedInUser = helpers.getLoggedInUser(req);

    //render results
    const faps = await axios.get(`http://localhost:${req.app.locals.port}/api/user/${req.params.user}`);
    
    res.render('pages/user', {
        loggedInUser: loggedInUser, 
        user: req.params.user,
        faps: faps.data,
        notifications: helpers.getNotifications(req)
    });
}