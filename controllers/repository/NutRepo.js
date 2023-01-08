const Nut = require('../../models/Nut');

var NutRepo = {
    getLatestNuts: async (limit) => {
        return Nut.aggregate([
            {
                $sort: {
                    date: -1,
                },
            },
            {
                $project: {
                    date: 1,
                    userId: {
                        $toObjectId: '$userId',
                    },
                    observations: 1,
                    score: 1,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    score: 1,
                    user: 1,
                },
            },
            {
                $limit: limit,
            },
            {
                $unwind: {
                    path: '$user',
                },
            },
        ]);
    },
    getUserListWithAverageScore: () => {
        return Nut.aggregate([
            {
                $project: {
                    userId: {
                        $toObjectId: '$userId',
                    },
                    date: 1,
                    score: 1,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                },
            },
            {
                $sort: {
                    score: -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    user: 1,
                    score: {
                        $toInt: '$score',
                    },
                },
            },
            {
                $group: {
                    _id: '$user',
                    avgScore: {
                        $avg: '$score',
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: {
                            username: '$_id.username',
                            avatar: '$_id.avatar',
                            avgScore: '$avgScore',
                        },
                    },
                },
            },
            {
                $sort: {
                    score: -1,
                },
            },
        ]);
    },
    getAverageScoreOfUser: async (username) => {
        let userAverage = await Nut.aggregate([
            {
                $project: {
                    userId: {
                        $toObjectId: '$userId',
                    },
                    date: 1,
                    score: 1,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                },
            },
            {
                $sort: {
                    score: -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    user: 1,
                    score: {
                        $toInt: '$score',
                    },
                },
            },
            {
                $group: {
                    _id: '$user',
                    avgScore: {
                        $avg: '$score',
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: {
                            username: '$_id.username',
                            avatar: '$_id.avatar',
                            avgScore: '$avgScore',
                        },
                    },
                },
            },
            {
                $sort: {
                    score: -1,
                },
            },
            {
                $match: {
                    username: username,
                },
            },
        ]);

        return userAverage[0].avgScore;
    },
};

module.exports = NutRepo;
