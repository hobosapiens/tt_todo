<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useTodoStore } from '../store/index'
import ToDoCreate from './ToDoCreate.vue'
import ToDoList from './ToDoList.vue'
import ToDoFilter from './ToDoFilter.vue'
import UiLoader from './ui/UiLoader.vue'

const { filteredTodo } = storeToRefs(useTodoStore());
const { loadTasks } = useTodoStore();

onMounted(() => {
  loadTasks();
})
</script>

<template>
  <ToDoCreate />
  <ToDoFilter />
  <ToDoList
    v-if="filteredTodo.length"
    :todos="filteredTodo"
  />
  <UiLoader v-else />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
