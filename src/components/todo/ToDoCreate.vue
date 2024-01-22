<template>
  <div class="todo-create">
    <textarea
      v-model="taskText"
      @keyup.enter="onButtonClickHandler"
      class="todo-create__text"
    />
    <UiButton @click="onButtonClickHandler" is-container>
      <Icon icon="ci:add-plus-circle" width="40" height="40" />
    </UiButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../../store';
import UiButton from '../ui/UiButton.vue';
import { Icon } from '@iconify/vue';

const { addTask } = useTodoStore();
const taskText = ref('');

const onButtonClickHandler = () => {
  if (!taskText.value) {
    return;
  }
  addTask(taskText.value);
  taskText.value = '';
}
</script>

<style lang="scss" scoped>
.todo-create {
  display: flex;
  gap: 10px;

  &__text {
    flex-grow: 1;
  }
}
</style>
