const User = require('../models/user.model');
const mongoose = require('mongoose');
const { sessions } = require('../middlewares/auth.middleware')


module.exports.register = (req, res, next) => res.render('users/register');

module.exports.doRegister = (req, res, next) => {
    User.findOne( { email: req.body.email } )
       .then((user) => {
        if (user) {
            res.status(409).render('users/register', { user: req.body, errors: { email:'This email already exists'} });
        } else {          
            const user = { name: req.body.name, email: req.body.email, phone:req.body.phone, password: req.body.password };
            return User.create(user)
                    .then(() => {
                        res.redirect('/login');
                    });
        }
       })
       .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).render('users/register', { user: req.body, errors: error.errors });
        } else {
            next(error);
        }
       })
};





module.exports.login = (req, res, next) =>  res.render('users/login');

module.exports.doLogin = (req, res, next) => {
    User.findOne( { email: req.body.email })
        .then((user) => {
            if(!user) {
                res.status(401).render('users/login', { user: req.body, errors: { password: 'Email or password is invalid'}})
            } else {
                return user.checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                        req.session.userId = user.id;
                        res.redirect('/');
                    } else {
                        res.status(401).render('users/login', { user: req.body, errors: { password:  'Email or password is invalid'}})
                    }
                })
            }
        })
        .catch(next);
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    req.session = null;
    res.clearCookie("connect.sid");
    res.redirect('/login');
}

module.exports.profile = (req, res, next) => {
    res.render('users/profile');
}
//BORRAR USUARIO

