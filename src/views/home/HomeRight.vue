<template>
    <div class="r-content">
        <h1>Welcome to <span class="brand">BEEP SOFTWARE</span></h1>
        <p>
            We engineer modern, efficient, and scalable solutions for businesses
            that want to stay ahead of the curve.
        </p>
        <div class="buttons">
            <button class="btn primary" @click="handleComingSoon">Get Started</button>
            <button class="btn secondary" @click="handleComingSoon">Learn More</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { notifyWarning } from '@/stores/notificationStore'

function handleComingSoon() {
    notifyWarning('This section is coming soon.')
}
</script>

<style scoped>
.r-content {
    max-width: 500px;
    text-align: center;
}

.r-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #111;
}

.r-content h1 .brand {
    white-space: nowrap;
}

.r-content p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
}

.buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
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

.btn.secondary {
    background: #ddd;
    color: #111;
}

.btn.secondary:hover {
    background: #ccc;
}
</style>
