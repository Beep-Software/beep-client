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
            <button type="submit" class="btn primary" :class="{ 'loading': isLoading }" :disabled="isLoading">{{ isLoading ? '' : 'Send Message' }}</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { notifyError, notifySuccess } from '@/stores/notificationStore'
import emailService from '@/services/emailApi'

const form = reactive({
    name: '',
    email: '',
    message: '',
})

const emailBody = computed(() => `Message from ${form.name} (${form.email}):\n\n${form.message}`)

const isLoading = ref(false)

async function handleSubmit() {
    isLoading.value = true
    try {
        await emailService.sendEmail('bowen61496@gmail.com', `Beep Software: ${form.name}`, emailBody.value)
        notifySuccess('Email sent successfully.')
        resetForm()
    } catch (error) {
        console.error('Failed to send email:', error)
        notifyError('Failed to send email. Please try again later.')
    } finally {
        isLoading.value = false
    }
}

function resetForm() {
    form.name = ''
    form.email = ''
    form.message = ''
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

.btn.primary.loading {
    background: #555;
}

/* loading animation */
.btn.primary.loading::after {
    content: '';
    display: inline-block;
    margin-left: 0.5rem;
    width: 1rem;
    height: 1rem;
    border: 2px solid #fff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 640px) {
    .r-content {
        max-width: none;
    }

    .contact-card {
        gap: 1.25rem;
        padding: 1.5rem;
        border-radius: 8px;
    }

    .btn {
        min-height: 2.75rem;
    }
}
</style>

