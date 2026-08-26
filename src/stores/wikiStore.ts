import { computed, reactive, ref } from 'vue'
import { createDocRequest, deleteDocRequest, fetchDocs, saveDocRequest, type WikiDocDto } from '@/services/wikiApi'

export type WikiDoc = WikiDocDto

export const wikiDocs = reactive<WikiDoc[]>([])
export const isLoadingDocs = ref(true)
export const loadProgress = ref(0)
export const loadError = ref<string | null>(null)
const selectedDocId = ref<string | null>(null)

export const selectedDoc = computed(() => wikiDocs.find((doc) => doc.id === selectedDocId.value) ?? null)

export async function loadDocs(): Promise<void> {
    isLoadingDocs.value = true
    loadProgress.value = 0
    loadError.value = null
    try {
        const docs = await fetchDocs((progress) => { loadProgress.value = progress })
        wikiDocs.splice(0, wikiDocs.length, ...docs)
        if (!selectedDocId.value && docs.length) selectedDocId.value = docs[0].id
        loadProgress.value = 100
    } catch {
        loadError.value = 'Unable to load documents.'
    } finally {
        isLoadingDocs.value = false
    }
}

export function selectDoc(id: string): void {
    selectedDocId.value = id
}

export async function createDoc(title: string): Promise<WikiDoc> {
    const doc = await createDocRequest(title)
    wikiDocs.push(doc)
    selectedDocId.value = doc.id
    return doc
}

export async function saveDoc(id: string, content: string): Promise<WikiDoc | null> {
    const current = wikiDocs.find((doc) => doc.id === id)
    if (!current) return null
    const doc = await saveDocRequest(id, current.relativePath, current.title, content)
    if (doc) {
        const local = wikiDocs.find((d) => d.id === id)
        if (local) {
            local.content = doc.content
            local.updatedAt = doc.updatedAt
        }
    }
    return doc
}

export async function deleteDoc(id: string): Promise<boolean> {
    const current = wikiDocs.find((doc) => doc.id === id)
    if (!current) return false
    await deleteDocRequest(current.relativePath)
    const index = wikiDocs.findIndex((doc) => doc.id === id)
    if (index !== -1) wikiDocs.splice(index, 1)
    selectedDocId.value = wikiDocs[0]?.id ?? null
    return true
}

// populate the store on first import; safe to call again from a component if a refresh is needed
loadDocs()
