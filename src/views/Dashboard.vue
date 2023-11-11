<template>
  <v-container class="align-center w-50">
    <v-row no-gutters>
      <v-col cols="11">
      <span>
        Hoje
        <small>({{(dayjs().format('DD/MM/YYYY'))}})</small>
      </span>
      </v-col>
      <v-col cols="1">
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
                color="#47667b"
                icon="mdi-plus"
                v-bind="props"
            >
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="(option, index) in options"
                :key="index"
            >
              <v-list-item-title>
                <v-btn @click="console.log(option)">
                  {{option}}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <SummaryTodo :todos="todos"></SummaryTodo>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import dayjs from 'dayjs'
import TodoService from "@/services/todo.service";
import SummaryTodo from "@/components/SummaryTodo.vue";
import FeedbackService from "@/services/feedback.service";
export default {

  name: 'Dashboard',
  computed: {
    dayjs() {
      return dayjs
    }
  },
  async mounted() {
    await this.findTodos();
    this.classifications = await FeedbackService.getClassifications();
  },
  data() {
    return {
      todos: [],
      classifications: [],
      options: ["Tarefa", "Todo"]
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
