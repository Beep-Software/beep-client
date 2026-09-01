import { computed, ref } from 'vue'
import Auth from '@/services/authApi'

const TOKEN_KEY = 'authToken'

const token = ref(localStorage.getItem(TOKEN_KEY))

export const isAuthenticated = computed(() => Boolean(token.value))

export async function login(email: string, password: string): Promise<void> {
    token.value = await Auth.readAuthToken(email, password)
    localStorage.setItem(TOKEN_KEY, token.value)
}

export function logout(): void {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
}
