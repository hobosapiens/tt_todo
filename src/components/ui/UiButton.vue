<template>
  <button
    @click="handleClick"
    class="button"
    :class="{'button_container': props.isContainer}"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  isContainer: {
    type: Boolean,
    required: false,
  },
});

const handleClick = () => {
  emit('click');
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid $color-accent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: $color-dark;
  cursor: pointer;
  transition: border-color 0.25s;

  &:not(.button_container) {
    &:hover {
      border-color: $color-accent-light;
    }

    &:focus, &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  &_container {
    background: transparent;
    border: none;
    outline: 0;
    padding: 0;
  }
}
</style>
