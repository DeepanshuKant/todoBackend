const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            select: false
        },
        secretCode: {
            type: String,
            required: [true, 'Secret Code is required'],
            minlength: [6, 'Secret Code must be at least 6 characters long'],
        }
    }
)

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.secretCode = await bcrypt.hash(this.secretCode, 10);

})

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        {
            id: this._id
        }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
    )
}

//Compare password to hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
}


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;