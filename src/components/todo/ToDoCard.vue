<template>
  <div class="todo-card" :class="{'todo-card_completed': isCompleted}">
    <textarea v-if="isEditable" v-model="cardText" class="todo-card__textarea">{{ cardText }}</textarea>
    <span v-else @dblclick="toggleIsEditable" class="todo-card__text">{{ title }}</span>
    <div class="todo-card__options">
      <button @click="toggleIsEditable">
        <Icon v-if="isEditable" icon="mdi:cancel-outline" width="25" height="25" color="#e95959" />
        <Icon v-else icon="akar-icons:edit" width="25" height="25" />
      </button>
      <button v-if="isEditable" @click="applyEditing">
        <Icon icon="mdi:done-outline" width="25" height="25" color="#36db81" />
      </button>
      <button @click="removeTask(id)">
        <Icon icon="ion:trash-outline" width="25" height="25" />
      </button>
      <button v-if="isCompleted" @click="toggleTaskStatus(id)">
        <Icon icon="ant-design:rollback-outlined" width="25" height="25" />
      </button>
      <button v-else @click="toggleTaskStatus(id)">
        <Icon icon="mdi:checkbox-outline" width="25" height="25" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted } from "vue";
import { useTodoStore } from '../../store';
import { Icon } from '@iconify/vue';

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

<style lang="scss" scoped>
.todo-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  gap: 40px;
  border-radius: 10px;
  background-color: $color-primary;

  &_completed {
    background-color: $color-green;
  }

  &__text {
    text-align: left;
  }

  &__textarea {
    flex-grow: 1;
    height: 60px;
  }

  &__options {
    display: flex;
    gap: 10px;
  }
}
</style>
