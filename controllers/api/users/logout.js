const Session = require('../../../models/Session');

module.exports = async (req, res) => {
    try {
        const removedSession = await Session.findByIdAndRemove(req.body.sessionId);
        res.json({
            status: "You've been logged out"
        });
    } catch (err) {
        res.status(500).json({
            status: "Something went wrong on the server",
            err: err
        });
    }
}