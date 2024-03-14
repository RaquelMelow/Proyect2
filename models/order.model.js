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
            unitPrice: Number,
            subtotal: Number
        }]
    },
    total: {
        type:Number,

    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
       }
    },
    {
        timestamps: true
    });

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
