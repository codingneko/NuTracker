const Session = require('../../models/Session');

var SessionRepo = {
    findById: async (id) => {
        return Session.findById(id);
    },
};

module.exports = SessionRepo;
