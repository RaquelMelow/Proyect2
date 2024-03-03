const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        maxLength: [15, 'The name cannot have more than 20 characters'],
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        required: 'Phone number is required'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password needs at least 8 characters']
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;