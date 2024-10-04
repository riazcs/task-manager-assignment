import { createRouter, createWebHistory } from 'vue-router';

// Define your components here
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
