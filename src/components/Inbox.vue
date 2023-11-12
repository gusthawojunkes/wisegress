<template>
  <v-layout v-if="todos && todos.length > 0">
    <v-bottom-navigation color="#47667b">
      <div class="d-flex justify-end text-center" v-for="todo in sortedTodos" :key="todo.uuid">
        <v-menu v-model="todo.open" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn
                color="#47667b"
                v-bind="props"
                :icon="todo.icon"
            >
              <p :class="{ 'text-decoration-line-through': todo.done }">{{ `${todo.content.split(' ')[0]}...` }}</p>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item :title="mountInsertedAtTitle(todo.insertedAt)">
                <template v-slot:append>
                  <PriorityChip :value="todo.priority"></PriorityChip>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                {{ todo.content }}
              </v-list-item>
            </v-list>

            <v-card-actions class="d-flex justify-end">
              <v-btn
                  variant="text"
                  :disabled="todo.done === true"
                  icon="mdi-check"
                  @click="this.complete(todo)"
              >
              </v-btn>

              <v-btn
                  variant="text"
                  icon="mdi-delete"
                  @click="this.delete(todo)"
              >
              </v-btn>
              <v-btn
                  variant="text"
                  icon="mdi-arrow-up"
                  @click="this.detail(todo)"
              >
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import PriorityChip from "@/components/PriorityChip.vue";
import dayjs from "dayjs";
import TodoService from "@/services/todo.service";

export default {
  name: "Inbox",
  components: {PriorityChip},
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedTodos() {
      const sortedTodos = _.sortBy(this.todos, 'insertedAt').reverse();
      const nextTodo = _.minBy(sortedTodos, 'insertedAt') || {};
      nextTodo.icon = 'mdi-star'
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.index = _.indexOf(sortedTodos, nextTodo);
      return sortedTodos;
    },
    dayjs() {
      return dayjs
    }

  },
  data: () => ({
    index: 0,
    menu: false,
    fav: true,
    message: false,
    hints: true,
    options: [
      {
        description: "Detalhar",
        icon: "mdi-minus-circle",
        opened: false,
      },
      {
        description: "Excluir",
        icon: "mdi-minus-circle",
        opened: false,
      },
      {
        description: "Finalizar",
        icon: "mdi-minus-circle",
        opened: false,
      }
    ]
  }),
  methods: {
    mountInsertedAtTitle(date) {
      return `Criado em: ${dayjs(date).format("DD/MM/YYYY")}`
    },
    async delete(todo) {
      try {
        await TodoService.delete(todo.uuid);
        this.removeFromTodos(todo);
      } catch (error) {
        console.error(error);
      } finally {
        this.close(todo);
      }
    },
    async detail(todo) {
      try {
        console.log(todo);
      } catch (error) {
        console.error(error);
      } finally {
        this.close(todo);
      }
    },
    async complete(todo) {
      try {
        await TodoService.markAsDone(todo);
        this.removeFromTodos(todo);
      } catch (error) {
        console.error(error);
      } finally {
        this.close(todo);
      }
    },
    close(todo) {
      todo.open = false;
    },
    removeFromTodos(todo) {
      _.remove(this.todos, todo);
    }
  }
}
</script>
