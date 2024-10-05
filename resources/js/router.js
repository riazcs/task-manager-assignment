import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import TaskManager from "./components/TaskManager.vue";
import TaskDetails from "./components/TaskDetails.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/dashboard", component: Dashboard , requiredAuth: true},
    { path: "/create-task", component: TaskManager, name: "task-manager" , requiredAuth: true},
    { path: "/task-details/:id", component: TaskDetails, name: "task-details", requiredAuth: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
