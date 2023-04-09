const CARDS_SIDES = {
  back: "back",
  face: "face",
};
const VOTE_STATES = {
  created: "created",
  idle: "idle",
  voting: "voting",
  ended: "ended",
};
const DEFAULT_VOTING_TIME = 0;
const DEFAULT_ROOM = {
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
        value: 3,
        suit: 2,
        side: CARDS_SIDES.face,
      },
      {
        value: 5,
        suit: 3,
        side: CARDS_SIDES.face,
      },
      {
        value: 8,
        suit: 4,
        side: CARDS_SIDES.face,
      },
    ],
  },
};

module.exports = { DEFAULT_ROOM, VOTE_STATES, CARDS_SIDES };
