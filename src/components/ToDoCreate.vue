<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store';

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

<template>
  <textarea v-model="taskText" @keyup.enter="onButtonClickHandler" />
  <button @click="onButtonClickHandler">Add</button>
</template>

<style scoped>
</style>
