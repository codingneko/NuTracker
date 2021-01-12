const User = require('../../../models/User');
const Nut = require('../../../models/Nut');

module.exports = async (req, res) => {
    var user = await User.findOne({
        username: req.params.user
    });

    if (user !== null) {
        var nuts = await Nut.find({
            userId: user._id
        });
        if (nuts !== null) {
            res.json(nuts);
        } else {
            res.json({});
        }
    } else {
        res.status(404).json({
            status: 'User not found.'
        });
    }
}