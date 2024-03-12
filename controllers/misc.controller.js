const Event = require('../models/event.model');

module.exports.home = (req, res, next) => {
    Event
      .find()
      .then((events) => res.render('home', { events }))
      .catch(error => next(error))
}