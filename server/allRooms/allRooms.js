const { size, cloneDeep, remove, find, findIndex } = require("lodash");
const { nanoid } = require("nanoid");
const { convertCards, getVoteResult, flipCard } = require("./utils");
const { DEFAULT_ROOM, VOTE_STATES } = require("./constants");

class AllRooms {
  allRooms = new Map();
  roomVoteIntervals = {};

  getRoom = (roomId) => this.allRooms.get(roomId);
  setRoom = (roomId, newRoom) => this.allRooms.set(roomId, newRoom);
  removeRoom = (roomId) => {
    this.clearVoteInterval(roomId);
    this.allRooms.delete(roomId);
  };
  isRoomExists = (roomId) => this.allRooms.has(roomId);

  createRoom = (user, initSettings) => {
    this.allRooms.forEach((room, roomId) => {
      if (size(room.users) === 0) this.removeRoom(roomId);
    });
    const roomId = nanoid(8);
    const room = cloneDeep(DEFAULT_ROOM);
    room.id = roomId;
    if (size(user)) {
      room.users.push({ ...user, roomId });
    }
    if (size(initSettings)) {
      room.settings = {
        ...room.settings,
        ...initSettings,
        cards: convertCards(initSettings.cards),
      };
    }
    this.setRoom(roomId, room);
    return room;
  };

  addUser = (roomId, user) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.users.push(user);
    return room;
  };

  updateUser = (roomId, updatedUser) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    const userIndex = findIndex(room.users, { id: updatedUser.id });
    room.users[userIndex] = updatedUser;
    if (!updatedUser.isVoting) {
      delete room.vote.data[updatedUser.id];
    }
    return room;
  };

  removeUser = (roomId, user, setNewAdmin) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    remove(room.users, { id: user.id });
    if (room.users.length === 0) {
      this.removeRoom(roomId);
      return null;
    }
    const roomAdmin = find(room.users, { role: "admin" });
    if (!roomAdmin) {
      const nextAdmin = room.users[0];
      nextAdmin.role = "admin";
      setNewAdmin(nextAdmin);
    }
    return room;
  };

  chatUpdate = (roomId, messageObj) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.chat.push({ id: nanoid(5), ...messageObj });
    return room;
  };

  startVote = (roomId, intervalCallback) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.vote.state = VOTE_STATES.voting;
    room.vote.data = {};
    room.vote.history.push({
      voteName: room.settings.voteName,
      time: new Date().toLocaleString(),
      action: "started",
    });
    if (room.settings.time > 0) {
      room.vote.time = room.settings.time;
      this.roomVoteIntervals[roomId] = setInterval(() => {
        this.voteInterval(roomId, intervalCallback);
      }, 1000);
    }
    return room;
  };

  voteUser = (roomId, user, choice) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.vote.data[user.id] = flipCard(choice);
    return room;
  };

  endVote = (roomId) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    const { newData, result } = getVoteResult(
      room.vote.data,
      room.settings.cards
    );
    room.vote.data = newData;
    room.vote.result = result;
    room.vote.state = VOTE_STATES.ended;
    room.vote.history.push({
      voteName: room.settings.voteName,
      time: new Date().toLocaleString(),
      action: "ended",
      result,
    });
    this.clearVoteInterval(roomId);
    return room;
  };

  voteInterval = (roomId, intervalCallback) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.vote.time--;
    if (room.vote.time <= 0) {
      intervalCallback(this.endVote(roomId));
    } else {
      intervalCallback(room);
    }
    return room;
  };

  clearVoteInterval = (roomId) => {
    clearInterval(this.roomVoteIntervals[roomId]);
    this.roomVoteIntervals[roomId] = null;
  };

  clearHistory = (roomId) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    room.vote.history = [];
    return room;
  };

  settingsUpdate = (roomId, settings) => {
    const room = this.getRoom(roomId);
    if (!room) return null;
    const cards = convertCards(settings.cards);
    room.settings = { ...settings, cards };
    return room;
  };
}

module.exports = new AllRooms();
