<template>
  <v-card class="mx-auto" variant="elevated" color="#47667b" min-width="350px">
    <v-card-item>
      <v-card-title>
        Caixa de entrada
      </v-card-title>
      <v-card-text>
        <span v-if="todos.length === 0">Não há nada aqui por enquanto!</span>
        <div  v-else v-for="(todo, index) in todos" :key="todo.uuid">
          <div class="d-flex justify-space-between" v-if="index < 3">
            <span class="d-flex" style="margin-top: 15px" :class="{ 'text-decoration-line-through': todo.done }"> {{todo.content}} </span>
            <PriorityChip :value="todo.priority"></PriorityChip>
          </div>
        </div>
        <v-row class="d-flex justify-center" v-if="(todos.length - 3) > 0">
          E mais {{ (todos.length - 3) }} itens
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>
        <v-btn @click="goToTodos()">
          Ir para a caixa de entrada
        </v-btn>
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>

<script>
import PriorityChip from "@/components/PriorityChip.vue";

export default {
  name: 'SummaryTodo',
  components: {PriorityChip},
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    async goToTodos() {
      await this.$router.push('/todo');
    }
  }
}
</script>
