const axios = require('axios');
const helpers = require('../../../helpers');
const NutRepo = require('../../repository/NutRepo');
module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);

    //render results
    const user = await axios.get(
        `${req.app.locals.base_url}/api/user/${req.params.user}`
    );

    res.render('pages/user', {
        loggedInUser: loggedInUser,
        user: user.data,
        averageNutScore: await NutRepo.getAverageScoreOfUser(
            user.data.username
        ),
        notifications: helpers.getNotifications(req),
    });
};
