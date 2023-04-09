<template>
  <v-col class="vote__options pa-3 pt-16" cols="12" md="3">
    <div v-if="isAdmin">
      <v-btn
        :color="!voteStarted ? 'info' : ''"
        class="mb-2 mr-2"
        @click="() => (!voteStarted ? onStartVote() : onEndVote())"
      >
        {{ voteStarted ? "End" : "Start" }}
      </v-btn>
      <span class="vote__options__settings">
        <SettingsDialog :settings="room.settings" />
      </span>
    </div>
    <v-checkbox
      :input-value="!currentUser.isVoting"
      @change="spectatorCheckboxChange"
      label="Spectate"
      dark
    />
    <v-expansion-panels v-model="panels" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>Users</v-expansion-panel-header>
        <v-expansion-panel-content>
          <UsersList :users="room.users" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @click="resetUnread">
        <v-expansion-panel-header>
          <v-badge left dot :value="hasUnreadMessages">Chat</v-badge>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Chat :chat="room.chat" :currentUser="currentUser" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>History</v-expansion-panel-header>
        <v-expansion-panel-content>
          <History :history="room.vote.history" :show-settings="isAdmin" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>
</template>

<script>
import socket from "@/socket";
import SettingsDialog from "@/components/vote/settings/SettingsDialog";
import Chat from "@/components/vote/options/Chat";
import UsersList from "@/components/vote/options/UsersList";
import History from "@/components/vote/options/History";
import { VOTE_STATES, EVENTS_NAMES } from "@/constants";

export default {
  name: "Options",
  components: { History, UsersList, Chat, SettingsDialog },
  props: ["room", "currentUser"],
  data() {
    return {
      panels: [],
      hasUnreadMessages: !!(this.room && this.room.chat.length),
    };
  },
  watch: {
    "room.chat"(newValue, oldValue) {
      this.hasUnreadMessages =
        oldValue.length !== newValue.length && !this.chatPanelOpened;
    },
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === "admin";
    },
    voteStarted() {
      return this.room.vote.state === VOTE_STATES.voting;
    },
    chatPanelOpened() {
      return this.panels.includes(1);
    },
  },
  methods: {
    onStartVote() {
      socket.emit(EVENTS_NAMES.voteStart);
    },
    onEndVote() {
      socket.emit(EVENTS_NAMES.voteEnd);
    },
    resetUnread() {
      this.hasUnreadMessages = false;
    },
    spectatorCheckboxChange() {
      socket.emit(EVENTS_NAMES.updateUser, {
        ...this.currentUser,
        isVoting: !this.currentUser.isVoting,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.vote__options {
  &__settings {
    position: relative;
    bottom: 3px;
  }
}
</style>
