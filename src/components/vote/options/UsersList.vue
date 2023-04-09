<template>
  <div class="vote__users-list">
    <div class="d-flex flex-column">
      <User
        class="mb-4"
        v-for="user in participants"
        :user="user"
        :key="user.id"
      />
    </div>
    <div v-if="spectators.length" class="d-flex flex-column mt-1">
      Spectators:
      <User
        class="my-1"
        v-for="user in spectators"
        :user="user"
        size="small"
        :key="user.id"
      />
    </div>
  </div>
</template>

<script>
import User from "@/components/vote/common/User";
export default {
  name: "Users",
  components: { User },
  props: ["users"],
  computed: {
    participants() {
      return this.users.filter((user) => user.isVoting);
    },
    spectators() {
      return this.users.filter((user) => !user.isVoting);
    },
  },
};
</script>

<style scoped lang="scss">
.vote__users-list {
  min-width: 150px;
}
</style>
