require('dotenv').config(); // Load .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);
// Order routes (agar hai)
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

const inventoryRoute = require("./routes/inventory");
app.use("/api/inventory", inventoryRoute);
// Test route
app.get('/', (req, res) => res.send('Pizza API Running'));

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));