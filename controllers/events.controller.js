const createError = require("http-errors");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const Pay = require("../models/pay.model");
const mongoose = require("mongoose");
const { sessions } = require("../middlewares/auth.middleware");

module.exports.list = (req, res, next) => {
  Event.find()
    .sort({ date: 1 })
    .then((events) => res.render("admin/list", { events }))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => res.render("admin/create-event");

module.exports.doCreate = (req, res, next) => {
  const event = req.body;

  if (req.file) {
    event.photo = req.file.path;
  }
  Event.create(event)
    .then(() => res.redirect("/events"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("admin/create-event", { event, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Event.findByIdAndDelete(req.params.idEvent)
    .then(() => res.redirect("/events"))
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  const id = req.params.idEvent;
  Event.findById(id)
    .then((event) => {
      if (!event) {
        const error = new Error("Event not found");
        error.status = 404;
        next(error);
      } else {
        res.render("admin/edit", { event, id });
      }
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  const event = req.body;

  if (req.file) {
    event.photo = req.file.path;
  }

  Event.findByIdAndUpdate(req.params.idEvent, event, { runValidators: true })
    .then((event) => {
      if (!event) {
        next(createError(404, "Event not found"));
      } else {
        res.redirect("/events");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("admin/edit", {
            event: req.body,
            id: req.params.idEvent,
            errors: error.errors,
          });
      } else {
        next(error);
      }
    });
};


module.exports.details = (req, res, next) => {
  Event.findById(req.params.idEvent).then((event) => {
      return Ticket.find({ idEvent: event._id }).then((tickets) => {
        return Pay.find({ idUser: req.user.id }).then((payments) => {
          res.render("events/details", { event, tickets, payments });
        })
      })
    })
    .catch((error) => next(error));
};


module.exports.type = (req, res, next) => {
  const { eventType } = req.params;

  Event.find({ eventType: eventType })
    .sort({ date: -1 })
    .then((events) => res.render('events/type', { events })) 
    .catch((error) => next(error));
};
