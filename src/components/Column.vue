<template>
  <div>
    <div class="my-4">
      <h2>{{ title }}</h2>
      <v-divider></v-divider>
    </div>
    <!-- <Card v-for="(card, c) in cards" :key="c" :card="card" /> -->
    <TodoList :previewMode="previewMode" />
  </div>
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
