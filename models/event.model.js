const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventTypeEnum = ['Music', 'Festival', 'Theatre', 'Sports'];


const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Event name is required']
    },
    photo: {
        type: String,
        //default:, //FALTA UN JPG 
        eventType: {
            type: [String]
        }
    },
    eventType: {
        type: String,
        enum: {
            values: eventTypeEnum,
            message: 'Invalid event type. Choose from: Music, Festivals, Theatre, Sports.',
        },
        required: [true, 'Event type is required.'],
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    date: { //FALTA LIBRERIA
        type: Date,      
    },
    info: {
        type: String
    }

})

const Event = mongoose.model('event', eventSchema);

module.exports = Event;