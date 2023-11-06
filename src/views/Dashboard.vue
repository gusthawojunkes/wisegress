<template>
  <v-container class="align-center w-50">
    <v-row no-gutters>
      <v-col cols="10">
      <span>
        Hoje
        <small>({{(dayjs().format('DD/MM/YYYY'))}})</small>
      </span>
      </v-col>
      <v-col cols="2">
        <v-btn>+</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <SummaryTodo :todos="todos"></SummaryTodo>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import dayjs from 'dayjs'
import TodoService from "@/services/todo.service";
import SummaryTodo from "@/components/SummaryTodo.vue";
export default {

  name: 'Dashboard',
  computed: {
    dayjs() {
      return dayjs
    }
  },
  async mounted() {
    await this.findTodos();
  },
  data() {
    return {
      todos: [],
    }
  },
  methods: {
    async findTodos() {
      this.todos = await TodoService.findAll();
    }
  },
  components: {
    SummaryTodo
  }
}
</script>