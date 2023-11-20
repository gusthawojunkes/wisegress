<template>
  <v-container>
<!--    <v-row>-->
<!--      <v-col cols="11">-->
<!--      <span>-->
<!--        Hoje-->
<!--        <small>({{(dayjs().format('DD/MM/YYYY'))}})</small>-->
<!--      </span>-->
<!--      </v-col>-->
<!--      <v-col cols="1">-->
<!--        <v-menu location="bottom">-->
<!--          <template v-slot:activator="{ props }">-->
<!--            <v-btn-->
<!--                color="#47667b"-->
<!--                icon="mdi-plus"-->
<!--                v-bind="props"-->
<!--            >-->
<!--            </v-btn>-->
<!--          </template>-->

<!--          <v-list>-->
<!--            <v-list-item-->
<!--                v-for="(option, index) in options"-->
<!--                :key="index"-->
<!--            >-->
<!--              <v-list-item-title>-->
<!--                {{option}}-->
<!--              </v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-menu>-->
<!--      </v-col>-->
<!--    </v-row>-->

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

      </v-col>
    </v-row>

    <v-dialog persistent width="auto" v-model="cleaningDayDialog"  max-width="50rem">
      <v-card>
        <v-card-title class="text-h5">
          Hoje é o seu dia de limpeza! 🤩
        </v-card-title>
        <v-card-subtitle>Não se esqueça de dar um destino para todas aquelas tarefas que você deixou esperando...</v-card-subtitle>
        <v-card-text>
          <span>Vamos nos livrar de todas aquelas tarefas que você não irá mais dar andamento.</span><br/>
          <span>Agora é o momento perfeito para dar uma boa revisada no que você precisa e não precisa mais fazer, conferir seus próximos agendamentos e concluir tarafas antigas!</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="#47667b"
              variant="text"
              @click="cleaningDayDialog = false"
          >
            Entendido!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

import dayjs from 'dayjs'
import TodoService from "@/services/todo.service";
import SummaryTodo from "@/components/SummaryTodo.vue";
import FeedbackService from "@/services/feedback.service";
import NextEvents from "@/components/NextEvents.vue";
import FeedbackChart from "@/components/FeedbackChart.vue";
import User from "@/helpers/User";
import Time from "@/helpers/Time";
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
    const lastRoute = localStorage.getItem("LAST_ROUTE") || "";
    if ("/login" === lastRoute) {
      const dayOfWeek = dayjs().day();
      const userCleaningWeekDays = User.defaultSelectedWeekdays();
      const weekdays = Time.weekdays();
      const todayDayOfWeek = weekdays[dayOfWeek];
      if (userCleaningWeekDays.includes(todayDayOfWeek)) {
        this.cleaningDayDialog = true;
      }
    }
  },
  data() {
    return {
      todos: [],
      classifications: [],
      options: ["Tarefa", "Todo"],
      cleaningDayDialog: false
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
