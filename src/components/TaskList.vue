<template>
  <div class="h-100">
    <v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" class="w-50">
          <template v-slot:activator="{ props }">
            <v-btn class="btn-positive-action w-75 mb-12" v-bind="props"> Nova Tarefa </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5" @click="clearTask()">Nova Tarefa</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form v-model="form" @submit.prevent="onSubmit(task.uuid)">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Descrição" variant="outlined" required v-model="task.description"
                        :rules="[rules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select label="Prioridade*" variant="outlined" required v-model="task.priority"
                        :rules="[rules.required]" :items="priority"></v-select>
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
      </v-row>
      <div v-for="task in tasks" :key="task.uuid">
        <Task v-if="filterSituation == task.done" :task="task" @taskDone="taskDone" @taskEdit="openTaskEditDialog"
          :previewMode="previewMode" />
      </div>
    </v-col>
  </div>
</template>

<script>
import Task from '@/components/Task.vue'

export default {
  name: 'TaskList',
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
      default: 'taskList'
    }
  },
  data() {
    return {
      form: false,
      dialog: false,
      selectedTaskUuid: '',
      task: {
        uuid: '',
        description: '',
        priority: '',
        done: false,
        situation: 'pending'
      },
      priority: ['Urgente', 'Alta', 'Média', 'Baixa', 'Baixíssima'],
      tasksList: [],
      rules: {
        required: (value) => !!value || 'Campo obrigatório!'
      }
    }
  },
  methods: {
    async onSubmit(taskUuid) {
      try {
        if (taskUuid) {
          this.editTask(this.task)
        } else {
          this.addTask(this.task)
        }
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
      this.clearTask()
    },
    clearTask() {
      this.task = {
        uuid: '',
        description: '',
        priority: '',
        done: false,
        situation: 'pending'
      }
    },
    addTask(task) {
      task.uuid = Math.random().toString(36).substr(2, 9) // POST
      this.updateTaskList(task)
    },
    editTask(task) {
      // PUT
      this.updateTaskList(task)
    },
    taskDone(task) {
      task.done = true
      // PUT
      this.updateTaskList(task)
    },
    openTaskEditDialog(task) {
      this.dialog = true
      this.task = task
    },
    updateTaskList() {
      this.$emit('updateTaskList');
    },
  },
  components: {
    Task
  },
}
</script>

<style scoped></style>
