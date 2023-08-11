const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
