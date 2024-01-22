<template>
  <TransitionGroup name="list" tag="div" class="todo-list">
    <ToDoCard
      v-for="{ id, title, completed } in loadedTodos"
      :key="id"
      :id="id"
      :title="title"
      :isCompleted="completed"
    />
  </TransitionGroup>
  <UiButton @click="loadMore">
    Load more...
  </UiButton>
</template>

<script setup>
import ToDoCard from './ToDoCard.vue';
import UiButton from './../ui/UiButton.vue';
import { useLoadMore } from './../../hooks/use-load-more';
import { toRefs, watch } from 'vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const { todos } = toRefs(props);
const { data: loadedTodos, loadMore } = useLoadMore(todos.value);

watch(todos, (newData) => {
  const { data: updatedTodos } = useLoadMore(newData);
  loadedTodos.value = updatedTodos.value;
});
</script>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
