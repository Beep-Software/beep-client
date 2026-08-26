<template>
    <div class="r-content" v-if="selectedDoc">
        <div class="doc-header">
            <div>
                <h1>{{ selectedDoc.title }}</h1>
                <span class="updated">Last updated {{ formattedDate }}</span>
            </div>
            <div class="actions">
                <button v-if="!editing" type="button" class="btn secondary" @click="startEditing">Edit</button>
                <button v-if="!editing" type="button" class="btn danger" @click="handleDelete">Delete</button>
                <template v-else>
                    <button type="button" class="btn secondary" @click="cancelEditing">Cancel</button>
                    <button type="button" class="btn primary" @click="handleSave">Save</button>
                </template>
            </div>
        </div>

        <textarea v-if="editing" v-model="draft" class="editor" spellcheck="false"></textarea>
        <!-- eslint-disable-next-line vue/no-v-html: content is sanitized with DOMPurify before rendering -->
        <div v-else class="markdown-body" v-html="renderedHtml"></div>
    </div>
    <div class="r-content" v-else>
        <p>Select or create a document to get started.</p>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { deleteDoc, saveDoc, selectedDoc } from '@/stores/wikiStore'
import { notifyError, notifySuccess } from '@/stores/notificationStore'

const editing = ref(false)
const draft = ref('')

const renderedHtml = computed(() => {
    if (!selectedDoc.value) return ''
    return DOMPurify.sanitize(marked.parse(selectedDoc.value.content, { async: false }) as string)
})

const formattedDate = computed(() => {
    if (!selectedDoc.value) return ''
    return new Date(selectedDoc.value.updatedAt).toLocaleString()
})

watch(selectedDoc, () => {
    editing.value = false
})

function startEditing() {
    draft.value = selectedDoc.value?.content ?? ''
    editing.value = true
}

function cancelEditing() {
    editing.value = false
}

async function handleSave() {
    if (!selectedDoc.value) return
    let saved
    try {
        saved = await saveDoc(selectedDoc.value.id, draft.value)
    } catch {
        notifyError('Failed to save the document.')
        return
    }
    if (!saved) {
        notifyError('Failed to save the document.')
        return
    }
    notifySuccess('Document saved.')
    editing.value = false
}

async function handleDelete() {
    if (!selectedDoc.value || !window.confirm(`Delete "${selectedDoc.value.title}"?`)) return
    try {
        await deleteDoc(selectedDoc.value.id)
        notifySuccess('Document deleted.')
    } catch {
        notifyError('Failed to delete the document.')
    }
}
</script>

<style scoped>
.r-content {
    width: 100%;
    max-width: 700px;
}

.doc-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.doc-header h1 {
    font-size: 2rem;
    color: #111;
}

.updated {
    display: block;
    font-size: 0.85rem;
    color: #777;
    margin-top: 0.25rem;
}

.actions {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;
}

.btn {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;
}

.btn.primary {
    background: #111;
    color: #fff;
}

.btn.primary:hover {
    background: #333;
}

.btn.secondary {
    background: #ddd;
    color: #111;
}

.btn.secondary:hover {
    background: #ccc;
}

.btn.danger {
    background: #f1d5d5;
    color: #8b1e1e;
}

.btn.danger:hover {
    background: #e8bcbc;
}

.editor {
    width: 100%;
    min-height: 400px;
    resize: vertical;
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fafafa;
}

.markdown-body {
    line-height: 1.6;
    color: #222;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
    margin: 1.25rem 0 0.75rem;
    color: #111;
}

.markdown-body :deep(p) {
    margin-bottom: 1rem;
}

.markdown-body :deep(pre) {
    background: #1e1e1e;
    color: #eee;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1rem;
}

.markdown-body :deep(code) {
    font-family: 'SFMono-Regular', Consolas, monospace;
}
</style>
