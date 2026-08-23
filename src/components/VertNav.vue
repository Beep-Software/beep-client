<template>
    <nav class="vert-nav">
        <ul>
            <li>
                <a href="home">
                    <!-- Home / Features icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                </a>
            </li>
            <li>
                <a href="contact">
                    <!-- Contact / Email icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                </a>
            </li>
            <li>
                <a href="admin">
                    <!-- Admin / Briefcase icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2H14V6H10V2ZM4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H4ZM6 10H18V20H6V10Z"/>
                    </svg>
                </a>
            </li>
            <li>
                <a href="wiki">
                    <!-- Wiki / File icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM14 9V3.5L19.5 9H14Z"/>
                    </svg>
                </a>
            </li>
            <li v-if="isAuthenticated" class="logout">
                <a href="#" @click.prevent="handleLogout">
                    <!-- Logout icon -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17v-2H3v-2h7V9l5 4-5 4zm9-13H12v2h7v12h-7v2h7c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '@/stores/authStore'
import { notifySuccess } from '@/stores/notificationStore'

const router = useRouter()

function handleLogout() {
    logout()
    notifySuccess('You have been logged out.')
    router.push('/home')
}
</script>

<style scoped>
.vert-nav {
    position: absolute;
    left: 45%;
    background-color: #111;
    color: #fff;
    padding: 1rem;
    margin-left: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.4);
    border-radius: 12px;
    z-index: 2;
    transition: box-shadow 0.3s ease;
}

.vert-nav:hover {
    box-shadow: 0 4px 18px rgba(0,0,0,0.55);
}

.vert-nav ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.vert-nav li a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.vert-nav li a:hover {
    background-color: #fff;
    color: #111;
}

.vert-nav li.logout a {
    color: #e53935;
}

.vert-nav li.logout a:hover {
    background-color: #e53935;
    color: #fff;
}
</style>
