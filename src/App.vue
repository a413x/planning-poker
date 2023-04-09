<template>
  <v-app>
    <v-container class="fill-height justify-center" fluid>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  background: #baaaa5;
  color: white;
}
</style>
