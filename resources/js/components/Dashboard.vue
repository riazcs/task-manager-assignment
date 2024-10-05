<template>
  <div class="d-flex" id="wrapper">
    <div class="bg-dark border-end" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <router-link
          to="/dashboard"
          class="list-group-item list-group-item-action list-group-item-light bg-dark text-white"
        >Dashboard</router-link>

        <router-link
          to="/create-task"
          class="list-group-item list-group-item-action list-group-item-light bg-dark text-white"
        >
          <i class="bi bi-table"></i> Tasks
        </router-link>
      </div>
    </div>

    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <form class="d-flex ms-3">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div class="navbar-collapse collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle"></i>
                {{ user.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container-fluid">
        <div class="my-3">
          <h2>Product Development</h2>
          <span>Create Date: 25 September 2024</span>&nbsp;&nbsp;
          <span>Create Date: 25 September 2024</span>
        </div>
        <div class="row">
          <div class="col">
            <span>Member on Board</span>
          </div>
          <div class="col text-end">
            <button class="btn btn-sm btn-danger">
              New Board
              <i class="bi bi-plus float-right"></i>
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="card bg-secondary">
              <div class="card-body">TO DO.</div>
            </div>
            <div class="card mt-3" v-for="task in todoTasks" :key="task.id">
              <router-link :to="'/task-details/' + task.id">
                <div class="card-body">
                  <h6 class="card-text">{{task.title}}</h6>
                  <p v-html="task.description"></p>
                  <hr />
                  <div class="row">
                    <div class="col">
                      <i class="bi bi-calendar3-week"></i>
                      {{task.due_date}}
                    </div>
                    <div class="col text-end">
                      <i class="bi bi-chat-left-text float-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col">
            <div class="card bg-info">
              <div class="card-body text-capitalize">Work In Progress</div>
            </div>
            <div class="card mt-3" v-for="task in inProgressTasks" :key="task.id">
              <router-link :to="'/task-details/' + task.id">
                <div class="card-body">
                  <h6 class="card-text">{{task.title}}</h6>
                  <p v-html="task.description"></p>
                  <hr />
                  <div class="row">
                    <div class="col">
                      <i class="bi bi-calendar3-week"></i>
                      {{task.due_date}}
                    </div>
                    <div class="col text-end">
                      <i class="bi bi-chat-left-text float-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col">
            <div class="card bg-primary">
              <div class="card-body text-capitalize">Under Review</div>
            </div>
            <div class="card mt-3" v-for="task in underReviewTasks" :key="task.id">
              <router-link :to="'/task-details/' + task.id">
                <div class="card-body">
                  <h6 class="card-text">{{task.title}}</h6>
                  <p v-html="task.description"></p>
                  <hr />
                  <div class="row">
                    <div class="col">
                      <i class="bi bi-calendar3-week"></i>
                      {{task.due_date}}
                    </div>
                    <div class="col text-end">
                      <i class="bi bi-chat-left-text float-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col">
            <div class="card bg-success">
              <div class="card-body">COMPLETE.</div>
            </div>
            <div class="card mt-3" v-for="task in completeTasks" :key="task.id">
              <router-link :to="'/task-details/' + task.id">
                <div class="card-body">
                  <h6 class="card-text">{{task.title}}</h6>
                  <p v-html="task.description"></p>
                  <hr />
                  <div class="row">
                    <div class="col">
                      <i class="bi bi-calendar3-week"></i>
                      {{task.due_date}}
                    </div>
                    <div class="col text-end">
                      <i class="bi bi-chat-left-text float-right"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TaskManager from "./TaskManager.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {},
      isAuthenticated: false,
      showRegister: true,
      userName: "",
      isNavbarCollapsed: true,
      dropdownOpen: false,
      tasks: [],
      todoTasks: [],
      inProgressTasks: [],
      underReviewTasks: [],
      completeTasks: []
    };
  },

  computed: {
    appName() {
      return "Task Manager";
    }
  },

  components: {
    TaskManager
  },

  async created() {
    this.checkAuthentication();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.fetchTasks();
    const toggleButton = document.getElementById("menu-toggle");
    const wrapper = document.getElementById("wrapper");

    toggleButton.addEventListener("click", function() {
      wrapper.classList.toggle("toggled");
    });
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
      this.todoTasks = this.tasks.filter(task => task.status === "To Do");
      this.inProgressTasks = this.tasks.filter(
        task => task.status === "In Progress"
      );
      this.underReviewTasks = this.tasks.filter(
        task => task.status === "Under Review"
      );
      this.completeTasks = this.tasks.filter(
        task => task.status === "Complete"
      );
    },

    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    checkAuthentication() {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAuthenticated = true;
      }
    },

    async logout() {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  transition: margin 0.25s ease-out;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

#page-content-wrapper {
  width: 100%;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
}
.card-text {
  font-weight: 700;
}

a {
  color: #343a40;
  text-decoration: none;
}
</style>