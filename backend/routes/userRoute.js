const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.post("/", async (req, res) => {
  const { user, password } = req.body;

  try {
    const existingUser = await User.findOne({ user });

    if (existingUser) {
      if (existingUser.password === password) {
        return res.status(200).json({ message: `${user} Login` });
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      const newUser = await User.create({ user, password });
      return res.status(201).json({ message: `${user} Added` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
