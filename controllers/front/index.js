var helpers = require('../../helpers');
var User = require('../../models/User');
var Nut = require('../../models/Nut');

module.exports = async (req, res) => {
    var loggedInUser = await helpers.getLoggedInUser(req);

    var users = await User.aggregate(
        [
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
                $unwind: '$nuts'
            },
            {
                $group: {
                    _id: '$_id',
                    username: {
                        '$first': '$username'
                    },
                    avatar: {
                        '$first': '$avatar'
                    },
                    nuts: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    nutCount: "$nuts",
                    avatar: 1
                }
            }
        ]
    ).sort({ "nutCount": -1 }).limit(20);

    res.render("pages/index", {
        users: users,
        loggedInUser: loggedInUser,
        notifications: helpers.getNotifications(req)
    });
}