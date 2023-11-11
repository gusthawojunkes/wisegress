<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <template v-if="$route.meta.showSidebar">
    <SideBar />
    <Inbox v-if="!$route.meta.hideFixedTodos" :todos="todos"></Inbox>
  </template>
  <RouterView />
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Inbox from '@/components/Inbox.vue'
import TodoService from "@/services/todo.service";
export default {
  components: {
    SideBar, Inbox
  },
  async mounted() {
    await this.findTodos();
  },
  methods: {
    async findTodos() {
      this.todos = await TodoService.findAll();
    }
  },
  data: () => ({ todos: [] }),
}
</script >

<style scoped></style>
