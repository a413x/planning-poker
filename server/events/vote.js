const allRooms = require("../allRooms");
const { EVENTS_NAMES } = require("./constants");

const addVoteEvents = (io, socket, room) => {
  const { id: roomId } = room;

  socket.on(EVENTS_NAMES.voteStart, () => {
    const room = allRooms.startVote(roomId, (room) => {
      io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
    });
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });

  socket.on(EVENTS_NAMES.voteUser, (user, choice) => {
    const room = allRooms.voteUser(roomId, user, choice);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });

  socket.on(EVENTS_NAMES.voteEnd, () => {
    const room = allRooms.endVote(roomId);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });

  socket.on(EVENTS_NAMES.clearHistory, () => {
    const room = allRooms.clearHistory(roomId);
    io.in(roomId).emit(EVENTS_NAMES.roomDataUpdate, room);
  });
};

module.exports = addVoteEvents;
