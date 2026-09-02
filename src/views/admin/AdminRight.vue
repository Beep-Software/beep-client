<template>
    <div class="r-content">
        <header>
            <p class="eyebrow">Administration</p>
            <h1>Account settings</h1>
            <p class="intro">Manage your credentials and account access.</p>
        </header>

        <section v-if="activeAdminSection === 'security'" class="section" aria-labelledby="security-title">
            <div class="section-heading">
                <h2 id="security-title">Password</h2>
                <p>Use a new password with at least six characters.</p>
            </div>
            <form @submit.prevent="handlePasswordChange">
                <label>
                    Current password
                    <input v-model="passwordForm.oldPassword" type="password" autocomplete="current-password" :disabled="isChangingPassword" required />
                </label>
                <label>
                    New password
                    <input v-model="passwordForm.newPassword" type="password" minlength="6" autocomplete="new-password" :disabled="isChangingPassword" required />
                </label>
                <label>
                    Confirm new password
                    <input v-model="passwordForm.confirmPassword" type="password" minlength="6" autocomplete="new-password" :disabled="isChangingPassword" required />
                </label>
                <button class="btn primary" type="submit" :disabled="isChangingPassword">
                    {{ isChangingPassword ? 'Updating...' : 'Update password' }}
                </button>
            </form>
        </section>

        <section v-else class="section danger" aria-labelledby="danger-title">
            <div class="section-heading">
                <h2 id="danger-title">Delete account</h2>
                <p>This permanently removes your account and signs you out.</p>
            </div>
            <button class="btn danger-button" type="button" :disabled="isDeletingAccount" @click="handleDeleteAccount">
                {{ isDeletingAccount ? 'Deleting...' : 'Delete account' }}
            </button>
        </section>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { activeAdminSection, changePassword, deleteAccount } from '@/stores/authStore'
import { notifyError, notifySuccess, notifyWarning } from '@/stores/notificationStore'

const router = useRouter()
const isChangingPassword = ref(false)
const isDeletingAccount = ref(false)
const passwordForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

function errorMessage(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error && 'response' in error) {
        const response = error.response as { data?: { error?: string } }
        return response.data?.error ?? fallback
    }
    return fallback
}

async function handlePasswordChange(): Promise<void> {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        notifyWarning('New passwords do not match.')
        return
    }

    isChangingPassword.value = true
    try {
        await changePassword(passwordForm.oldPassword, passwordForm.newPassword, passwordForm.confirmPassword)
        passwordForm.oldPassword = ''
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
        notifySuccess('Password updated successfully.')
    } catch (error) {
        notifyError(errorMessage(error, 'Unable to update your password.'))
    } finally {
        isChangingPassword.value = false
    }
}

async function handleDeleteAccount(): Promise<void> {
    if (!window.confirm('Delete your account permanently? This cannot be undone.')) return

    isDeletingAccount.value = true
    try {
        await deleteAccount()
        notifySuccess('Your account has been deleted.')
        await router.push('/home')
    } catch (error) {
        notifyError(errorMessage(error, 'Unable to delete your account.'))
    } finally {
        isDeletingAccount.value = false
    }
}
</script>

<style scoped>
.r-content {
    width: 100%;
    max-width: 560px;
    padding: 2rem;
    color: #111;
}

.eyebrow {
    margin: 0 0 0.45rem;
    color: #8a5a00;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

h1,
h2,
p {
    margin-top: 0;
}

h1 {
    margin-bottom: 0.5rem;
    font-size: 2.25rem;
}

.intro,
.section-heading p {
    color: #5f5f5f;
    line-height: 1.5;
}

.section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #dedede;
}

.section-heading h2 {
    margin-bottom: 0.35rem;
    font-size: 1.2rem;
}

.section-heading p {
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
}

form {
    display: grid;
    gap: 1rem;
}

label {
    display: grid;
    gap: 0.45rem;
    font-size: 0.9rem;
    font-weight: 600;
}

input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.7rem 0.8rem;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    color: #111;
    font: inherit;
}

input:focus {
    outline: 2px solid #f7cf63;
    outline-offset: 1px;
}

.btn {
    width: fit-content;
    min-height: 2.65rem;
    padding: 0.65rem 1rem;
    border: 1px solid transparent;
    border-radius: 4px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}

.primary {
    background: #111;
    color: #fff;
}

.primary:hover:not(:disabled) {
    background: #333;
}

.danger {
    border-top-color: #e5b7b4;
}

.danger-button {
    border-color: #b42318;
    background: #fff;
    color: #b42318;
}

.danger-button:hover:not(:disabled) {
    background: #b42318;
    color: #fff;
}

.btn:disabled,
input:disabled {
    cursor: wait;
    opacity: 0.6;
}

@media (max-width: 640px) {
    .r-content {
        max-width: none;
        padding: 0;
    }

    h1 {
        font-size: 2rem;
    }

    .btn {
        width: 100%;
    }
}
</style>
