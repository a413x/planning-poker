<template>
  <div class="user-form d-flex justify-center">
    <div class="d-flex flex-column">
      Avatar
      <v-avatar
        size="50"
        :color="(value.avatar && value.avatar.color) || 'grey'"
      >
        <span class="white--text">{{
          (value.avatar && value.avatar.text) || ""
        }}</span>
      </v-avatar>
    </div>
    <div class="d-flex flex-column ml-5">
      User name
      <v-text-field
        class="user-form__input"
        :value="value.name"
        @input="onNameChange"
        solo
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: ["value"],
  methods: {
    onNameChange(name) {
      const user = {
        name,
        avatar: this.value.avatar,
      };
      if (name) {
        user.avatar = {
          ...this.value.avatar,
          text: name[0],
        };
      }
      this.$emit("input", user);
    },
  },
};
</script>

<style scoped lang="scss"></style>
