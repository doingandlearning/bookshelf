<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>


  <RouterView />
</template>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

nav a:hover {
  background-color: #555;
}
</style>
