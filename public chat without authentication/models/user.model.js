var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        trim: true,
        required: [
            true, 'Username is required'
        ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [
            true, 'Email is required'
        ],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createdDate: Date,
    last_updated: Date
});

UserSchema.pre('save', function (next) {
    this.last_updated = Date.now();
    next();
});

/*
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(
                user.password, salt, null,
                function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    user.password = hash;
                    next();
                }
            );
        });
    } else {
        next();
    }
})
*/

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



var User = mongoose.model('User', UserSchema, 'user_list');

module.exports = User;