import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import TaskDetails from "./components/TaskDetails.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/dashboard", component: Dashboard },
    { path: "/task-details/:id", component: TaskDetails, name: "task-details" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
