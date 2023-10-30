<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <template v-if="$route.meta.showSidebar">
    <SideBar />
  </template>
  <RouterView />
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  components: {
    SideBar
  }
} 
</script >

<style scoped></style>
