const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const secret = "your_jwt_secret"; // Use environment variables in production

// Register
router.post("/register", async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      dateOfBirth,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
