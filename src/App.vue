<template>
  <main>
    <VertNav />
    <div class="left">
      <RouterView name="left" />
    </div>
    <div class="right">
      <RouterView name="right" />
    </div>
    <NotificationManager />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import VertNav from './components/VertNav.vue'
import NotificationManager from './components/NotificationManager.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Inter', Arial, sans-serif;
  background: linear-gradient(135deg, #181818 100%, #222 100%);
  color: #fff;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}
</style>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 100%;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0,0,0,0.3);
  z-index: 1;
  font-size: 2rem;
  font-weight: bold;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  height: 100%;
  overflow-y: auto;
  background-color: #eee;
  color: #333;
  padding: 2rem;
}

.right > * {
  margin: auto;
}
</style>
