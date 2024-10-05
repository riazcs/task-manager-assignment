
import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
import { createApp } from 'vue';
import router from './router';
const app = createApp({});
app.use(router);
app.mount('#app');
