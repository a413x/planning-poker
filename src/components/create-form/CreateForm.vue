<template>
  <div class="create-form">
    <v-row>
      <UserForm v-model="user" />
    </v-row>
    <v-row class="mb-5">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Settings</v-expansion-panel-header>
          <v-expansion-panel-content>
            <SettingsForm v-model="settings" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <v-checkbox v-model="spectatorChecked" label="Spectate" dark>
      </v-checkbox>
    </v-row>
    <v-row justify="end">
      <v-btn @click="create">Create</v-btn>
      <v-btn class="ml-2" @click="back">Back</v-btn>
    </v-row>
  </div>
</template>

<script>
import socket from "@/socket";
import UserForm from "@/components/common/UserForm";
import SettingsForm from "@/components/common/SettingsForm";
import { EVENTS_NAMES } from "@/constants";
import { getRandomColor } from "@/methods/random";

export default {
  name: "CreateForm",
  components: { SettingsForm, UserForm },
  data: () => {
    return {
      settings: {
        valid: true,
        voteName: "Vote",
        cards: "1, 2, 3, 4, 5",
        time: 0,
      },
      user: {
        name: "Anonymous",
        avatar: {
          text: "A",
          color: getRandomColor(),
        },
      },
      spectatorChecked: false,
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    create() {
      const { valid } = this.settings;
      if (!valid) return;

      const userName = this.user.name || "Anonymous";
      const avatar = userName
        ? this.user.avatar
        : { ...this.user.avatar, text: "A" };

      const data = {
        user: {
          role: "admin",
          userName,
          avatar,
          isVoting: !this.spectatorChecked,
        },
        settings: this.settings,
      };

      socket.emit(EVENTS_NAMES.createRoom, data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
