<template>
  <v-container v-if="currentUser" class="fill-height align-start">
    <v-row class="vote flex-md-row flex-column">
      <Board :room="room" :currentUser="currentUser" />
      <Options :room="room" :currentUser="currentUser" />
    </v-row>
    <v-snackbar v-model="userNotification.show" :timeout="1500" right>{{
      userNotification.text
    }}</v-snackbar>
  </v-container>
  <v-progress-circular indeterminate v-else />
</template>

<script>
import socket from "@/socket";
import Board from "@/components/vote/board/Board";
import Options from "@/components/vote/options/Options";
import { DEFAULT_ROOM, EVENTS_NAMES } from "@/constants";

export default {
  name: "Vote",
  components: { Board, Options },
  data: () => {
    return {
      room: { ...DEFAULT_ROOM },
      currentUser: null,
      userNotification: {
        show: false,
        text: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!["Create", "Join"].includes(from.name)) {
      const { roomId } = to.params;
      next(`/join/${roomId || ""}`);
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    socket.emit(EVENTS_NAMES.userLeft);
    next();
  },
  created() {
    socket.on(EVENTS_NAMES.roomDataUpdate, (newRoom) => {
      if (!newRoom) return;
      this.room = newRoom;
    });
    socket.on(EVENTS_NAMES.userJoinedNotification, ({ id, userName }) => {
      if (this.currentUser && this.currentUser.id !== id) {
        this.userNotification = {
          text: `User joined: ${userName}`,
          show: true,
        };
      }
    });
    socket.on(EVENTS_NAMES.userLeftNotification, ({ id, userName }) => {
      if (this.currentUser && this.currentUser.id !== id) {
        this.userNotification = { text: `User left: ${userName}`, show: true };
      }
    });
    socket.on(EVENTS_NAMES.setCurrentUser, (user) => {
      this.currentUser = user;
    });
    socket.emit(EVENTS_NAMES.voteComponentRendered);
  },
};
</script>

<style scoped lang="scss"></style>
