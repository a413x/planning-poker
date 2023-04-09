import { CARDS_SUITS_COLORS, CARDS_SUITS } from "@/components/vote/constants";

export const getCardSuitColor = ({ suit }) => {
  return CARDS_SUITS_COLORS[suit];
};
export const getCardSuitIcon = ({ suit }) => {
  if (suit === CARDS_SUITS.spades) {
    return "mdi-cards-spade";
  }
  if (suit === CARDS_SUITS.clubs) {
    return "mdi-cards-club";
  }
  if (suit === CARDS_SUITS.diamonds) {
    return "mdi-cards-diamond";
  }
  return "mdi-cards-heart";
};
