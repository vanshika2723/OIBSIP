const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    pizzaDetails: { type: Array, required: true }, // array of items
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, default: "Cash/Card" },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);