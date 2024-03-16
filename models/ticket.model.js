const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    ticketType: {
        type: String,
        required: [true, 'Ticket type is required.'],
    },
    
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
})

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
