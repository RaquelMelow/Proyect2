const createError = require("http-errors");
const Event = require('../models/event.model');
const User = require("../models/user.model");
const mongoose = require('mongoose');
const { sessions } = require('../middlewares/auth.middleware')

module.exports.list = (req, res, next) => {
    const { name, eventType, date} = req.query; 
    const eventFilter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (eventType) filter.eventType = eventType;
    if (date) filter.date = { $gte: new Date(date) };
    
    Event
      .find(eventFilter)
      .sort ({ date: 1})
      .then((events) => res.render('admin/list', { events }))
      .catch((error) => next(error));
}

module.exports.create = (req, res, next) => res.render('admin/create-event');

module.exports.doCreate = (req, res, next) => {
    const event = req.body;

    if (req.file) {
      event.photo = req.file.path
    }
    
    Event
      .create(event)
      .then((event) => res.redirect('/events'))
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).render('admin/create-event', { event, errors: error.errors });
        } else {
            next(error);
        }
      });
};

module.exports.delete = (req, res, next) => {
    Event.findByIdAndDelete(req.params.idEvent)
    .then(() => res.redirect('/events'))
    .catch((error) => next(error))
};

module.exports.edit = (req, res, next) => {
  const id = req.params.idEvent;
  Event
    .findById(id)
    .then((event) => {
      if (!event) {
        const error = new Error('Event not found');
            error.status = 404;
            next(error);
      } else {
        res.render('admin/edit', { event })
      }
    })
    .catch(next);
}

module.exports.doEdit = (req, res, next) => {
  const event = req.body;

  Event.findByIdAndUpdate(req.params.idEvent, event, { runValidators: true })
    .then(() => {
        res.redirect("/events");
    })
    .catch(error => next(error));
}