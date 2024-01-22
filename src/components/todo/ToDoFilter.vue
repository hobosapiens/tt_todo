<template>
  <div class="todo-filter">
    <ul class="todo-filter__options">
      <li class="todo-filter__option">
        <input
          v-model="isInDescendingOrder"
          class="todo-filter__checkbox"
          type="checkbox"
          id="order"
          name="order"
        >
        <label for="order">Descending order</label><br>
      </li>
      <li class="todo-filter__option">
        <input
          v-model="isDoneShown"
          class="todo-filter__checkbox"
          :disabled="!isInProgressShown"
          type="checkbox"
          id="is-done"
          name="is-done"
        >
        <label for="is-done">Show completed</label>
      </li>
      <li class="todo-filter__option">
        <input
          v-model="isInProgressShown"
          class="todo-filter__checkbox"
          :disabled="!isDoneShown"
          type="checkbox"
          id="is-in-progress"
          name="is-in-progress"
        >
        <label for="is-in-progress">Show in progress</label>
      </li>
    </ul>
    <span class="todo-filter__total">ToDos: <b>{{ filteredTodosCounter }}</b></span>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTodoStore } from '../../store';

const {
  isInDescendingOrder,
  isDoneShown,
  isInProgressShown,
  filteredTodosCounter
} = storeToRefs(useTodoStore());
</script>

<style lang="scss" scoped>
.todo-filter {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  margin-top: 20px;
  margin-bottom: 20px;

  &__options {
    display: flex;
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__checkbox {
    margin-right: 10px;
    accent-color: $color-accent;
  }

  &__total {
    display: inline-flex;
    margin-left: auto;
    margin-right: 2px;
  }
}
</style>
