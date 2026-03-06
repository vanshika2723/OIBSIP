const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create order
router.post("/create", async (req, res) => {
  try {
    const { userId, pizzaDetails, totalPrice, paymentMethod } = req.body;

    console.log("Incoming order body:", req.body); // DEBUG

    if (!userId || !pizzaDetails || !totalPrice)
      return res.status(400).json({ message: "Missing data" });

    const order = new Order({ userId, pizzaDetails, totalPrice, paymentMethod });
    await order.save();

    console.log("Order saved:", order); // DEBUG
    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to create order:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Get orders by user
router.get("/user/:userId", async (req, res) => {
  try {
    console.log("Fetching orders for user:", req.params.userId); // DEBUG
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;