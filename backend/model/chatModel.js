const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: {
    type: String,
  },
});

const ChatModel = mongoose.model("Chat", chatSchema);
module.exports = ChatModel;
