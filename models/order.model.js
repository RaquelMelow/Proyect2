const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    tickets: {
        type: [{
            ticket: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "ticket" 
            },
            quantity: Number,
            subtotal: Number
        }]
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
})

const Order = mongoose.model("order", ticketSchema);

module.exports = Order;
