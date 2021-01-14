const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/01y2BCX.png'
    }
});

module.exports = mongoose.model('User', UserSchema);