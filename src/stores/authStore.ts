import { computed, ref } from 'vue'
import Auth, { type TokenResponse } from '@/services/authApi'

const ACCESS_TOKEN_KEY = 'authAccessToken'
const REFRESH_TOKEN_KEY = 'authRefreshToken'

const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_KEY))
const refreshToken = ref(localStorage.getItem(REFRESH_TOKEN_KEY))
export const username = ref<string | null>(null)
export const roles = ref<string[]>([])
export type AdminSection = 'security' | 'account-removal'
export const activeAdminSection = ref<AdminSection>('security')

export const isAuthenticated = computed(() => Boolean(accessToken.value))

export function selectAdminSection(section: AdminSection): void {
    activeAdminSection.value = section
}

export function hasAnyRole(requiredRoles: string[]): boolean {
    return requiredRoles.some((requiredRole) =>
        roles.value.some((role) => role.toLowerCase() === requiredRole.toLowerCase())
    )
}

export async function login(email: string, password: string): Promise<void> {
    saveTokens(await Auth.loginWithEmail(email, password))
    await loadCurrentUser()
}

export async function ensureSession(): Promise<boolean> {
    if (!accessToken.value) return false

    try {
        await loadCurrentUser()
        return true
    } catch {
        if (!refreshToken.value) {
            clearSession()
            return false
        }

        try {
            saveTokens(await Auth.refresh(refreshToken.value))
            await loadCurrentUser()
            return true
        } catch {
            clearSession()
            return false
        }
    }
}

export async function logout(): Promise<void> {
    try {
        if (accessToken.value && refreshToken.value) {
            await Auth.logout(refreshToken.value, accessToken.value)
        }
    } finally {
        clearSession()
    }
}

export async function changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (!accessToken.value) throw new Error('No access token available')
    await Auth.changePassword(oldPassword, newPassword, confirmPassword, accessToken.value)
}

export async function deleteAccount(): Promise<void> {
    if (!accessToken.value) throw new Error('No access token available')
    await Auth.deleteAccount(accessToken.value)
    clearSession()
}

function saveTokens(tokens: TokenResponse): void {
    accessToken.value = tokens.access_token
    refreshToken.value = tokens.refresh_token
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token)
}

async function loadCurrentUser(): Promise<void> {
    if (!accessToken.value) throw new Error('No access token available')
    const currentUser = await Auth.getCurrentUser(accessToken.value)
    username.value = currentUser.username
    roles.value = currentUser.claims
        .filter((claim) => claim.type === 'role' || claim.type.endsWith('/role'))
        .map((claim) => claim.value)
}

function clearSession(): void {
    accessToken.value = null
    refreshToken.value = null
    username.value = null
    roles.value = []
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}
