<template>
  <div class="join-form">
    <v-row>
      <UserForm v-model="user" />
    </v-row>
    <v-row class="flex-column">
      Room id:
      <v-text-field v-model="roomId" solo dense />
    </v-row>
    <v-row>
      <v-checkbox v-model="spectatorChecked" label="Join as a spectator" dark>
      </v-checkbox>
    </v-row>
    <v-row justify="end">
      <v-btn @click="join">Join</v-btn>
      <v-btn class="ml-2" @click="back">Back</v-btn>
    </v-row>
    <v-row class="float-end pt-2" style="color: #ff5252" v-if="error">
      {{ error }}
    </v-row>
  </div>
</template>

<script>
import socket from "@/socket";
import UserForm from "@/components/common/UserForm";
import { EVENTS_NAMES } from "@/constants";
import { getRandomColor } from "@/methods/random";

export default {
  name: "JoinForm",
  components: { UserForm },
  data: () => {
    return {
      user: {
        name: "Anonymous",
        avatar: {
          text: "A",
          color: getRandomColor(),
        },
      },
      spectatorChecked: false,
      roomId: "",
      error: "",
    };
  },
  created() {
    this.roomId = this.$route.params.roomId || "";
    socket.on(EVENTS_NAMES.joinError, (message) => {
      this.error = message;
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    join() {
      if (!this.roomId) {
        this.error = "Enter room id";
        return;
      }
      this.error = "";

      const userName = this.user.name || "Anonymous";
      const avatar = userName
        ? this.user.avatar
        : { ...this.user.avatar, text: "A" };

      const data = {
        role: "participant",
        userName,
        avatar,
        isVoting: !this.spectatorChecked,
        roomId: this.roomId,
      };

      socket.emit(EVENTS_NAMES.joinRoom, data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
