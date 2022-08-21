<template>
    <v-app>
        <v-container class="fill-height justify-center" fluid>
            <router-view />
        </v-container>
    </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html{
  overflow: auto
}
#app {
  background: #baaaa5;
  color: white;
}
</style>
