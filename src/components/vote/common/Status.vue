<template>
  <div
    class="vote__status text-h5 d-inline-flex align-center"
    v-if="status === 'voting'"
  >
    {{ time > 0 ? `${time} s, ` : "" }}
    Pick your card.
  </div>
  <div
    class="vote__status text-h5 d-inline-flex align-center"
    v-else-if="status === 'ended'"
  >
    Result:
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-chip v-bind="attrs" v-on="on" class="ml-2">
          {{ result }}
        </v-chip>
      </template>
      <span>{{ result }}</span>
    </v-tooltip>
  </div>
  <div class="vote__status text-h5 d-inline-flex align-center" v-else>
    Waiting for start...
  </div>
</template>

<script>
import { VOTE_STATES } from "@/constants";

export default {
  name: "Status",
  props: ["state", "time", "result"],
  computed: {
    status() {
      if (this.state === VOTE_STATES.voting) {
        return "voting";
      } else if (this.state === VOTE_STATES.ended) {
        return "ended";
      } else {
        return "idle";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.vote__status {
  position: absolute;
  top: 2px;
  right: 10px;
}
</style>
