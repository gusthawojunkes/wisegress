<template>
  <v-container>
    <v-row>
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
                {{option}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <SummaryTodo width="87%" :todos="todos"></SummaryTodo>
      </v-col>
      <v-col cols="4">
        <NextEvents></NextEvents>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="d-flex justify-centers">
        <FeedbackChart :classifications="classifications"></FeedbackChart>
      </v-col>
      <v-col cols="4">
        b
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import dayjs from 'dayjs'
import TodoService from "@/services/todo.service";
import SummaryTodo from "@/components/SummaryTodo.vue";
import FeedbackService from "@/services/feedback.service";
import NextEvents from "@/components/NextEvents.vue";
import FeedbackChart from "@/components/FeedbackChart.vue";
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
    NextEvents,
    SummaryTodo,
    FeedbackChart
  }
}
</script>
