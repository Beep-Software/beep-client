import { reactive } from 'vue'

export type NotificationType = 'success' | 'error' | 'warning'

export interface Notification {
    id: string
    type: NotificationType
    message: string
}

const DEFAULT_DURATION_MS = 5000

export const notifications = reactive<Notification[]>([])

export function dismiss(id: string): void {
    const index = notifications.findIndex((n) => n.id === id)
    if (index !== -1) notifications.splice(index, 1)
}

export function notify(type: NotificationType, message: string, duration = DEFAULT_DURATION_MS): string {
    const id = crypto.randomUUID()
    notifications.push({ id, type, message })
    if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
    }
    return id
}

export const notifySuccess = (message: string, duration?: number) => notify('success', message, duration)
export const notifyError = (message: string, duration?: number) => notify('error', message, duration)
export const notifyWarning = (message: string, duration?: number) => notify('warning', message, duration)
