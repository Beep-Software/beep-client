import { computed, reactive, ref } from 'vue'
import { createDocRequest, fetchDocs, saveDocRequest, type WikiDocDto } from '@/services/wikiApi'

export type WikiDoc = WikiDocDto

export const wikiDocs = reactive<WikiDoc[]>([])
const selectedDocId = ref<string | null>(null)

export const selectedDoc = computed(() => wikiDocs.find((doc) => doc.id === selectedDocId.value) ?? null)

export async function loadDocs(): Promise<void> {
    const docs = await fetchDocs()
    wikiDocs.splice(0, wikiDocs.length, ...docs)
    if (!selectedDocId.value && docs.length) selectedDocId.value = docs[0].id
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
    const doc = await saveDocRequest(id, content)
    if (doc) {
        const local = wikiDocs.find((d) => d.id === id)
        if (local) {
            local.content = doc.content
            local.updatedAt = doc.updatedAt
        }
    }
    return doc
}

// populate the store on first import; safe to call again from a component if a refresh is needed
loadDocs()
