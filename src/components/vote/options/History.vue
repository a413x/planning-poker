<template>
  <div class="vote__options__settings__history">
    <div class="vote__options__settings__history__content">
      <div class="text--disabled" v-if="!history.length">No history yet...</div>
      <div v-for="(item, index) in history" :key="index">
        <b>{{ item.voteName }}</b> {{ item.action }} at
        {{ item.time }}
        <div v-if="item.result" class="d-flex align-center">
          Result: <v-chip class="ml-1">{{ item.result }}</v-chip>
        </div>
        <v-divider class="mt-1" />
      </div>
    </div>
    <div class="mt-3" v-if="showSettings">
      <v-icon @click="clearHistory">mdi-delete</v-icon>
    </div>
  </div>
</template>

<script>
import socket from "@/socket";
import { EVENTS_NAMES } from "@/constants";

export default {
  name: "History",
  props: ["history", "showSettings"],
  methods: {
    clearHistory() {
      socket.emit(EVENTS_NAMES.clearHistory);
    },
  },
};
</script>

<style scoped lang="scss">
.vote__options__settings__history {
  &__content {
    max-height: 300px;
    overflow-y: auto;
    @include styled-scrollbar;
  }
  i {
    cursor: pointer;
  }
}
</style>
