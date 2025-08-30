<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
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
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}
</style>
