<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                    {{ appName }}
                </router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    @click="toggleNavbar"
                    :aria-expanded="isNavbarCollapsed"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    :class="[
                        'collapse navbar-collapse',
                        { show: !isNavbarCollapsed },
                    ]"
                    id="navbarSupportedContent"
                >
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        <!-- Additional left-side links can go here -->
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        <li v-if="!isAuthenticated" class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'login' }"
                                >{{ __("Login") }}</router-link
                            >
                        </li>
                        <li v-if="!isAuthenticated && showRegister">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'register' }"
                                >{{ __("Register") }}</router-link
                            >
                        </li>
                        <li v-if="isAuthenticated" class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                @click.prevent="toggleDropdown"
                                aria-haspopup="true"
                                aria-expanded="dropdownOpen"
                            >
                                {{ userName }} <span class="caret"></span>
                            </a>

                            <div
                                v-if="dropdownOpen"
                                class="dropdown-menu dropdown-menu-right"
                            >
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="logout"
                                    >{{ __("Logout") }}</a
                                >
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <TaskManager />
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
            isAuthenticated: false, // Replace with your authentication logic
            showRegister: true, // Show or hide register link
            userName: "", // User name to display
            isNavbarCollapsed: true,
            dropdownOpen: false,
        };
    },

    computed: {
        appName() {
            return "Task Manager"; // Use environment variable or default
        },
    },

    components: {
        TaskManager,
    },

    async created() {
        this.checkAuthentication(); // Check authentication status when the component is mounted

        const token = localStorage.getItem("token");
        const response = await axios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        this.user = response.data;
    },
    methods: {

        toggleNavbar() {
            this.isNavbarCollapsed = !this.isNavbarCollapsed;
        },

        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },

        async logout() {
            try {
                // Call your logout API here
                await axios.post("/api/logout");
                localStorage.removeItem("token"); // Remove the token from local storage
                this.isAuthenticated = false; // Update authentication state
                this.userName = ""; // Clear the username
                this.$router.push({ name: "login" }); // Redirect to login
            } catch (error) {
                console.error("Logout error:", error);
            }
        },

        checkAuthentication() {
            const token = localStorage.getItem("token");
            if (token) {
                this.isAuthenticated = true; // Implement token verification if necessary
                // Fetch user info and set userName if needed
            }
        },

        logout() {
            const token = localStorage.getItem("token");
            axios
                .post(
                    "/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => {
                    localStorage.removeItem("token");
                    this.$router.push("/login");
                });
        },
    },
};
</script>
