const User = require('../../models/User');

var UserRepo = {
    findById: User.findById,
    getUserRank: async (pUser) => {
        var user = await User.aggregate([
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
                $unwind: '$nuts',
            },
            {
                $group: {
                    _id: '$_id',
                    username: {
                        $first: '$username',
                    },
                    avatar: {
                        $first: '$avatar',
                    },
                    nuts: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    nutCount: '$nuts',
                    avatar: 1,
                },
            },
            {
                $sort: {
                    nutCount: -1,
                },
            },
            {
                $group: {
                    _id: false,
                    users: {
                        $push: {
                            _id: '$_id',
                            username: '$username',
                            nutCount: '$nutCount',
                            avatar: '$avatar',
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: '$users',
                    includeArrayIndex: 'rankingPosition',
                },
            },
            {
                $match: {
                    'users.username': pUser.username,
                },
            },
        ]);
        var rank = (await user[0].rankingPosition) + 1;
        return rank;
    },
    getUser: async (username) => {
        return await User.aggregate([
            {
                $match: {
                    username: username,
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
    },
    getUserList: async (limit) => {
        let users = await User.aggregate([
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
                $unwind: '$nuts',
            },
            {
                $group: {
                    _id: '$_id',
                    username: {
                        $first: '$username',
                    },
                    avatar: {
                        $first: '$avatar',
                    },
                    nuts: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    nutCount: '$nuts',
                    avatar: 1,
                },
            },
        ])
            .sort({ nutCount: -1 })
            .limit(limit);

        return users;
    },
};

module.exports = UserRepo;
