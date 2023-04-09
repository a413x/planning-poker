const { omit, each } = require("lodash");
const allRooms = require("../allRooms");
const { EVENTS_NAMES } = require("./constants");
const {
  joinRoom,
  createRoom,
  setCurrentUser,
  userLeftNotification,
  userLeft,
  roomDataUpdate,
} = EVENTS_NAMES;

const addConnectionEvents = (io, socket, user, room) => {
  const { id: roomId } = room;

  const disconnect = () => {
    //console.log("disconnect", reason, user.userName);

    socket.leave(roomId);
    each(omit(EVENTS_NAMES, [joinRoom, createRoom]), (event) => {
      //console.log("remove listener", event);
      socket.removeAllListeners(event);
    });
    const room = allRooms.removeUser(roomId, user, (nextAdmin) => {
      io.to(nextAdmin.id).emit(setCurrentUser, nextAdmin);
    });
    if (!room) return;

    io.in(roomId).emit(userLeftNotification, user);
    io.in(roomId).emit(roomDataUpdate, room);
  };

  socket.on("disconnect", disconnect);
  socket.on(userLeft, disconnect);
};

module.exports = addConnectionEvents;
