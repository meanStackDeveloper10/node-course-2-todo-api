const mongoose = require('mongoose');

let Users = mongoose.model('User', {
    email: {
        required: true,
        minlenght: 1,
        trim: true,
        type: String
    }
});

module.exports = {Users}