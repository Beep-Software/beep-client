<template>
    <div class="r-content">
        <form class="contact-card" @submit.prevent="handleSubmit">
            <div class="field">
                <label for="name">Full Name</label>
                <input id="name" v-model="form.name" type="text" placeholder="Jane Doe" required />
            </div>
            <div class="field">
                <label for="email">Email Address</label>
                <input id="email" v-model="form.email" type="email" placeholder="jane@example.com" required />
            </div>
            <div class="field">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" rows="5" placeholder="How can we help?" required></textarea>
            </div>
            <button type="submit" class="btn primary">Send Message</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { notifyWarning } from '@/stores/notificationStore'

const form = reactive({
    name: '',
    email: '',
    message: '',
})

// TODO: wire up to the email API once it's available
function handleSubmit() {
    notifyWarning("This form isn't connected to our email system yet — your message wasn't sent.")
}
</script>

<style scoped>
.r-content {
    width: 100%;
    max-width: 440px;
}

.contact-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
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

.field input,
.field textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.65rem 0.75rem;
    border: 1px solid #d6d6d6;
    border-radius: 8px;
    background: #fafafa;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus,
.field textarea:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 3px rgba(17,17,17,0.08);
    background: #fff;
}

.field textarea {
    resize: none;
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

