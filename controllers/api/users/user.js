module.exports = (req, res) => {
    var user = req.app.locals.db.get('users').find({username: req.params.user}).value();

    if (typeof user !== "undefined"){
        res.json(req.app.locals.db.get('faps').filter({userId: user.id}).value());
    } else {
        res.status('404')
        res.json({
            status: 'User not found'
        });
    }
}