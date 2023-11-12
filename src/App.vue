<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <template v-if="$route.meta.showSidebar">
    <SystemBar></SystemBar>
    <SideBar/>
    <Inbox v-if="$route.meta.hideFixedTodos === undefined" :todos="todos"></Inbox>
  </template>
  <RouterView/>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Inbox from '@/components/Inbox.vue'
import TodoService from "@/services/todo.service";
import SystemBar from "@/components/SystemBar.vue";

export default {
  components: {
    SideBar, Inbox, SystemBar
  },
  async mounted() {
    await this.findTodos();
  },
  methods: {
    async findTodos() {
      this.todos = await TodoService.findAll();
    }
  },
  data: () => ({
    todos: [],
    button: {
      open: true,
    }
  }),
}
</script>

<style scoped></style>
