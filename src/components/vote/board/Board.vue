<template>
  <v-col class="vote__board pa-3" cols="12" md="9">
    <div class="vote__board__head d-flex align-center mb-5">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="mr-1 text-h4 text-truncate">
            {{ room.settings.voteName }}
          </div>
        </template>
        <span>{{ room.settings.voteName }}</span>
      </v-tooltip>
      <LinkJoin class="ml-auto" />
    </div>
    <div class="vote__board__container pa-3 pt-7">
      <Status
        :result="room.vote.result || 0"
        :state="room.vote.state"
        :time="room.vote.time"
      />
      Available options:
      <div
        class="vote__board__available-options d-flex mb-5 overflow-x-auto pa-3"
      >
        <Card
          v-for="(card, index) in room.settings.cards"
          :key="index"
          :card="card"
          @on-click="onSelectCard"
        />
      </div>
      <div class="d-flex flex-wrap">
        <div
          class="vote__board__choice d-flex align-center flex-column mr-3 mb-3"
          v-for="user in votingUsers"
          :key="user.id"
          :set="(choice = getUserChoice(user.id))"
        >
          <Card v-if="choice" :card="choice" />
          <div v-else class="vote__board__selected-card mx-auto" />
          <User :user="user" size="small" class="mt-2" />
        </div>
      </div>
    </div>
  </v-col>
</template>

<script>
import socket from "@/socket";
import Card from "@/components/vote/common/Card";
import User from "@/components/vote/common/User";
import Status from "@/components/vote/common/Status";
import LinkJoin from "@/components/vote/common/LinkJoin";
import { VOTE_STATES, EVENTS_NAMES } from "@/constants";

export default {
  name: "Main",
  components: { LinkJoin, Status, Card, User },
  props: ["room", "currentUser"],
  computed: {
    votingUsers() {
      return this.room.users.filter((user) => user.isVoting);
    },
  },
  methods: {
    getUserChoice(userId) {
      return this.room.vote.data[userId];
    },
    onSelectCard(choice) {
      if (this.room.vote.state !== VOTE_STATES.voting) return;
      if (!this.currentUser.isVoting) return;
      socket.emit(EVENTS_NAMES.voteUser, this.currentUser, choice);
    },
  },
};
</script>

<style scoped lang="scss">
.vote__board {
  min-width: 400px;
  overflow-x: auto;
  &__container {
    position: relative;
    border: 1px solid;
    border-radius: 5px;
    box-shadow: 0 0 10px rgb(70, 70, 70);
  }
  &__available-options {
    @include styled-scrollbar;
  }
  &__choice {
    width: 110px;
  }
  &__selected-card {
    width: 50px;
    height: 70px;
    border: 1px solid;
    border-radius: 5px;
  }
}
</style>
