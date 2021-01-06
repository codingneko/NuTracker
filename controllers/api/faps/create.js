module.exports = (req, res) => {
    var session = req.app.locals.db.get('sessions').find({id: req.body.sessionId}).value();
    if (typeof session !== 'undefined') {
        var user = req.app.locals.db.get('users').find({username: req.params.user, id: session.userId}).value();

        if (typeof user !== 'undefined') {
            var fap = {
                date: Date.now(),
                userId: user.id,
                observations: req.body.observations
            };
            req.app.locals.db.get('faps').push(fap).write();
            res.json({
                status: 'Success',
                fap: fap
            });
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