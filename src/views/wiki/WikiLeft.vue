<template>
    <div class="wiki-nav">
        <div class="wiki-nav-header">
            <h1>Wiki</h1>
            <button class="new-btn" type="button" @click="handleCreate">+ New</button>
        </div>
        <ul class="doc-list">
            <li
                v-for="doc in wikiDocs"
                :key="doc.id"
                :class="{ active: doc.id === selectedDoc?.id }"
                @click="selectDoc(doc.id)"
            >
                {{ doc.title }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { createDoc, selectDoc, selectedDoc, wikiDocs } from '@/stores/wikiStore'
import { notifySuccess } from '@/stores/notificationStore'

async function handleCreate() {
    const title = window.prompt('New document title')
    if (!title) return
    await createDoc(title)
    notifySuccess(`Created "${title}".`)
}
</script>

<style scoped>
.wiki-nav {
    width: 100%;
    max-width: 320px;
    padding: 0 2rem;
}

.wiki-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.wiki-nav-header h1 {
    font-size: 1.75rem;
}

.new-btn {
    background: #fff;
    color: #111;
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.new-btn:hover {
    background: #ccc;
}

.doc-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 60vh;
    overflow-y: auto;
}

.doc-list li {
    padding: 0.6rem 0.85rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #ccc;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.doc-list li:hover {
    background-color: rgba(255,255,255,0.08);
    color: #fff;
}

.doc-list li.active {
    background-color: #fff;
    color: #111;
}
</style>
