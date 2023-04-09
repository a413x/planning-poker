export const CARDS_SIDES = {
  back: "back",
  face: "face",
};
export const VOTE_STATES = {
  created: "created",
  idle: "idle",
  voting: "voting",
  ended: "ended",
};
const DEFAULT_VOTING_TIME = 0;
export const DEFAULT_ROOM = {
  vote: {
    state: VOTE_STATES.idle,
    data: {},
    history: [],
    time: DEFAULT_VOTING_TIME,
    result: 0,
  },
  users: [],
  chat: [],
  settings: {
    time: DEFAULT_VOTING_TIME,
    voteName: "Vote",
    cards: [
      {
        value: 1,
        suit: 1,
        side: CARDS_SIDES.face,
      },
      {
        value: 2,
        suit: 2,
        side: CARDS_SIDES.face,
      },
      {
        value: 3,
        suit: 3,
        side: CARDS_SIDES.face,
      },
      {
        value: 4,
        suit: 4,
        side: CARDS_SIDES.face,
      },
    ],
  },
};

export const EVENTS_NAMES = {
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
