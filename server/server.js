const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const allRooms = require("./allRooms");
const { applyEvents, EVENTS_NAMES } = require("./events");

const app = express();
const server = http.Server(app);
const io = new Server(server);

io.on("connection", (socket) => {
  const { id } = socket;

  socket.on(EVENTS_NAMES.createRoom, (data) => {
    const { user: initUser, settings } = data;
    const user = { ...initUser, id };

    const room = allRooms.createRoom(user, settings);
    if (!room) return;

    applyEvents(io, socket, user, room);
    io.to(user.id).emit(EVENTS_NAMES.redirectToVote, room.id);
  });

  socket.on(EVENTS_NAMES.joinRoom, (data) => {
    const { roomId } = data;
    const user = { ...data, id };

    if (!allRooms.isRoomExists(roomId)) {
      socket.emit(EVENTS_NAMES.joinError, "Room does not exists");
      return;
    }

    const room = allRooms.addUser(roomId, user);
    if (!room) return;

    applyEvents(io, socket, user, room);
    io.to(user.id).emit(EVENTS_NAMES.redirectToVote, room.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
