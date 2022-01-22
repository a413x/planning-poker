<template>
    <v-app>
        <v-container class="fill-height justify-center" fluid>
            <StartScreen v-if="isStartScreen" @select="stateChange"/>
            <CreateForm v-else-if="isCreating" @back="back"/>
            <JoinForm v-else-if="isJoining" @back="back"/>
        </v-container>
    </v-app>
</template>

<script>
import StartScreen from './components/start-screen/StartScreen'
import CreateForm from "@/components/create-form/CreateForm";
import JoinForm from "@/components/join-form/JoinForm";
import {APPSTATES} from "@/constants";
export default {
  name: 'App',
  components: { StartScreen, CreateForm, JoinForm },
  data: () => ({
    state: APPSTATES.STARTSCREEN
  }),
  computed: {
    isStartScreen(){ return this.state === APPSTATES.STARTSCREEN },
    isCreating(){ return this.state === APPSTATES.CREATE },
    isJoining(){ return this.state === APPSTATES.JOIN },
  },
  methods: {
    stateChange(newState){
      this.state = newState
    },
    back(){ this.state = APPSTATES.STARTSCREEN }
  }
}
</script>

<style lang="scss">
html{
  overflow: auto
}
#app {
  background: coral;
  color: white;
}
</style>
