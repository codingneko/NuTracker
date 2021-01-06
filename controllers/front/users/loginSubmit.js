const axios = require('axios');
const helpers = require('../../../helpers');

module.exports =  async (req, res) => {
    var requestData = {
        username: req.body.username,
        password: req.body.password
    }

    var responseData = await axios({
        method: 'post',
        url: '/api/login',
        data: requestData
    }).catch(err => {
        if(err.response.status == 401){
            res.send('Wrong username or password, go back and try again');
        }
    });

    if (responseData.data.status === 'Success') {
        req.session.sessionToken = responseData.data.sessionToken;
        req.session.sessionTokenExpiry = responseData.data.expiry;
        helpers.addNotification(req, 'You\'re now logged in as ' + req.body.username + '.');
        res.redirect('/');
    } else {
        res.status('500');
        res.redirect('/register');
    }
}
