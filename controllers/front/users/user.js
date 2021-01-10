const axios = require('axios');
const helpers = require('../../../helpers');
module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);

    //render results
    const nuts = await axios.get(`http://localhost:${req.app.locals.port}/api/user/${req.params.user}`);
    
    res.render('pages/user', {
        loggedInUser: loggedInUser, 
        user: req.params.user,
        nuts: nuts.data,
        notifications: helpers.getNotifications(req)
    });
}