<template>
  <div class="start-screen d-flex flex-column align-center justify-center">
    <v-btn plain color="white" class="text-h3 mb-7" @click="create">
      Create room
    </v-btn>
    <v-btn plain color="white" class="text-h3 mt-7" @click="join">
      Join room
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  methods: {
    create() {
      this.$router.push("/create");
    },
    join() {
      this.$router.push("/join");
    },
  },
};
</script>

<style lang="scss"></style>
