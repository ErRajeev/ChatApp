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
}); // cors for crss platform

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
    console.log(`${username} join`);
    io.emit("update", `${username} join`); // Brodcast to all user
  });

  socket.on("mychat", async (message) => {
    // const mychat = new ChatModel({ message }); // Save message to database
    // await mychat.save();
    socket.broadcast.emit("mychat", message); // except sender brodcast to all
  });

  //incomming fro  client
  socket.on("recive", (message) => {
    console.log(message);
  });

  // socket.on("otherschat");

  socket.on("exitUser", (username) => {
    io.emit("update", `${username} Exit`);
    console.log(`${username} Exit`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
