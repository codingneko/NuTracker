const User = require('../../../models/User');
const UserHelper = require('../../dbHelpers/User');
const Nut = require('../../../models/Nut');

module.exports = async (req, res) => {
    var user = await User.aggregate([
        {
            $match: {
                username: req.params.user,
            },
        },
        {
            $project: {
                _id: {
                    $toString: '$_id',
                },
                username: 1,
                avatar: 1,
            },
        },
        {
            $lookup: {
                from: 'nuts',
                localField: '_id',
                foreignField: 'userId',
                as: 'nuts',
            },
        },
        {
            $project: {
                username: 1,
                avatar: 1,
                _id: 0,
                nuts: 1,
            },
        },
    ]);

    if (user !== null) {
        user[0].rank = await UserHelper.getUserRank(user[0]);
        user[0].nuts.sort((a, b) => b.date - a.date);
        res.json(user[0]);
    } else {
        res.status(404).json({
            status: 'User not found.',
        });
    }
};
