import { computed, ref } from 'vue'
import { mockLoginRequest } from '@/services/authApi'

const TOKEN_KEY = 'authToken'

const token = ref(localStorage.getItem(TOKEN_KEY))

export const isAuthenticated = computed(() => Boolean(token.value))

export async function login(): Promise<void> {
    token.value = await mockLoginRequest()
    localStorage.setItem(TOKEN_KEY, token.value)
}

export function logout(): void {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
}
