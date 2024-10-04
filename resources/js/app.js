
import './bootstrap';
import { createApp } from 'vue';
import router from './router';
const app = createApp({});

import TaskManager from './components/TaskManager.vue';
app.component('task-manager', TaskManager);
app.use(router);
app.mount('#app');
