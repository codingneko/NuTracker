const User = require('../../../models/User');
const UserHelper = require('../../dbHelpers/User');
const Nut = require('../../../models/Nut');

module.exports = async (req, res) => {
    var nuts = await User.aggregate([
        {
            $match: {
                username: req.params.user
            }
        },
        {
            $project: {
                _id: {
                    "$toString": "$_id"
                },
                username: 1,
                avatar: 1
            }
        },
        {
            $lookup: {
                from: 'nuts',
                localField: '_id',
                foreignField: 'userId',
                as: 'nuts'
            }
        },
        {
            $project: {
                username: 1,
                avatar: 1,
                _id: 0,
                nuts: 1
            }
        }
    ]);

    if (nuts !== null) {
        nuts[0].rank = await UserHelper.getUserRank(nuts[0]);
        res.json(nuts[0]);
    } else {
        res.status(404).json({
            status: 'User not found.'
        });
    }
}