export interface WikiDocDto {
    id: string
    title: string
    content: string
    updatedAt: string
}

// NOTE: mock in-memory "database" standing in for the future SQL-backed API.
// Nothing here is persisted or committed as real documentation content.
const db: WikiDocDto[] = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        content: '# Getting Started\n\nWelcome to the BEEP SOFTWARE wiki. This page is a placeholder until documents are loaded from the server.',
        updatedAt: new Date().toISOString(),
    },
]

function delay<T>(value: T, ms = 150): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// TODO: replace with GET /api/wiki/docs
export function fetchDocs(): Promise<WikiDocDto[]> {
    return delay(db)
}

// TODO: replace with POST /api/wiki/docs
export function createDocRequest(title: string): Promise<WikiDocDto> {
    const doc: WikiDocDto = {
        id: crypto.randomUUID(),
        title,
        content: `# ${title}\n\n`,
        updatedAt: new Date().toISOString(),
    }
    db.push(doc)
    return delay(doc)
}

// TODO: replace with PUT /api/wiki/docs/:id
export function saveDocRequest(id: string, content: string): Promise<WikiDocDto | null> {
    const doc = db.find((d) => d.id === id)
    if (!doc) return delay(null)
    doc.content = content
    doc.updatedAt = new Date().toISOString()
    return delay(doc)
}
