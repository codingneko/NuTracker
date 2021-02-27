const Session = require('../../../models/Session');
const Nut = require('../../../models/Nut');
const User = require('../../../models/User');

module.exports = async (req, res) => {
    var session = await Session.findById(req.body.sessionId);

    if (session !== null) {
        var user = await User.findOne({
            username: req.params.user,
            _id: session.userId
        });

        if (user !== null) {            
            var nut = new Nut({
                userId: user.id,
                date: req.body.date,
                observations: req.body.observations
            });

            try {
                var savedNut = await nut.save();

                res.json({
                    status: 'Success',
                    nut: savedNut
                });
            } catch (err) {
                res.json({
                    status: "Something went wrong on the server"
                }).status(500);
            }
        } else {
            res.status(401);
            res.json({
                status: 'Unauthorised'
            });
        }
    } else {
        res.status(401);
        res.json({
            status: "Not logged in!"
        });
    }
}