<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          {{ appName }}
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
          <!-- Left Side Of Navbar -->
          <ul class="navbar-nav me-auto"></ul>
  
          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav ms-auto">
            <!-- Authentication Links -->
            <template v-if="!isAuthenticated">
              <li class="nav-item" v-if="showLogin">
                <router-link class="nav-link" to="/login">{{ loginText }}</router-link>
              </li>
              <li class="nav-item" v-if="showRegister">
                <router-link class="nav-link" to="/register">{{ registerText }}</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ userName }}
                </a>
  
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" @click.prevent="logout">{{ logoutText }}</a>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  
    <!-- <main class="py-4">
      <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
      >
        <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
          <router-link
            to="/"
            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          >
            Home
          </router-link>
  
          <router-link
            to="/login"
            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          >
            Log in
          </router-link>
  
          <router-link
            to="/register"
            class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          >
            Register
          </router-link>
        </div>
      </div>
    </main> -->
  </template>
  
  <script>
  export default {
    data() {
      return {
        appName: 'Task Manager',
        loginText: 'Login',
        registerText: 'Register',
        logoutText: 'Logout',
      };
    },
    computed: {
      isAuthenticated() {
        return !!localStorage.getItem('userToken'); // Assuming you're storing user token in local storage
      },
      userName() {
        const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in local storage
        return user ? user.name : '';
      },
      showLogin() {
        return !this.isAuthenticated;
      },
      showRegister() {
        return !this.isAuthenticated;
      },
    },
    methods: {
      logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user'); // Clear user data
        // Redirect or handle post-logout actions
        this.$router.push('/login'); // Redirect to login
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  