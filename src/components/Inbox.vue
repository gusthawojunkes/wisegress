<template>
  <v-layout class="overflow-visible" style="height: 56px;" v-if="todos && todos.length > 0">
    <v-bottom-navigation
        v-model="index"
        color="primary"
        horizontal
    >
      <v-btn v-for="todo in todos" :key="todo.uuid">
        {{todo.content}}
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  name: "Inbox",
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  data: () => ({ index: 0 }),
}
</script>