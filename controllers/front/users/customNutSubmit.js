const axios = require('axios');
const { response } = require('express');
const helpers = require('../../../helpers');

module.exports = async (req, res) => {
    if (typeof req.session.sessionToken !== 'undefined') {
        try {
            var responseData = await axios({
                method: 'post',
                url:
                    req.app.locals.base_url +
                    `/api/nut/${
                        req.body.user || (await helpers.getLoggedInUser(req))
                    }`,
                data: {
                    sessionId: req.session.sessionToken,
                    observations: req.body.observations,
                    score: req.body.score,
                    date:
                        new Date(req.body.date).getTime() ||
                        new Date(req.body.date).getTime(),
                },
            }).catch((err) => {
                helpers.addNotification(
                    req,
                    'Something went wrong, server returned' +
                        err.response.status
                );
            });

            if (responseData.data.status === 'Success') {
                helpers.addNotification(req, 'Successfully nutted!');
            } else {
                helpers.addNotification(
                    req,
                    'Something went wrong when submitting your nut :<'
                );
            }

            res.redirect(
                `/user/${req.body.user || (await helpers.getLoggedInUser(req))}`
            );
        } catch (err) {
            console.log(err);
            res.status(500).redirect(req.headers.referer || '/');
        }
    } else {
        console.log(
            'Attempted to nut without a session token',
            req.session.sessionToken
        );
        res.status(401).redirect('/register');
    }
};
