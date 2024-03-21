const Event = require('../models/event.model');

module.exports.home = (req, res, next) => {
    Event
      .find()
      .then((events) => {
        const musicEvents = events.filter(x => x.eventType === 'Music').slice(0, 4)
        const festivalsEvents = events.filter(x => x.eventType === 'Festivals').slice(0, 4)
        const theatreEvents = events.filter(x => x.eventType === 'Theatre').slice(0, 4)
        const sportsEvents = events.filter(x => x.eventType === 'Sports').slice(0, 4)


        res.render('home', { musicEvents, festivalsEvents, theatreEvents, sportsEvents }
      )})
      .catch(error => next(error))
}

