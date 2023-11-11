<template>
  <v-layout class="overflow-visible" style="height: 56px;" v-if="todos && todos.length > 0">
    <v-bottom-navigation
        v-model="index"
        color="primary"
        horizontal
    >
      <v-btn v-for="todo in sortedTodos" :key="todo.uuid">
        {{todo.content}}
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import _ from 'lodash'
export default {
  name: "Inbox",
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedTodos() {
      const nextTodo = _.minBy(this.todos, 'insertedAt');
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.index = _.indexOf(this.todos, nextTodo);
      return _.sortBy(this.todos, 'insertedAt');
    }

  },
  data: () => ({ index: 0 }),
}
</script>
