const {
  map,
  replace,
  split,
  mapValues,
  round,
  reduce,
  mean,
} = require("lodash");
const { CARDS_SIDES } = require("./constants");

const convertCards = (cards) => {
  return map(split(replace(cards, " ", ""), ","), (value, index) => ({
    value,
    suit: index % 4,
    side: CARDS_SIDES.face,
  }));
};

const flipCard = (card) => {
  const { face, back } = CARDS_SIDES;
  return { ...card, side: card.side === face ? back : face };
};

const getVoteResult = (data, cards) => {
  let result = mean(map(data, (choice) => parseInt(choice.value)));
  if (isNaN(result)) result = 0;

  const cardsValues = map(cards, (card) => card.value);
  const closestCardValue = reduce(cardsValues, (prev, current) => {
    return Math.abs(current - result) < Math.abs(prev - result)
      ? current
      : prev;
  });

  result = `${closestCardValue}, (${round(result, 2)})`;
  const newData = mapValues(data, flipCard);
  return { result, newData };
};

module.exports = { convertCards, flipCard, getVoteResult };
