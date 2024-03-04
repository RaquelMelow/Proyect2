const User = require('../models/user.model');
const mongoose = require('mongoose');


module.exports.register = (req, res, next) => res.render('users/register');

module.exports.doRegister = (req, res, next) => {
    console.log('Hola');
    User.findOne( { email: req.body.email } )
       .then((user) => {
        if (user) {
            res.status(409).render('users/register', { user: req.body, errors: { email:'This email already exists'} });
        } else {          
            const user = { name: req.body.name, email: req.body.email, phone:req.body.phone, password: req.body.password };
            return User.create(user)
                    .then(() => {
                        console.log('Hola5');
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
                res.status(401).render('users/login', { user: req.body, errors: { password: 'Some information is incorrect'}})
            } else {
                return user.checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                        //FALTA LA SESION AQUÍ
                        //req.session.userId = user.id;
                        res.redirect('/');
                    } else {
                        res.status(401).render('users/login', { user: req.body, errors: { password:  'Some information is incorrect'}})
                    }
                })
            }
        })
        .catch(next);
}

//FALTA LOGGOUT
//PERFIL
//BORRAR USUARIO

