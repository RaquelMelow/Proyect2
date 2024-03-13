const mongoose = require('mongoose');
const Event = require('../models/event.model');
const Ticket = require('../models/ticket.model');

module.exports.create = (req, res, next) => {
    Event
      .findById(req.params.idEvent)
      .then((event) => {
        res.render('ticket/create-ticket', { event })
      })
      .catch((error) => next(error))
}

module.exports.doCreate = (req, res, next) => {
    const { ticketType, price } = req.body;
    const ticket = { ticketType, price };
    ticket.idEvent = req.params.idEvent;
    ticket.idUser = req.user.id

    Ticket
      .create(ticket)
      .then(() => res.redirect(`/events/${req.params.idEvent}/edit`))
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error.errors)
            res.status(400).render('ticket/create-ticket', { ticket, errors: error.errors, event: { _id: ticket.idEvent } });
        } else {
            next(error);
        }
      });
}