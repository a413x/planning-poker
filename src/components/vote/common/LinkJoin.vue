<template>
  <span class="link-join d-flex align-center pa-1">
    <v-icon small class="mx-1">mdi-link-variant</v-icon>
    <span>Link to join:</span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" class="text-truncate ml-2">{{
          link
        }}</span>
      </template>
      <span>{{ link }}</span>
    </v-tooltip>
    <v-icon small @click="onCopy" class="mx-2" color="white">
      {{ copied ? "mdi-check" : "mdi-content-copy" }}
    </v-icon>
  </span>
</template>

<script>
export default {
  name: "LinkJoin",
  data() {
    const { currentRoute } = this.$router;
    return {
      copied: false,
      link: `${window.location.host}/join/${currentRoute.params.roomId}`,
    };
  },
  mounted() {
    document.addEventListener("copy", this.copyListener);
  },
  beforeUnmount() {
    document.removeEventListener("copy", this.copyListener);
  },
  methods: {
    onCopy() {
      navigator.clipboard.writeText(this.link);
      this.copied = true;
    },
    copyListener() {
      this.copied = false;
    },
  },
};
</script>

<style scoped lang="scss">
.link-join {
  max-width: 300px;
  white-space: nowrap;
  border: 1px solid white;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
