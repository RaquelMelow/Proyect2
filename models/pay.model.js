const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paySchema = new Schema({
  cardHolder: {
    type: String,
    required: [true, "Card holder is required"],
    trim: true,
  },
  cardNumber: {
    type: String,
    required: [true, "Card number is required"],
    trim: true,
    match: [/^\d{16}$/, "Invalid card number, must be a 16-digit number"],
  },
  cvc: {
    type: String,
    required: [true, "CVC is required"],
    trim: true,
    match: [/^[0-9]{3}$/, "CVC needs at least 3 characters"],
  },
  expirationDate: {
    type: String,
    required: [true, "Expiration date is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^\d{2}\/\d{2}$/.test(value);
      },
      message: "Invalid expiration date, must be in MM/YY format",
    },
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Pay = mongoose.model("Pay", paySchema);

module.exports = Pay;
