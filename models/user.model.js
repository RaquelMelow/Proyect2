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
        required: [true, 'Phone number is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password needs at least 8 characters']
    },
    isAdmin: {
      type: Boolean
    },
 },
 { timestamps: true }
)

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
      bcrypt
        .hash(this.password, 10)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch(next);
    } else {
      next();
    }
  });
  
  userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
  };
  

const User = mongoose.model("user", userSchema);
module.exports = User;