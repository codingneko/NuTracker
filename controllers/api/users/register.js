const User = require('../../../models/User');
const crypto = require('crypto');

module.exports = async (req, res) => {
    var shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    var encryptedPassword = shasum.digest('hex');

    const user = new User({
        username: req.body.username,
        password: encryptedPassword
    });

    try {
        const savedUser = await user.save();
        res.json({
            status: 'Success',
            newUser: savedUser.username
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            err: err
        });
    }
}