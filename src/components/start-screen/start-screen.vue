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
import {APPSTATES} from "@/constants";
export default {
    name: 'StartScreen',
    components: { TextButton },
    methods: {
        create() {this.$emit('select', APPSTATES.CREATE)},
        join() {this.$emit('select', APPSTATES.JOIN)}
    }
}
</script>

<style lang="less">
.start-screen{
    .flex-centered;
    flex-flow: column;
    &__btn{
        margin-bottom: 20px;
        font-size: 48px;
    }
}
</style>