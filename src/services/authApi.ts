import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export interface TokenResponse {
    access_token: string
    refresh_token: string
    token_type: 'Bearer'
    expires_in: number
}

export interface CurrentUser {
    username: string | null
    claims: Array<{ type: string; value: string }>
}

export interface RegisterRequest {
    username: string
    password: string
    confirmPassword: string
}

export class Auth {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_AUTH_BASE_URL
        })
    }

    public async register(request: RegisterRequest): Promise<void> {
        await this.instance.post('/auth/register', request)
    }

    public async login(username: string, password: string): Promise<TokenResponse> {
        const response = await this.instance.post<TokenResponse>('/auth/token', { username, password })
        return response.data
    }

    public async loginWithEmail(email: string, password: string): Promise<TokenResponse> {
        const response = await this.instance.post<TokenResponse>('/auth/email-login', { email, password })
        return response.data
    }

    public async refresh(refreshToken: string): Promise<TokenResponse> {
        const response = await this.instance.post<TokenResponse>('/auth/refresh', { refreshToken })
        return response.data
    }

    public async logout(refreshToken: string, accessToken: string): Promise<void> {
        await this.instance.post('/auth/logout', { refreshToken }, this.authorized(accessToken))
    }

    public async getCurrentUser(accessToken: string): Promise<CurrentUser> {
        const response = await this.instance.get<CurrentUser>('/auth/me', this.authorized(accessToken))
        return response.data
    }

    public async changePassword(oldPassword: string, newPassword: string, confirmPassword: string, accessToken: string): Promise<void> {
        await this.instance.post('/auth/change-password', { oldPassword, newPassword, confirmPassword }, this.authorized(accessToken))
    }

    public async deleteAccount(accessToken: string): Promise<void> {
        await this.instance.delete('/auth/user', this.authorized(accessToken))
    }

    private authorized(accessToken: string): AxiosRequestConfig {
        return { headers: { Authorization: `Bearer ${accessToken}` } }
    }
}

const authApi = new Auth()
export default authApi