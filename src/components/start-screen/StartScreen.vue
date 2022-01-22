<template>
    <div class="start-screen">
        <TextButton
            class="start-screen__btn"
            @click="create"
        >
            Create room
        </TextButton>
        <TextButton
            class="start-screen__btn"
            @click="join"
        >
            Join room
        </TextButton>
    </div>
</template>

<script>
import TextButton from "@/components/elements/btn/TextButton";
export default {
    name: 'StartScreen',
    components: { TextButton },
    methods: {
        create() { this.$router.push('/create') },
        join() { this.$router.push('/join') }
    }
}
</script>

<style lang="scss">
.start-screen{
    @include flex-centered;
    flex-flow: column;
    &__btn{
        margin-bottom: 20px;
        font-size: 48px;
    }
}
</style>