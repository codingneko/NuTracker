const axios = require('axios');
const helpers = require('../../../helpers');

module.exports = async (req, res) => {
    var requestData = {
        username: req.body.username,
        password: req.body.password,
    };

    var responseData = await axios({
        method: 'post',
        url: req.app.locals.base_url + '/api/register',
        data: requestData,
    }).catch((err) => {
        helpers.addNotification(
            req,
            'Something went wrong, server returned ' + err.response.status
        );
        res.redirect('/login');
    });

    if (responseData.data.status === 'Success') {
        helpers.addNotification(
            req,
            'You have successfuly registered as ' +
                responseData.data.newUser +
                '. Go log in!'
        );
        res.redirect('/');
    } else {
        res.status('500');
        res.redirect('/register');
    }
};
