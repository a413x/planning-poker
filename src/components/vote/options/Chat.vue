<template>
  <div class="vote__tools__chat">
    <div class="vote__tools__chat__messages">
      <div v-for="message in chat" :key="message.id">
        <div class="d-flex align-center">
          <span
            class="font-weight-bold text-truncate"
            :title="message.author.userName"
            >{{ message.author.userName }}</span
          >
          <span class="ml-2 text-caption">({{ message.time }})</span>
        </div>
        <div class="mb-2 text-body-2">{{ message.text }}</div>
      </div>
    </div>
    <div class="d-flex align-center">
      <v-text-field
        v-model="inputText"
        placeholder="Message"
        class="mr-2"
        @keyup="(e) => e.keyCode === 13 && sendMessage()"
      ></v-text-field>
      <v-icon :disabled="!inputText" @click="sendMessage"> mdi-send </v-icon>
    </div>
  </div>
</template>

<script>
import socket from "@/socket";
import { EVENTS_NAMES } from "@/constants";

export default {
  name: "Chat",
  props: ["chat", "currentUser"],
  data() {
    return {
      inputText: "",
    };
  },
  methods: {
    sendMessage() {
      const message = this.inputText;
      if (!message) return;
      socket.emit(EVENTS_NAMES.chatMessage, {
        time: new Date().toLocaleTimeString(),
        author: this.currentUser,
        text: this.inputText,
      });
      this.inputText = "";
    },
  },
};
</script>

<style scoped lang="scss">
.vote__tools__chat {
  &__messages {
    max-height: 300px;
    overflow-y: auto;
    @include styled-scrollbar;
  }
}
</style>
