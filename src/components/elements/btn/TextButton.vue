<template>
    <button
        class="txt-button"
        :disabled="disabled"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "TextButton",
    props: { disabled: Boolean }
}
</script>

<style scoped lang="scss">
.txt-button{
    color: white;
    background: transparent;
    box-shadow: none;
    user-select: none;
    cursor: pointer;
    &:hover{
        color: lightgray;
    }
}
</style>