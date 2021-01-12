const User = require('../../../models/User');
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
                username: 1
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
                _id: 0,
                nuts: 1
            }
        }
    ]);

    if (nuts !== null) {
        res.json(nuts[0]);
    } else {
        res.status(404).json({
            status: 'User not found.'
        });
    }
}