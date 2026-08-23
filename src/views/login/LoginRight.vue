<template>
    <div class="r-content">
        <form class="login-card" @submit.prevent="handleLogin">
            <h1>Log In</h1>
            <div class="field">
                <label for="email">Email Address</label>
                <input id="email" v-model="form.email" type="email" placeholder="jane@example.com" required />
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input id="password" v-model="form.password" type="password" placeholder="••••••••" required />
            </div>
            <div class="row">
                <label class="remember">
                    <input v-model="form.remember" type="checkbox" />
                    Remember me
                </label>
                <button type="button" class="link" @click="handleForgotPassword">Forgot password?</button>
            </div>
            <button type="submit" class="btn primary">Log In</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '@/stores/authStore'
import { notifySuccess, notifyWarning } from '@/stores/notificationStore'

const router = useRouter()
const route = useRoute()

const form = reactive({
    email: '',
    password: '',
    remember: false,
})

// TODO: validate credentials against the auth API once it's available; any input works for now
async function handleLogin() {
    await login()
    notifySuccess('Logged in successfully.')
    const redirect = route.query.redirect
    const isSafeRedirect = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
    router.push(isSafeRedirect ? redirect : '/admin')
}

function handleForgotPassword() {
    notifyWarning('Password reset isn\'t available yet.')
}
</script>

<style scoped>
.r-content {
    width: 100%;
    max-width: 400px;
}

.login-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.login-card h1 {
    font-size: 1.75rem;
    color: #111;
    text-align: center;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
    letter-spacing: 0.02em;
}

.field input {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.65rem 0.75rem;
    border: 1px solid #d6d6d6;
    border-radius: 8px;
    background: #fafafa;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 3px rgba(17,17,17,0.08);
    background: #fff;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
}

.remember {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #444;
}

.link {
    background: none;
    border: none;
    padding: 0;
    color: #111;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
}

.btn {
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
}

.btn.primary {
    background: #111;
    color: #fff;
}

.btn.primary:hover {
    background: #333;
}
</style>
