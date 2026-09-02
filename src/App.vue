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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  min-height: 100%;
  font-family: 'Inter', Arial, sans-serif;
  background: linear-gradient(to right, #181818 0 45%, #eee 45% 100%);
  color: #fff;
  border: none;
  outline: none;
  position: relative;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

@media (max-width: 900px) {
  html, body {
    background: linear-gradient(to right, #181818 0 40%, #eee 40% 100%);
  }
}

@media (max-width: 640px) {
  html, body {
    background: #222;
  }
}
</style>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100dvh;
  min-height: 100vh;
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
  background: #222;
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

@media (max-width: 900px) {
  .left {
    width: 40%;
    padding: 1.5rem 0;
  }

  .right {
    width: 60%;
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  main {
    display: block;
    height: auto;
    min-height: 100dvh;
    overflow: visible;
  }

  .left,
  .right {
    width: 100%;
    height: auto;
    min-height: 0;
  }

  .left {
    min-height: 13rem;
    padding: 5.5rem 1.25rem 2rem;
    overflow: visible;
    box-shadow: none;
    background: linear-gradient(135deg, #181818 0%, #222 100%);
  }

  .right {
    display: block;
    padding: 1.5rem 1.25rem 2rem;
    overflow: visible;
  }

  .right > * {
    margin: 0 auto;
  }
}
</style>
