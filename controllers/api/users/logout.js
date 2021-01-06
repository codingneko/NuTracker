module.exports = (req, res) => {
    req.app.locals.db.get('sessions').find({
        id: req.body.sessionId
    }).remove().write();
}