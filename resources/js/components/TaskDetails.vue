<template>
  <div class="container mt-5">
    <h2 class="mb-4">Task Details</h2>

    <!-- Task Form -->
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="taskTitle" class="form-label">
            <h5>
              {{
              task && task.title ? task.title : ""
              }}
            </h5>
          </label>
        </div>
        <div class="mb-3">
          <label for="dueDate" class="form-label">
            <i class="bi bi-calendar3-week"></i>
            {{
            task && task.due_date ? task.due_date : ""
            }}
          </label>
        </div>
        <div class="mb-3">
          <p v-html="task.description"></p>
        </div>

        <div class="mb-3">
          <label for="taskStatus" class="form-label">Task Status</label>
          <select v-model="task.status" id="taskStatus" class="form-select" disabled>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Under Review">Under Review</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <form @submit.prevent="submitComment" class="mb-5">
          <div class="mb-3">
            <label for="taskDescription" class="form-label">Write your comment</label>
            <editor
              api-key="wdwe4cdcb6537mp75ejkq0anbzx0o52ahsvsdueqnqbkjww8"
              :init="editorConfig"
              v-model="comment"
            />
          </div>
          <button type="submit" class="btn btn-primary float-right">Send</button>
        </form>
        <div class="mt-4" v-for="comment in task.comments" :key="comment.id">
          <div class="row">
            <div class="col-2">
              <h6 class="card-text">  <i class="bi bi-person-circle"></i> {{comment.user ? comment.user.name : ''}}</h6>
            </div>
            <div class="col-10">
              <p>{{comment.created_at}}</p>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-body">
              <p v-html="comment.comment"></p>
            </div>
          </div>
          <router-link to="/reply"> Reply</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor
  },
  data() {
    return {
      task: {},
      comment: "",
      editorConfig: {
        height: 200,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help"
      }
    };
  },
  created() {
    const taskId = this.$route.params.id;
    this.fetchTaskDetails(taskId);
  },
  methods: {
    async fetchTaskDetails(taskId) {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.task = response.data;
    },

    async submitComment() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      await axios
        .post(`/api/task-comments`, {
          comment: this.comment,
          task_id: this.task.id
        })
        .then(response => {
          console.log(response.data);
          this.fetchTaskDetails(this.task.id);
        });
      this.resetForm();
    },

    resetForm() {
      this.comment = "";
      this.editingTask = null;
      this.editor.commands.clearContent();
    }
  },

  beforeUnmount() {}
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
