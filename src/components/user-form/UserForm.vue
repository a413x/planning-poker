<template>
    <div class="user-form d-flex justify-center">
        <div class="d-flex flex-column">
            Avatar
            <v-avatar tile size="50" color="grey" />
        </div>
        <div class="d-flex flex-column ml-5">
            User name
            <v-text-field class="user-form__input" v-model="name" solo />
        </div>
    </div>
</template>

<script>
export default {
    name: "UserForm",
    props: ["name"]
}
</script>

<style scoped lang="scss"></style>