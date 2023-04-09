const allRooms = require("../allRooms");
const { EVENTS_NAMES } = require("./constants");

const addChatEvents = (io, socket, room) => {
  const { id: roomId } = room;

  socket.on(EVENTS_NAMES.chatMessage, (messageObj) => {
    const room = allRooms.chatUpdate(roomId, messageObj);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });
};

module.exports = addChatEvents;
