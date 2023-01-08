const Session = require('../../models/User');

var SessionRepo = {
    findById: Session.findById,
};

module.exports = SessionRepo;
