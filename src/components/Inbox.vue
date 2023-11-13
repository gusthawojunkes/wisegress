<template>
  <v-layout v-if="todos && todos.length > 0">
    <v-bottom-navigation color="#47667b">
      <div class="d-flex justify-end text-center" v-for="(todo, index) in sortedTodos" :key="todo.uuid">
        <v-menu v-model="todo.open" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn
                color="#47667b"
                v-bind="props"
            >
              {{ index + 1 }}
              <v-icon :color="getIconColor(todo, index)" :icon="index === 0 ? 'mdi-star' : 'mdi-note'"></v-icon>
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
                  :disabled="todo.done === true"
                  icon="mdi-check"
                  color="green"
                  @click="this.complete(todo)"
              >
              </v-btn>

              <v-btn
                  icon="mdi-delete"
                  color="red"
                  @click="this.delete(todo)"
              >
              </v-btn>
<!--              <v-btn-->
<!--                  variant="text"-->
<!--                  icon="mdi-arrow-up"-->
<!--                  @click="this.detail(todo)"-->
<!--              >-->
<!--              </v-btn>-->
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
import { COLORS } from '@/helpers/PriorityHelper'

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
      const sortedTodos = _.sortBy(this.todos, 'insertedAt');
      const nextTodo = _.minBy(sortedTodos, 'insertedAt') || {};
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
    removeDialog: false,
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
    // async detail(todo) {
    //   try {
    //     console.log(todo);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     this.close(todo);
    //   }
    // },
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
    },
    getIconColor(todo, index) {
      if (index === 0) {
        return 'yellow';
      } else if (todo.priority === '') {
        return COLORS[todo.priority]
      }
    }
  }
}
</script>
