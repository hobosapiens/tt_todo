<script setup>
import { storeToRefs } from "pinia";
import { useTodoStore } from '../store';

const {
  isInDescendingOrder,
  isDoneShown,
  isInProgressShown,
  filteredTodosCounter
} = storeToRefs(useTodoStore());
</script>

<template>
  <div class="todo-filter">
    <input v-model="isInDescendingOrder" type="checkbox" id="vehicle1" name="vehicle1">
    <label for="vehicle1"> toggleisInDescendingOrder</label><br>
    <input v-model="isDoneShown" :disabled="!isInProgressShown" type="checkbox" id="vehicle2" name="vehicle2">
    <label for="vehicle2"> toggleIsDoneShown</label><br>
    <input v-model="isInProgressShown" :disabled="!isDoneShown" type="checkbox" id="vehicle3" name="vehicle3">
    <label for="vehicle3"> toggleInProgressShown</label><br>
    <span>Task counter: <b>{{ filteredTodosCounter }}</b></span>
  </div>
</template>

<style lang="scss" scoped>
.todo-filter {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
