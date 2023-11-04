<template>
  <v-col cols="3">
    <v-card class="h-100 pa-4 d-flex flex-column" color="#47667b">
      <v-card-title class="my-4">{{ title }}</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <TodoList :previewMode="previewMode" />
    </v-card>
  </v-col>
</template>

<script>
import Card from '@/components/Card.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Column',
  props: {
    title: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      previewMode: 'kanban'
    }
  },
  components: {
    Card,
    TodoList
  }
}
</script>

<style scoped>
h2 {
  color: white;
}
</style>
