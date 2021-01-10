const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../../../models/User');
const Session = require('../../../models/Session');

module.exports = async (req, res) => {
    var shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    var encryptedPassword = shasum.digest('hex');

    var userData = {
        username: req.body.username,
        password: encryptedPassword
    }

    var user = await User.findOne(userData);

    if (user !== null) {
        var session = new Session({
            userId: user._id
        });

        try {
            var savedSession = await session.save();
        } catch (err) {
            res.status(500).json({
                status: "Something went wrong on the server"
            });
        }

        res.json({
            status: 'Success',
            sessionToken: savedSession._id,
            expiry: savedSession.expiry
        });
    } else {
        res.status(404).json({
            status: 'Wrong username or password'
        });
    }
}