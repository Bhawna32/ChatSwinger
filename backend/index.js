import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";

const app = express();
const PORT = 4500;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  // res.json({ data: "web socket" });
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    socket.broadcast.emit("message-from-server", data);
    console.log("message received", data);
  });

  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("typing-started", () => {
    socket.broadcast.emit("typing-started-from server");
  });

  socket.on("typing-stopped", () => {
    socket.broadcast.emit("typing-stopped-from-server");
  });

  socket.on("upload", ({ data }) => {
    fs.writeFile(
      "upload/" + "test.png",
      data,
      { encoding: "base64" },
      () => {}
    );
    socket.emit("uploaded", { buffer: data.toString("base64") });
  });

  socket.on("disconnect", (socket) => {
    console.log("User left!");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
