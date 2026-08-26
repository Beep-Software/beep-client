export interface WikiDocDto {
    id: string
    title: string
    content: string
    updatedAt: string
    relativePath: string
}

interface WikiSummaryDto {
    id: string
    title: string
    updatedAt: string
    relativePath: string
}

interface FileResponse {
    success: boolean
    content?: string
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api').replace(/\/$/, '')
const WIKI_PATH = `${API_BASE_URL}/documents/wiki`

function encodeContent(content: string): string {
    const bytes = new TextEncoder().encode(content)
    let binary = ''
    bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
    return btoa(binary)
}

function decodeContent(content: string): string {
    const binary = atob(content)
    return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)))
}

function withFrontmatter(title: string, content: string): string {
    return `---\ntitle: ${title.replace(/[\r\n]/g, ' ')}\n---\n\n${content}`
}

function withoutFrontmatter(content: string): string {
    return content.replace(/^---\r?\ntitle:\s*.*\r?\n---\r?\n\r?\n?/, '')
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = new Headers(options?.headers)
    if (options?.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

    const response = await fetch(url, {
        ...options,
        headers
    })
    if (!response.ok) throw new Error(`Wiki request failed with status ${response.status}`)
    return response.json() as Promise<T>
}

async function readDoc(summary: WikiSummaryDto): Promise<WikiDocDto> {
    const response = await request<FileResponse>(`${API_BASE_URL}/documents/${summary.relativePath}`)
    if (!response.content) throw new Error(`Document ${summary.id} did not include content`)
    return { ...summary, content: withoutFrontmatter(decodeContent(response.content)) }
}

export async function fetchDocs(onProgress?: (percent: number) => void): Promise<WikiDocDto[]> {
    const response = await request<{ documents: WikiSummaryDto[] }>(WIKI_PATH)
    const total = response.documents.length
    if (!total) {
        onProgress?.(100)
        return []
    }
    let loaded = 0
    const documents = await Promise.all(response.documents.map(async (summary) => {
        const document = await readDoc(summary)
        loaded += 1
        onProgress?.(Math.round((loaded / total) * 100))
        return document
    }))
    return documents
}

export async function createDocRequest(title: string): Promise<WikiDocDto> {
    const now = new Date()
    const id = crypto.randomUUID()
    const relativePath = `wiki/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${String(now.getUTCDate()).padStart(2, '0')}/${id}.md`
    const content = `# ${title}\n\n`
    await request(`${API_BASE_URL}/documents/${relativePath}`, {
        method: 'POST',
        body: JSON.stringify({ content: encodeContent(withFrontmatter(title, content)) })
    })
    return { id, title, content, relativePath, updatedAt: now.toISOString() }
}

export async function saveDocRequest(id: string, relativePath: string, title: string, content: string): Promise<WikiDocDto> {
    await request(`${API_BASE_URL}/documents/${relativePath}`, {
        method: 'PUT',
        body: JSON.stringify({ content: encodeContent(withFrontmatter(title, content)) })
    })
    return { id, title, content, relativePath, updatedAt: new Date().toISOString() }
}

export async function deleteDocRequest(relativePath: string): Promise<boolean> {
    await request(`${API_BASE_URL}/documents/${relativePath}`, { method: 'DELETE' })
    return true
}