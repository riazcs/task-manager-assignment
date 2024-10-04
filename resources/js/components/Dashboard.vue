<template>
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {{ user.name }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    async created() {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.user = response.data;
    },
    methods: {
      logout() {
        const token = localStorage.getItem('token');
        axios.post('/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          localStorage.removeItem('token');
          this.$router.push('/login');
        });
      },
    },
  };
  </script>
  