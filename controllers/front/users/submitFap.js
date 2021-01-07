const axios = require('axios');
const { response } = require('express');
const helpers = require('../../../helpers');

module.exports = async (req, res) => {
    if (typeof req.session.sessionToken !== 'undefined') {
        try {
            var responseData = await axios({
                method: 'post',
                url: req.app.locals.base_url + `/api/fap/${req.params.user}`,
                data: {
                    sessionId: req.session.sessionToken
                }
            }).catch (err => {
                helpers.addNotification(req, 'Something went wrong, server returned' + err.response.status);
            });

            if(responseData.data.status === 'Success') {
                helpers.addNotification(req, 'Successfully fapped!')
            } else {
                helpers.addNotification(req, 'Something went wrong when submitting your fap :<');
            }

            res.redirect(req.headers.referer || '/');
        } catch (err){
            console.log(err);
            res.status(500).redirect(req.headers.referer || '/');
        }
    } else {
        console.log('Attempted to fap without a session token', req.session.sessionToken);
        res.status(401).redirect('/register');
    }
}