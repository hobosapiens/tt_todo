<script setup>
import ToDo from './components/todo/ToDo.vue';
</script>

<template>
  <ToDo />
</template>

<style lang="scss">
.iconify:hover path {
  transition: color 0.3s ease;
  color: $color-accent;
}
</style>
