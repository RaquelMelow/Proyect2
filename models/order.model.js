const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    tickets: {
        type: [{
            ticket: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Ticket"
            },
            quantity: Number,

        }]
    },
    total: {
        type: Number,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
},
    {
        timestamps: true
    });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
