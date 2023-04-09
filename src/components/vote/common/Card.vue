<template>
  <div class="vote__card" @click="$emit('on-click', card)">
    <div :class="innerClass">
      <div
        class="vote__card__face d-flex align-center justify-center text-h5"
        :style="{ color: suitColor }"
      >
        <div v-if="faced" class="text-truncate">
          {{ card.value }}
        </div>
        <v-icon
          v-if="faced"
          class="vote__card__face__suit vote__card__face__suit_top"
          :color="suitColor"
          x-small
        >
          {{ suitIcon }}
        </v-icon>
        <v-icon
          v-if="faced"
          class="vote__card__face__suit vote__card__face__suit_bottom"
          :color="suitColor"
          x-small
        >
          {{ suitIcon }}
        </v-icon>
      </div>
      <div class="vote__card__back d-flex align-center justify-center" />
    </div>
  </div>
</template>

<script>
import {
  getCardSuitColor,
  getCardSuitIcon,
} from "@/components/vote/methods/cardSuit";
export default {
  name: "Card",
  props: ["card"],
  computed: {
    innerClass() {
      const cls = "vote__card__inner";
      return this.card.side === "face" ? cls : cls + " " + cls + "_flip";
    },
    suitIcon() {
      return this.card.side === "face" ? getCardSuitIcon(this.card) : null;
    },
    suitColor() {
      return getCardSuitColor(this.card);
    },
    faced() {
      return this.card.side === "face";
    },
  },
};
</script>

<style scoped lang="scss">
.vote__card {
  min-width: 50px;
  max-width: 50px;
  height: 70px;
  background: transparent;
  cursor: pointer;
  perspective: 1000px;
  &:not(:first-child) {
    margin-left: 15px;
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    -webkit-transition: transform 0.8s;
    transition: transform 0.8s;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    &:hover {
      box-shadow: 0 0 10px rgb(20, 20, 20);
    }
    &_flip {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
  }

  &__face,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &__face {
    color: black;
    background: white;
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    &__suit {
      position: absolute;
      &_top {
        top: 2px;
        left: 2px;
      }
      &_bottom {
        bottom: 2px;
        right: 2px;
      }
    }
  }

  &__back {
    background: grey;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}
</style>
