const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        default: Date.now() + 3*1000*60*60*24*30
    }
});

module.exports = mongoose.model('Session', SessionSchema);