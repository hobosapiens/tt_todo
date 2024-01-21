import { defineStore } from 'pinia'
import { getFromLocalStorage, putToLocalStorage } from '../utils'

export const useTodoStore = defineStore('counter', {
  state: () => ({
    todos: [],
    isInDescendingOrder: true,
    isDoneShown: true,
    isInProgressShown: true,
  }),
  getters: {
    filteredTodo() {
      const todos = [...this.todos];

      if (this.isInDescendingOrder) {
        todos.sort((a, b) => b.id - a.id);
      }

      if (this.isDoneShown && this.isInProgressShown) {
        return todos;
      }

      if (this.isDoneShown) {
        return todos.filter(task => task.completed);
      }

      if (this.isInProgressShown) {
        return todos.filter(task => !task.completed);
      }
    },
    filteredTodosCounter() {
      return this.filteredTodo.length;
    }
  },
  actions: {
    async loadTasks() {
      const localData = getFromLocalStorage('todos');

      if (localData) {
        this.todos = localData;
        return;
      }

      const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(tasks => {
          this.todos = tasks;
          putToLocalStorage('todos', tasks);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
    saveTodosToStorage() {
      putToLocalStorage('todos', this.todos);
    },
    addTask(taskText) {
      const lastIndex = this.todos.reduce((max, item) => {
        return item.id > max ? item.id : max;
      }, 0);
      const task = {
        userId: 1,
        id: lastIndex + 1,
        title: taskText,
        completed: false
      }
      this.todos.push(task);
      this.saveTodosToStorage();
    },
    updateTask(taskId, taskTitle) {
      const index = this.todos.findIndex(task => task.id === taskId);

      if (index !== -1) {
        this.todos[index].title = taskTitle;
        this.saveTodosToStorage();
      }
    },
    toggleTaskStatus(taskId) {
      const index = this.todos.findIndex(task => task.id === taskId);

      if (index !== -1) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodosToStorage();
      }
    },
    removeTask(taskId) {
      this.todos = this.todos.filter(task => task.id !== taskId);
      this.saveTodosToStorage();
    },
  },
})
