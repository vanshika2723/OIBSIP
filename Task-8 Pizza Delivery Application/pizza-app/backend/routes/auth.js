const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ---------------- REGISTER (Auto-Verify for Testing) -----------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken: null,
      isVerified: true, // ✅ auto-verified
    });

    await user.save();

    res.status(201).json({ message: "User registered & auto-verified", userId: user._id });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- LOGIN -----------------

router.post("/login", async (req,res)=>{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json({message:"User not found"});
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(400).json({message:"Invalid password"});
  }

  let role = user.role;

  // force admin
  if(email === "admin@pizza.com"){
    role = "admin";
  }

  res.json({
    userId:user._id,
    name:user.name,
    email:user.email,
    role:role
  });

});
module.exports = router;