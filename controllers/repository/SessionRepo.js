const Session = require('../../models/User');

var NutRepo = {
    findById: Session.findById,
};

module.exports = NutRepo;
