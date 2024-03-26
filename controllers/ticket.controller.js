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
  
  const ticketId = req.params.idTicket;
  const pdfPath = path.join(__dirname, '..', 'public', 'tickets', `${ticketId}.pdf`);

  const doc = new jsPDF();
  doc.text(`Ticket ID: ${ticketId}`, 10, 10);

    doc.save(pdfPath);
    
    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        return next(err);
      } else {
        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.error("Error deleting PDF file:", err);
          } else {
            console.log("PDF file deleted successfully");
          }
        });
      }
    });

}
