const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        required: true,
        minlenght: 1,
        trim: true,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlenght: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123');

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token
    })

}

UserSchema.statics.findByToken = function (token) {
    
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (params) {

    let User = this;

    return User.findOne({email: params.email})
    .then((user) => {

        if (!user) return Promise.reject()

        return new Promise((resolve, reject) => {

            bcrypt.compare(params.password, user.password, (err, response) => {
                if (!response) reject()
                resolve(user)
            })
        })
    })
}

UserSchema.pre('save', function (next) {
    
    let user = this;
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;            
            next()
        })
    })
})

let User = mongoose.model('User', UserSchema);

module.exports = {User}