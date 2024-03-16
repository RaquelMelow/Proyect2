const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Event = require('../models/event.model');
const Ticket = require('../models/ticket.model');

module.exports.create = (req, res, next) => {
    Event
    .findById(req.params.idEvent)
    .then((event) => {
        return Ticket
            .find({ idEvent: event._id})
            .then((tickets) => {
                console.log(tickets)
                res.render('order/create-order', { event, tickets })
            })
    })
    .catch(error => next(error));
}  