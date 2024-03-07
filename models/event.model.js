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
        /*required: [true, 'Photo is required'],*/
        validate: {
            validator: function (value) {
                try {
                    new URL (value)
                      return true
                } catch(error) {
                    return false
                }
            }
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
    location: {
        type: String,
        required: [true, 'Address is required']
    },
    date: { 
        type: Date, 
        required: [true, 'Event date is required']   
    },
    info: {
        type: String
    }
})

const Event = mongoose.model('event', eventSchema);

module.exports = Event;