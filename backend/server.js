const express = require("express");
const mongoose = require("mongoose");
const ChatModel = require("./model/chatModel");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
const userRouter = require("./routes/userRoute");
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(5000, () => {
      console.log("Server is running...");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(userRouter);

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    socket.broadcast.emit("update", username + Join);
  });
  socket.on("exitUser", (username) => {
    socket.broadcast("update", username + "Exit ");
  });

  socket.on("chat", async (message) => {
    const chat = new ChatModel({ message });
    await chat.save();

    console.log(chat); // Move this line here
    io.emit("chat", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
