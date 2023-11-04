<template>
  <v-container class="w-50 pt-12">
    <TodoList />
  </v-container>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
export default {
  name: 'TodoListView',
  data() {
    return {}
  },
  methods: {},
  components: {
    TodoList
  }
}
</script>

<style></style>
