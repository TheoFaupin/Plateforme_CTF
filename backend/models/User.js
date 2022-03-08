const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
    ville: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.checkPassword = async (passwordEntered, tempUserPassword) => {
    var res = await bcrypt.compare(passwordEntered, tempUserPassword);
    return res;
};

module.exports = mongoose.model('User', userSchema);
