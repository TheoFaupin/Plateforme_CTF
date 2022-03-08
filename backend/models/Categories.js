const mongoose = require('mongoose');

var categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icons: {
        type: String,
        required: true,
        default: "web.png"
    },
    description: {
        type: String,
        required: true,
        default: "Lorem Ipsu"
    },
    challenges: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chall' }]
    }
})

module.exports = mongoose.model('Categories', categoriesSchema);
