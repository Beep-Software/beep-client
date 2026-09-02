<template>
    <div class="notification-manager">
        <TransitionGroup name="toast" tag="div" class="toast-stack">
            <div
                v-for="notification in notifications"
                :key="notification.id"
                class="toast"
                :class="notification.type"
            >
                <span class="icon">
                    <svg v-if="notification.type === 'success'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
                    </svg>
                    <svg v-else-if="notification.type === 'error'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2 1 21h22zm0 4.7 7.5 13H4.5zM11 10h2v5h-2zm0 6h2v2h-2z"/>
                    </svg>
                </span>
                <span class="message">{{ notification.message }}</span>
                <button type="button" class="close" @click="dismiss(notification.id)">&times;</button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { dismiss, notifications } from '@/stores/notificationStore'
</script>

<style scoped>
.notification-manager {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 1000;
    pointer-events: none;
}

.toast-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 280px;
    max-width: 360px;
    padding: 0.85rem 1rem;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    color: #fff;
    font-size: 0.9rem;
    pointer-events: auto;
}

.toast.success {
    background: #1e8e3e;
}

.toast.error {
    background: #d93025;
}

.toast.warning {
    background: #b15c00;
}

.icon {
    display: flex;
    flex-shrink: 0;
}

.message {
    flex: 1;
    line-height: 1.4;
}

.close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0.8;
}

.close:hover {
    opacity: 1;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.25s ease;
}

@media (max-width: 640px) {
    .notification-manager {
        top: 0.75rem;
        right: 0.75rem;
        left: 0.75rem;
    }

    .toast {
        min-width: 0;
        max-width: none;
        width: 100%;
    }
}
</style>
