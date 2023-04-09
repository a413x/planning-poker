<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="white" v-bind="attrs" v-on="on"> mdi-cog-outline </v-icon>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Settings </v-card-title>
      <SettingsForm v-model="currentSettings" />
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close"> Close </v-btn>
        <v-btn color="primary" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import socket from "@/socket";
import SettingsForm from "@/components/common/SettingsForm";
import { EVENTS_NAMES } from "@/constants";

export default {
  name: "SettingsDialog",
  components: { SettingsForm },
  props: ["settings"],
  data() {
    return {
      dialog: false,
      currentSettings: {
        valid: true,
        voteName: "",
        cards: "",
        time: 0,
      },
    };
  },
  watch: {
    settings: {
      immediate: true,
      handler(newSettings) {
        this.currentSettings = {
          ...newSettings,
          cards: (newSettings.cards || []).map((card) => card.value).join(),
        };
      },
    },
  },
  methods: {
    save() {
      if (!this.currentSettings.valid) return;
      this.dialog = false;
      socket.emit(EVENTS_NAMES.settingsUpdate, this.currentSettings);
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
