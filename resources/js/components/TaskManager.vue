<template>
    <div>
      <h2>Task Manager</h2>
      <form @submit.prevent="createTask">
        <input v-model="newTask.title" type="text" placeholder="Task Title" required />
        <textarea v-model="newTask.description" placeholder="Task Description"></textarea>
        <select v-model="newTask.status">
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <input v-model="newTask.due_date" type="date" required />
        <button type="submit">Create Task</button>
      </form>
  
      <ul v-if="tasks.length">
        <li v-for="task in tasks" :key="task.id">
          <strong>{{ task.title }}</strong> - {{ task.status }} 
          <button @click="editTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [],
        newTask: {
          title: '',
          description: '',
          status: 'To Do',
          due_date: ''
        },
        editingTask: null,
      };
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.tasks = response.data;
      },
      async createTask() {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/tasks', this.newTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.tasks.push(response.data);
        this.resetForm();
      },
      async deleteTask(id) {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      editTask(task) {
        this.newTask = { ...task };
        this.editingTask = task;
      },
      resetForm() {
        this.newTask = { title: '', description: '', status: 'To Do', due_date: '' };
        this.editingTask = null;
      }
    }
  };
  </script>
  