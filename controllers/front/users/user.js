const axios = require('axios');
const helpers = require('../../../helpers');
module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);
    var averageNutScore = 0;
    let nutsWithScore = 0;

    //render results
    const user = await axios.get(
        `${req.app.locals.base_url}/api/user/${req.params.user}`
    );

    user.data.nuts.forEach((nut) => {
        averageNutScore += Number(nut.score) || 0;
        if (nut.score) nutsWithScore++;
    });

    averageNutScore /= nutsWithScore;

    res.render('pages/user', {
        loggedInUser: loggedInUser,
        user: user.data,
        averageNutScore: averageNutScore,
        notifications: helpers.getNotifications(req),
    });
};
