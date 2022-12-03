const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: ['Please provide a unique username', true]
    },
    password: {
        type: String, 
        required: ['Please provide a password', true]
    },
    image: {
        type: String, 
        required: ['Please provide an image', true]
    },
    about: {
        type: String, 
        required: ['Please talk about yourself', true]
    },
    dateJoined: {
        type: Date,
        default: new Date
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash 
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User