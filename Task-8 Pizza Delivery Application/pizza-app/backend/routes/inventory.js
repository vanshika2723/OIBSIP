// routes/inventory.js
const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory"); // Mongoose model

// GET all inventory items
router.get("/all", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE inventory (by name)
router.put("/update", async (req, res) => {
  try {
    const updatedItems = req.body.items;

    for (let item of updatedItems) {
      await Inventory.findOneAndUpdate(
        { name: item.name },   // match by name
        { quantity: item.quantity }
      );
    }

    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;