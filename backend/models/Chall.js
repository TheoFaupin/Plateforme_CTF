const mongoose = require('mongoose');

var challSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    points: {
        type: Number,
        required: true
    },
    flags: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userValidated: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}, {type: Date, default: Date.now() }],
        default: []
    }
})

module.exports = mongoose.model('Chall', challSchema);
