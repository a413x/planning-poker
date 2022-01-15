<template>
  <div id="app">
    <StartScreen @select="stateChange"/>
  </div>
</template>

<script>
import StartScreen from './components/start-screen/StartScreen'
import {APPSTATES} from "@/constants";
export default {
  name: 'App',
  components: { StartScreen },
  data: () => ({
    state: APPSTATES.STARTSCREEN
  }),
  methods: {
    stateChange(newState){
      this.state = newState
    }
  }
}
</script>

<style lang="scss">
body{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#app {
  @include flex-centered;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  background: coral;
}
</style>
