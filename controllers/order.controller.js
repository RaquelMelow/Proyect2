const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Event = require("../models/event.model");
const Ticket = require("../models/ticket.model");
const createError = require("http-errors");

module.exports.doCreate = (req, res, next) => {
  const { idTicket, quantity } = req.body;
  const { idEvent } = req.params;

  Event.findById(idEvent)
    .then((event) => {
      if (!event) {
        throw createError(404, "Event not found");
      } else {
        return Ticket.findById(idTicket).then((ticket) => {
          if (!ticket) {
            throw createError(404, "Ticket not found");
          } else {
            const price = ticket.price;

            const order = {
              owner: req.user.id,
              total: price * quantity,
              tickets: [{ ticket: idTicket, quantity }],
              idEvent,
            };

            return Order.create(order).then((order) =>
              res.redirect(`/order/${order._id}/confirmed`)
            );
        }
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { owner } = req.params;
  Order
  .find(owner)
  .populate('idEvent')
  .populate('tickets.ticket')
  .then(orders => {
    res.render('order/list', { orders });
  })
  .catch(error => {
    next(error);
  });
}

module.exports.confirmed = (req, res, next) => {
  Order.findOne({ _id: req.params.idOrder })
    .then(order => {
      if (order) {
        res.render('order/confirmed', { msg: 'Congratulations! Your order is completed, enjoy your experience.', success: true, order });
      } else {
        res.render('order/confirmed', { msg: 'An error occurred while purchasing your ticket. Try again!', success: false });
      }
    })
    .catch(error => {
      next(error);
    });
};
