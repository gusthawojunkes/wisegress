<template>
  <div class="h-100">
    <v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" class="w-50">
          <template v-slot:activator="{ props }">
            <v-btn class="btn-positive-action w-75 mb-12" v-bind="props">Nova {{ titleList }}</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5" @click="clearTaskItem()">Nova {{ titleList }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form v-model="form" @submit.prevent="onSubmit(task.uuid)">
                  <v-row>
                    <v-col cols="12">
                      <v-textarea label="Descrição" variant="outlined" required v-model="task.description"
                                    :rules="[rules.required]"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-select label="Prioridade*" variant="outlined" required v-model="task.priority"
                                :rules="[rules.required]" :items="priority"></v-select>
                    </v-col>
                    <v-col cols="12" v-if="this.typeList === 'task'">
                      <v-text-field label="Data de vencimento" variant="outlined" required v-model="task.dueDate"
                                    :rules="[rules.required]" type="datetime-local">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-btn class="btn-positive-action mr-6" variant="text" @click="dialog = false" type="submit"
                         :disabled="!form">
                    Salvar
                  </v-btn>
                  <v-btn class="btn-negative-action" variant="text" @click="dialog = false">
                    Cancelar
                  </v-btn>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="eventDialog" class="w-50">
          <v-card>
            <v-card-title>
              <span>Novo agendamento</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form v-model="eventForm">
                  <v-row>
                    <v-col cols="12">
                      <v-textarea label="Descrição" variant="outlined" required v-model="event.description"
                                    :rules="[rules.required]"></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field label="De" variant="outlined" required v-model="event.dueDate"
                                        :rules="[rules.required]" type="datetime-local">
                          </v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field label="Até" variant="outlined" required v-model="event.endDate"
                                        :rules="[rules.required]" type="datetime-local">
                          </v-text-field>
                        </v-col>
                      </v-row>

                    </v-col>
                  </v-row>
                  <div class="d-flex justify-end">
                    <v-btn class="btn-negative-action mr-6" variant="text" @click="closeEventDialog">
                      Cancelar
                    </v-btn>
                    <v-btn class="btn-positive-action" variant="text" @click="createNewEvent(event)" type="submit"
                           :disabled="!eventForm">
                      Criar
                    </v-btn>

                  </div>

                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <div v-for="task in tasks" :key="task.uuid">
        <TaskItem :task="task" @taskDone="taskDone" @taskEdit="openTaskItemEditDialog" :previewMode="previewMode"
          :typeList="typeList" :feature="feature" />
      </div>
    </v-col>

  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
import { getDisplayLabels, getPriorityCode, getPriorityLabel } from "@/helpers/PriorityHelper";

import TaskService from '@/services/task.service';
import UserService from "@/services/user.service";
import EventService from "@/services/event.service";

export default {
  name: 'List',
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => []
    },
    filterSituation: {
      type: Boolean,
      required: false,
      default: false
    },
    previewMode: {
      type: String,
      required: true,
      default: 'typeList'
    },
    typeList: {
      type: String,
      default: 'task'
    },
    taskSituation: {
      type: String,
      default: 'PENDING'
    },
    feature: {
      type: String,
    }
  },
  data() {
    return {
      form: false,
      eventForm: false,
      dialog: false,
      selectedTaskItemUuid: '',
      eventDialog: false,
      task: {
        uuid: '',
        description: '',
        priority: '',
        dueDate: '',
        done: false,
        situation: this.taskSituation
      },
      event: {
        startDate: undefined,
        dueDate: undefined,
        endDate: undefined,
      },
      priority: getDisplayLabels(),
      tasksList: [],
      rules: {
        required: (value) => !!value || 'Campo obrigatório!'
      },
      titleList: this.typeList === "task" ? "Tarefa" : "Pendência",
    }
  },
  methods: {
    async onSubmit(taskUuid) {
      try {
        if (taskUuid) {
          await this.editTaskItem(this.task)
        } else {
          await this.addTaskItem(this.task)
        }
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
      this.clearTaskItem()
    },
    clearTaskItem() {
      this.task = {
        uuid: '',
        description: '',
        priority: '',
        done: false,
        situation: this.taskSituation
      }
    },
    async addTaskItem(task) {
      let itemToSave = {
        description: task.description,
        priority: getPriorityCode(task.priority),
        dueDate: task.dueDate,
        userUuid: UserService.getUserUuid(),
        situation: task.situation.toUpperCase()
      }

      await TaskService.create(itemToSave)
      this.updateList(task)
    },
    async editTaskItem(task) {
      let itemToEdit = {
        uuid: task.uuid,
        userUuid: UserService.getUserUuid(),
        description: task.description,
        done: task.done,
        dueDate: task.dueDate,
        priority: getPriorityCode(task.priority),
        situation: task.situation.toUpperCase()
      }

      await TaskService.update(itemToEdit)
      this.updateList(task)
    },
    taskDone(task) {
      task.done = true
      task.situation = 'done'

      this.editTaskItem(task)

      this.updateList(task)
    },
    openTaskItemEditDialog(task) {
      this.dialog = true
      this.task = task
      this.task.priority = getPriorityLabel(task.priority)

      if (this.typeList !== 'task') {
        this.task.description = task.content
      }
    },
    updateList() {
      this.$emit('updateList', true);
    },
    async createEvent(task) {
      this.eventDialog = true;
      this.event = task;
    },
    async createNewEvent(event) {
      const newEvent = {
        date: event.dueDate,
        startDate: event.dueDate,
        endDate: event.endDate,
        description: event.description,
        userUuid: UserService.getUserUuid(),
      }
      console.log(newEvent);
      await EventService.create(newEvent)
      this.closeEventDialog();
    },
    closeEventDialog() {
      this.event = {};
      this.eventDialog = false;
    }
  },
  components: {
    TaskItem
  },
}
</script>

<style scoped></style>
