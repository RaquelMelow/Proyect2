const mongoose = require("mongoose");
const Event = require("../models/event.model");
const Ticket = require("../models/ticket.model");
const { jsPDF } = require("jspdf")
const fs = require('fs');
const path = require('path');

module.exports.create = (req, res, next) => {
  Event.findById(req.params.idEvent)
    .then((event) => {
      res.render("ticket/create-ticket", { event });
    })
    .catch((error) => next(error));
};

module.exports.doCreate = (req, res, next) => {
  const { ticketType, price } = req.body;
  const ticket = { ticketType, price };
  ticket.idEvent = req.params.idEvent;
  ticket.idUser = req.user.id;

  Ticket.create(ticket)
    .then(() => res.redirect(`/events/${req.params.idEvent}/edit`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("ticket/create-ticket", {
          ticket,
          errors: error.errors,
          event: { _id: ticket.idEvent },
        });
      } else {
        next(error);
      }
    });
};


module.exports.file = (req, res, next) => {
  const doc = new jsPDF();


  doc.text(`Order ID: ${order._id}`, 10, 10);
  doc.text(`Event Name: ${order.idEvent.name}`, 10, 20);
  doc.text(`Total: ${order.total}`, 10, 30);

  const pdfPath = path.join(__dirname, "..", "public", "tickets", `${order._id}.pdf`);
  doc.save(pdfPath);

  res.sendFile(pdfPath);
}
