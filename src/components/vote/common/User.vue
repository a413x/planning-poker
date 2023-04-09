<template>
  <div class="vote__user d-flex align-center mx-1">
    <v-avatar
      class="vote__user__avatar"
      :size="avatarSize"
      :color="avatar.color"
    >
      <span :class="`white--text ${fontSize}`">{{ avatar.text }}</span>
    </v-avatar>
    <div
      :class="`vote__user__name ml-2 text-truncate ${fontSize}`"
      :title="user.userName"
    >
      {{ user.userName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["user", "hideIcons", "size"],
  computed: {
    avatarSize() {
      return this.size === "small" ? 16 : this.size === "medium" ? 24 : 36;
    },
    fontSize() {
      return this.size === "small" ? "text-body-2" : "text-h7";
    },
    avatar() {
      return this.user.avatar || { color: "red", text: "N" };
    },
  },
};
</script>

<style scoped lang="scss">
.vote__user {
  &__avatar {
    position: relative;
    overflow: visible;
  }
  &__icon {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
  }
  &__name {
    display: -moz-box;
    display: -webkit-box;
    -moz-box-orient: vertical;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-word;
    white-space: normal !important;
  }
}
</style>
