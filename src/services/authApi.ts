// TODO: replace with a real POST /api/auth/login call once the backend exists
export function mockLoginRequest(): Promise<string> {
    return Promise.resolve(crypto.randomUUID())
}
