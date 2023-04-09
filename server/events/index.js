const addConnectionEvents = require("./connection");
const addChatEvents = require("./chat");
const addVoteEvents = require("./vote");
const addSettingsEvents = require("./settings");
const { EVENTS_NAMES } = require("./constants");

const applyEvents = (io, socket, user, room) => {
  const { id: roomId } = room;

  socket.join(roomId);
  socket.on(EVENTS_NAMES.voteComponentRendered, () => {
    io.to(user.id).emit(EVENTS_NAMES.setCurrentUser, user);
    io.in(roomId).emit(EVENTS_NAMES.userJoinedNotification, user);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });

  addConnectionEvents(io, socket, user, room);
  addChatEvents(io, socket, room);
  addVoteEvents(io, socket, room);
  addSettingsEvents(io, socket, room);
};

module.exports = { applyEvents, EVENTS_NAMES };
