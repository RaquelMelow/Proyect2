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
              res.redirect(`/order/orders`)
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
