const allRooms = require("../allRooms");
const { EVENTS_NAMES } = require("./constants");

const addSettingsEvents = (io, socket, room) => {
  const { id: roomId } = room;

  socket.on(EVENTS_NAMES.settingsUpdate, (settings) => {
    const room = allRooms.settingsUpdate(roomId, settings);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });

  socket.on(EVENTS_NAMES.updateUser, (updatedUser) => {
    const room = allRooms.updateUser(roomId, updatedUser);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
    io.to(updatedUser.id).emit(EVENTS_NAMES.setCurrentUser, updatedUser);
  });
};

module.exports = addSettingsEvents;
