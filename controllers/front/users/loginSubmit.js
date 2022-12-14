const axios = require('axios');
const helpers = require('../../../helpers');

module.exports = async (req, res) => {
    let requestData = {
        username: req.body.username,
        password: req.body.password,
    };

    let responseData = await axios({
        method: 'post',
        url: req.app.locals.base_url + '/api/login',
        data: requestData,
    }).catch((err) => {
        if (err.response.status == 401) {
            helpers.addNotification(req, 'Wrong username or password');
            res.redirect('/login');
        } else {
            helpers.addNotification(
                req,
                'Something went wrong, server returned ' + err.response.status
            );
            res.redirect('/login');
        }
    });

    if (responseData.data.status === 'Success') {
        req.session.sessionToken = responseData.data.sessionToken;
        req.session.sessionTokenExpiry = responseData.data.expiry;
        helpers.addNotification(
            req,
            "You're now logged in as " + req.body.username + '.'
        );
        res.redirect('/');
    } else {
        res.status(500).redirect('/register');
    }
};
