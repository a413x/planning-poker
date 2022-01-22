<template>
    <div class="join-form">
        <v-row>
            <UserForm />
        </v-row>
        <v-row justify="end">
            <v-btn>Join</v-btn>
            <v-btn class="ml-2" @click="$emit('back')">Back</v-btn>
        </v-row>
    </div>
</template>

<script>
import UserForm from "@/components/user-form/UserForm";
export default {
    name: "JoinForm",
    components: { UserForm }
}
</script>

<style scoped lang="scss"></style>