const EVENTS_NAMES = {
  createRoom: "createRoom",
  joinRoom: "joinRoom",
  joinError: "joinError",

  setCurrentUser: "setCurrentUser",
  updateUser: "updateUser",
  userJoinedNotification: "userJoinedNotification",
  userLeftNotification: "userLeftNotification",
  userLeft: "userLeft",

  roomDataUpdate: "roomDataUpdate",
  settingsUpdate: "settingsUpdate",
  chatMessage: "chatMessage",
  voteStart: "voteStart",
  voteEnd: "voteEnd",
  voteUser: "voteUser",
  updateVoteTimer: "updateVoteTimer",
  clearHistory: "clearHistory",

  voteComponentRendered: "voteComponentRendered",
  redirectToVote: "redirectToVote",
};

module.exports = { EVENTS_NAMES };
