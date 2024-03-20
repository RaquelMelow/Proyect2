const mongoose = require('mongoose');
const Pay = require('../models/pay.model');

module.exports.list = (req, res, next) => {
    Pay
      .find({ idUser: req.params.idUser })
      .then(payments => res.render('pay/list', { payments }))
      .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
    res.render('pay/new', { idUser: req.params.idUser })
}

module.exports.doCreate = (req, res, next) => {
    const { cardHolder, cardNumber, cvv, expirationDate } = req.body;
    const payment = { cardHolder, cardNumber, cvv, expirationDate, idUser: req.user.id };

    Pay
        .create(payment)
        .then(() => res.redirect(`/pay/${req.user.id}`)) 
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('pay/new'), { errors: error.errors, payment: req.body, idUser: req.user.id }
            } else {
                next(error);
            }
        });
}


module.exports.doDelete = (req, res, next) => {

    Pay 
       .findByIdAndDelete(req.params.idPay)
       .then(() => res.redirect('/profile'))
       .catch(error => next(error))
}