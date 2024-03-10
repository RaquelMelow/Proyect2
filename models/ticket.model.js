const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ticketTypeEnum = ['Stadium stands', 'Stadium track', 'V.I.P.']

const ticketSchema = new Schema({
    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "event"
    },
    ticketType: {
        type: String,
            enum: {
                values: ticketTypeEnum,
                message: 'Invalid ticket type. Choose from: Stadium stands, Stadium track, V.I.P.',
            },
        required: [true, 'Ticket type is required.'],
    },
    
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
})

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
