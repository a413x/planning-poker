<template>
    <div class="user-form d-flex justify-center">
        <div class="d-flex flex-column">
            Avatar
            <v-avatar size="50" :color="avatar && avatar.color || 'grey'">
                <span class="white--text">{{avatar && avatar.text || ""}}</span>
            </v-avatar>
        </div>
        <div class="d-flex flex-column ml-5">
            User name
            <v-text-field
                class="user-form__input"
                :value="name"
                @input="onInput"
                solo
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "UserForm",
    props: ["name", "avatar"],
    methods: {
        onInput(value) {
            const data = {
                name: value,
                avatar: this.avatar
            }
            if(value) {
                data.avatar = {
                    ...this.avatar,
                    text: value[0]
                }
            }
            this.$emit("on-name-change", data)
        }
    }
}
</script>

<style scoped lang="scss"></style>