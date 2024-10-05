<template>
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
          <router-link class="navbar-brand" to="/">
            Task Manager
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto"></ul>
  
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <main class="py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">Login</div>
  
                <div class="card-body">
                  <form @submit.prevent="loginUser">
                    <div class="row mb-3">
                      <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                      <div class="col-md-6">
                        <input
                          id="email"
                          type="email"
                          class="form-control"
                          v-model="email"
                          required
                          autocomplete="email"
                          autofocus
                        />
                      </div>
                    </div>
  
                    <div class="row mb-3">
                      <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                      <div class="col-md-6">
                        <input
                          id="password"
                          type="password"
                          class="form-control"
                          v-model="password"
                          required
                          autocomplete="current-password"
                        />
                      </div>
                    </div>
  
                    <div class="row mb-3">
                      <div class="col-md-6 offset-md-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="remember"
                            id="remember"
                          />
                          <label class="form-check-label" for="remember">Remember Me</label>
                        </div>
                      </div>
                    </div>
  
                    <div class="row mb-0">
                      <div class="col-md-8 offset-md-4">
                        <button type="submit" class="btn btn-primary">Login</button>
                        <router-link class="btn btn-link" to="/password/reset">Forgot Your Password?</router-link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from "vue-router"; 

  export default {
    setup() {
      const router = useRouter();
      const email = ref('');
      const password = ref('');
      const remember = ref(false);
  
      const loginUser = async () => {
        try {
          const response = await axios.post('/api/login', {
            email: email.value,
            password: password.value,
            remember: remember.value,
          });
  
          // Store token and user info in local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          router.push("/dashboard");
  
          // Redirect or handle post-login actions
        } catch (error) {
          console.error('Login error:', error);
        }
      };
  
      return {
        email,
        password,
        remember,
        loginUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if necessary */
  </style>
  