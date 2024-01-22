<template>
  <div v-if="filteredTodos.length" class="todo">
    <ToDoCreate />
    <ToDoFilter />
    <ToDoList :todos="filteredTodos" />
  </div>
  <UiLoader v-else />
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../../store';
import ToDoCreate from './ToDoCreate.vue';
import ToDoList from './ToDoList.vue';
import ToDoFilter from './ToDoFilter.vue';
import UiLoader from '../ui/UiLoader.vue';

const { filteredTodos } = storeToRefs(useTodoStore());
const { loadTasks } = useTodoStore();

onMounted(() => {
  loadTasks();
})
</script>

<style scoped>
.todo {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 800px;
}
</style>
