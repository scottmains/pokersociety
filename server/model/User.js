const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    studentid: {
        type: String,
        required: true,
        max: 15,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }, 
    roles: {
        User: {
            type: Number,
            default: 1
        },
        Admin: Number
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);