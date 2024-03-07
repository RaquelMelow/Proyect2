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
}

