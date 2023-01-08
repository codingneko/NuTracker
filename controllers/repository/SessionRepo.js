const Session = require('../../models/Session');

var SessionRepo = {
    findById: Session.findById,
};

module.exports = SessionRepo;
