import axios, { type AxiosInstance } from 'axios'

export class EmailService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL
        }) 
    }

    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.instance.post('/email/create', { to, subject, body });
    }
}

const emailService = new EmailService()
export default emailService