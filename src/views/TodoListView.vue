<template>
  <v-container class="w-50 pt-12">
    <v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" class="w-50">
          <template v-slot:activator="{ props }">
            <v-btn class="btn-positive-action w-75 mb-12" v-bind="props">Nova Pendência</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5" @click="clearListItem()">Nova Pendência</span>
            </v-card-title>
            <v-card-subtitle>
              Dica: Utilize verbos ao cadastrar uma pendência!
            </v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-form v-model="form" @submit.prevent="onSubmit(todo.uuid)">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          label="Descrição"
                          variant="outlined"
                          required
                          v-model="todo.content"
                          :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                          label="Prioridade*"
                          variant="outlined"
                          required
                          v-model="todo.priority"
                          :rules="[rules.required]"
                          :items="priorities"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div class="d-flex justify-end">
                    <v-btn class="btn-negative-action mr-6" variant="text" @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn class="btn-positive-action" variant="text" @click="close()" type="submit"
                           :disabled="!form">
                      Salvar
                    </v-btn>
                  </div>

                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <div v-for="todo in todos" :key="todo.uuid">
        <TodoItem :todo="todo" @done="markAsDone" @edit="openEditDialog"/>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import TodoService from "@/services/todo.service";
import TodoItem from "@/components/TodoItem.vue";
import {getDisplayLabels, getPriorityCode} from "@/helpers/PriorityHelper";
import UserService from "@/services/user.service";
export default {
  name: 'TodoItemView',
  async mounted() {
    await this.updateList();
  },
  data() {
    return {
      form: false,
      dialog: false,
      todos: [],
      todo: {
        uuid: '',
        content: '',
        priority: '',
        done: false,
        situation: 'pending'
      },
      priorities: getDisplayLabels(),
      rules: {
        required: (value) => !!value || 'Campo obrigatório!'
      },
    }
  },
  methods: {
    async getTodos() {
      return await TodoService.findAll();
    },
    async updateList() {
      this.todos = await this.getTodos();
    },
    async onSubmit(uuid) {
      try {
        if (uuid) {
          await this.editListItem(this.todo)
        } else {
          await this.addListItem(this.todo)
        }
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
      this.clearListItem()
    },
    clearListItem() {
      this.todo = {
        uuid: '',
        content: '',
        priority: '',
        done: false,
      }
    },
    async addListItem(todo) {
      let itemToSave = {
        content: todo.content,
        priority: getPriorityCode(todo.priority),
        userUuid: UserService.getUserUuid(),
      }

      await TodoService.create(itemToSave)

      await this.updateList(todo)
    },
    async editListItem(todo) {
      let updatedTodo = {
        uuid: todo.uuid,
        userUuid: UserService.getUserUuid(),
        content: todo.content,
        done: todo.done,
        priority: getPriorityCode(todo.priority),
      }

      await TodoService.update(updatedTodo);
      await this.updateList(todo);
    },
    async markAsDone(todo) {
      await TodoService.toggleDone(todo);
      await this.updateList(todo)
    },
    openEditDialog(todo) {
      this.dialog = true
      this.todo = todo;
    },
    close() {
      this.dialog = false;
    }
  },
  components: {
    TodoItem,
  }
}
</script>

<style></style>
