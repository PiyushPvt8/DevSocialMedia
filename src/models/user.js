const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Gender not valid.");
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid: " + value);
            }
        }

    },
    about: {
        type: String,
        default: "This is a default about section. You can update it to tell others more about yourself."
    },
    skills: {
        type: [String] // Array of strings to store user skills
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, 'piysat@project001', { expiresIn: '7d' });

    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const passwordHashed = user.password;
    
    const isPasswordValid = await bcrypt.compare(password, passwordHashed);

    return isPasswordValid;
}


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
