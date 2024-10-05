<template>
  <div class="container mt-5">
    <h2 class="mb-4">Create Task</h2>

    <!-- Task Form -->
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="createTask" class="mb-5">
              <div class="mb-3">
                <label for="taskTitle" class="form-label">Task Title</label>
                <input
                  v-model="newTask.title"
                  type="text"
                  id="taskTitle"
                  class="form-control"
                  placeholder="Enter task title"
                  required
                />
              </div>
      
              <div class="mb-3">
                <label for="taskDescription" class="form-label">Task Description</label>
                <editor
                  api-key="wdwe4cdcb6537mp75ejkq0anbzx0o52ahsvsdueqnqbkjww8"
                  :init="editorConfig"
                  v-model="newTask.description"
                />
              </div>
      
              <div class="mb-3">
                <label for="taskStatus" class="form-label">Task Status</label>
                <select v-model="newTask.status" id="taskStatus" class="form-select">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
      
              <div class="mb-3">
                <label for="dueDate" class="form-label">Due Date</label>
                <input v-model="newTask.due_date" type="date" id="dueDate" class="form-control" required />
              </div>
      
              <button type="submit" class="btn btn-primary">Create Task</button>
            </form>
        </div>
    </div>

    <!-- Task List -->
    <h2 class="my-4">Task List</h2>

    <!-- Task Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Due Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td v-html="task.description"></td>
          <td>{{ task.status }}</td>
          <td>{{ (task.due_date) }}</td>
          <td>
            <button @click="editTask(task)" class="btn btn-warning btn-sm">Edit</button>
            <router-link :to="'/task-details/' + task.id" class="btn btn-info btn-sm">Show</router-link>
            <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    Editor
  },
  data() {
    return {
      tasks: [],
      newTask: {
        title: "",
        description: "",
        status: "To Do",
        due_date: ""
      },
      editorConfig:{
        height: 300,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
      }
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.tasks = response.data;
    },

    async createTask() {
      const token = localStorage.getItem("token");
      if (this.editingTask) {
        await axios.put(`/api/tasks/${this.editingTask.id}`, this.newTask, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        const response = await axios.post("/api/tasks", this.newTask, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tasks.push(response.data);
      }
      this.resetForm();
    },
    async deleteTask(id) {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    editTask(task) {
      this.newTask = { ...task };
      this.editingTask = task;
    },
    resetForm() {
      this.newTask = {
        title: "",
        description: "",
        status: "To Do",
        due_date: ""
      };
      this.editingTask = null;
      this.editor.commands.clearContent();
    }
  },
};
</script>

<style scoped>
.editor {
  min-height: 150px;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: 0.375rem;
}
.table th {
  background-color: #4f5a66;
  color: white;
}
.table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
