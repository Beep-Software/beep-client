import axios, { type AxiosInstance } from 'axios'

export class Auth {

    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_AUTH_BASE_URL
        })
    }

    public async readAuthToken(email: string, password: string): Promise<string> {
        const response = await this.instance.post('/auth/email-login', {
            email,
            password
        })
        return response.data.access_token
    }
}

const authApi = new Auth()
export default authApi