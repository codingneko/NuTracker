const mongoose = require('mongoose');

const NutSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    observations: {
        type: String,
        required: false,
    },
    score: {
        type: Number,
        required: false,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('Nut', NutSchema);
