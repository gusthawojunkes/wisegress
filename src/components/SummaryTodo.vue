<template>
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
              <li v-for="(todo, index) in todos" :key="todo.uuid">
                <v-row v-if="index < 3">
                  <v-col cols="8">
                    <v-card-text :class="{ 'text-decoration-line-through' : todo.done}">
                      {{todo.content}}
                    </v-card-text>
                  </v-col>
                  <v-col cols="4">
                    <PriorityChip :value="todo.priority"></PriorityChip>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </v-card-item>
    <v-card-actions class="justify-center">
      <v-btn @click="goToTodos()">
        Ir para a caixa de entrada
      </v-btn>
    </v-card-actions>
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