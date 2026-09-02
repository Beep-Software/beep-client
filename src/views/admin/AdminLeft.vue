<template>
    <section class="admin-nav" aria-labelledby="admin-navigation-title">
        <p class="eyebrow">Account</p>
        <h1 id="admin-navigation-title">Admin</h1>
        <div class="identity">
            <span class="avatar" aria-hidden="true">{{ initial }}</span>
            <div>
                <p class="username">{{ username ?? 'Authenticated user' }}</p>
                <p class="role-label">{{ roleLabel }}</p>
            </div>
        </div>
        <nav aria-label="Admin sections">
            <button type="button" :class="{ active: activeAdminSection === 'security' }" @click="selectAdminSection('security')">Security</button>
            <button type="button" :class="{ active: activeAdminSection === 'account-removal' }" @click="selectAdminSection('account-removal')">Account removal</button>
        </nav>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { activeAdminSection, roles, selectAdminSection, username } from '@/stores/authStore'

const initial = computed(() => (username.value?.trim().charAt(0) || 'A').toUpperCase())
const roleLabel = computed(() => roles.value.length ? roles.value.join(' / ') : 'No roles assigned')
</script>

<style scoped>
.admin-nav {
    width: 100%;
    max-width: 320px;
    padding: 0 2rem;
    color: #fff;
}

.eyebrow {
    margin: 0 0 0.35rem;
    color: #f7cf63;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

h1 {
    margin: 0;
    font-size: 2rem;
}

.identity {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin: 2rem 0;
}

.avatar {
    display: grid;
    width: 2.8rem;
    height: 2.8rem;
    place-items: center;
    background: #f7cf63;
    color: #111;
    font-weight: 700;
}

.username,
.role-label {
    margin: 0;
}

.username {
    font-weight: 700;
    overflow-wrap: anywhere;
}

.role-label {
    margin-top: 0.2rem;
    color: #bdbdbd;
    font-size: 0.8rem;
}

nav {
    display: grid;
    border-top: 1px solid #3a3a3a;
}

nav button {
    padding: 0.85rem 0;
    border-bottom: 1px solid #3a3a3a;
    border-right: 0;
    border-left: 0;
    border-top: 0;
    background: transparent;
    color: #fff;
    font-size: 0.9rem;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
}

nav button:hover,
nav button.active {
    color: #f7cf63;
}

@media (max-width: 640px) {
    .admin-nav {
        max-width: 34rem;
        padding: 0;
    }

    .identity {
        margin: 1.5rem 0;
    }
}
</style>
