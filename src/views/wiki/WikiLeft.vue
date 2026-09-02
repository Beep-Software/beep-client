<template>
    <div class="wiki-nav">
        <div class="wiki-nav-header">
            <h1>Wiki</h1>
            <button class="new-btn" type="button" :disabled="isLoadingDocs" @click="handleCreate">+ New</button>
        </div>
        <div v-if="isLoadingDocs" class="loading-panel" role="status" aria-live="polite">
            <div class="loading-label"><span>Loading documents</span><span>{{ loadProgress }}%</span></div>
            <div class="progress-track" aria-hidden="true"><div class="progress-bar" :style="{ width: `${loadProgress}%` }"></div></div>
            <div class="loading-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
        <p v-else-if="loadError" class="load-error">{{ loadError }}</p>
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
import { createDoc, isLoadingDocs, loadError, loadProgress, selectDoc, selectedDoc, wikiDocs } from '@/stores/wikiStore'
import { notifyError, notifySuccess } from '@/stores/notificationStore'

async function handleCreate() {
    const title = window.prompt('New document title')
    if (!title) return
    try {
        await createDoc(title)
        notifySuccess(`Created "${title}".`)
    } catch {
        notifyError('Failed to create the document.')
    }
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

.new-btn:hover:not(:disabled) {
    background: #ccc;
}

.new-btn:disabled {
    cursor: wait;
    opacity: 0.55;
}

.loading-panel {
    padding: 0.75rem 0.85rem 1rem;
    color: #d8d8d8;
}

.loading-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.progress-track {
    height: 5px;
    margin-top: 0.55rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 999px;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #f7cf63, #fff);
    transition: width 0.35s ease;
}

.loading-orbit {
    display: flex;
    gap: 0.3rem;
    margin-top: 0.7rem;
}

.loading-orbit span {
    width: 5px;
    height: 5px;
    background: #f7cf63;
    border-radius: 50%;
    animation: pulse 1s infinite ease-in-out;
}

.loading-orbit span:nth-child(2) { animation-delay: 0.15s; }
.loading-orbit span:nth-child(3) { animation-delay: 0.3s; }

.load-error {
    padding: 0 0.85rem;
    color: #f1a9a9;
    font-size: 0.85rem;
}

@keyframes pulse {
    0%, 100% { transform: scale(0.65); opacity: 0.45; }
    50% { transform: scale(1.25); opacity: 1; }
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

@media (max-width: 640px) {
    .wiki-nav {
        max-width: 34rem;
        padding: 0;
    }

    .doc-list {
        max-height: 18rem;
    }
}
</style>
