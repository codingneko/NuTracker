const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../../../models/User');
const Session = require('../../../models/Session');

module.exports = async (req, res) => {
    let shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    let encryptedPassword = shasum.digest('hex');

    let userData = {
        username: req.body.username,
        password: encryptedPassword
    }

    let user = await User.findOne(userData);

    if (user !== null) {
        let session = new Session({
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
        res.status(401).json({
            status: 'Wrong username or password'
        });
    }
}