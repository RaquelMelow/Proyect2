const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "event"
    },
    type: {
        type: String
        //FALTA DIFERENTES TIPOS DE ENTRADA
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
