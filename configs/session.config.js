const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.session = expressSession({
    secret: process.env.SESSION_SECRET || 'super-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.SESSION_SECURE === "true",
        maxAge: 14 * 24 * 60 * 60 * 1000
    },
    proxy: process.env.SESSION_SECURE === "true",
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        ttl: 14 * 24 * 60 * 60
    })
});

module.exports.loadUserSession = (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        next();
    } else {
        User.findById(userId)
        .then((user) => {
            req.user = user;
            res.locals.currentUser = user;
            res.locals.admin = user.isAdmin;
            next();
        })
        .catch(next)
    }
}