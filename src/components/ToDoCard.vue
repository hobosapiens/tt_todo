<script setup>
import { toRefs, ref, onMounted } from "vue";
import { useTodoStore } from '../store';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const { removeTask, updateTask, toggleTaskStatus } = useTodoStore();
const { id, title, isCompleted } = toRefs(props);
const isEditable = ref(false);
const cardText = ref('')

const toggleIsEditable = () => {
  isEditable.value = !isEditable.value;
  cardText.value = title.value;
}

const applyEditing = () => {
  updateTask(id.value, cardText.value);
  toggleIsEditable();
}

onMounted(() => {
  cardText.value = title.value;
})
</script>

<template>
  <div class="todo-card">
    <div>
      <button @click="toggleIsEditable">{{ isEditable ? 'Cancel' : 'Edit' }}</button>
      <button v-if="isEditable" @click="applyEditing">Apply</button>
    </div>
    <div>{{ id }}</div>
    <textarea v-if="isEditable" v-model="cardText">{{ cardText }}</textarea>
    <span v-else @dblclick="toggleIsEditable">{{ title }}</span>
    <span> - {{ isCompleted ? 'Done' : 'In progress' }}</span>
    <div>
      <button @click="removeTask(id)">Delete</button>
      <button v-if="isCompleted" @click="toggleTaskStatus(id)">Complete</button>
      <button v-else @click="toggleTaskStatus(id)">Rollback</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  background-color: $color-primary;
}
</style>
