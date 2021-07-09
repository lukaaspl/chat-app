const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3001;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("Invalid username"));
  }

  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  socket.broadcast.emit("user-connected", {
    id: socket.id,
    username: socket.username,
  });

  socket.on("message", (content) => {
    socket.broadcast.emit("user-messaged", {
      userId: socket.id,
      username: socket.username,
      content: content,
      timestamp: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", {
      id: socket.id,
      username: socket.username,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
