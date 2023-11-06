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
        <v-card class="mx-auto" variant="tonal">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Caixa de entrada
              </div>
              <div class="text-caption">
                <span v-if="todos.length === 0">Não há nada aqui por enquanto!</span>
                <div v-else>
                  <ul>
                    <li v-for="todo in todos" :key="todo.uuid">
                      <v-row>
                        <v-col cols="8">
                          <v-card-text :class="{ 'text-decoration-line-through' : todo.done}">
                            {{todo.content}}
                          </v-card-text>
                        </v-col>
                        <v-col cols="4 ">
                          <PriorityChip :value="todo.priority"></PriorityChip>
                        </v-col>
                      </v-row>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn>
              Ir para a caixa de entrada
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import dayjs from 'dayjs'
import TodoService from "@/services/todo.service";
import PriorityChip from "@/components/PriorityChip.vue";
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
    PriorityChip
  }
}
</script>