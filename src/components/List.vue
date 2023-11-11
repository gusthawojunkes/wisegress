<template>
  <div class="h-100">
    <v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" class="w-50">
          <template v-slot:activator="{ props }">
            <v-btn class="btn-positive-action w-75 mb-12" v-bind="props">Nova {{ titleList }} </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5" @click="clearListItem()">Nova {{ titleList }}</span>
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
      </v-row>
      <div v-for="task in tasks" :key="task.uuid">
        <ListItem v-if="filterSituation === task.done" :task="task" @taskDone="taskDone" @taskEdit="openListItemEditDialog"
          :previewMode="previewMode" :typeList="typeList" />
      </div>
    </v-col>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import {getDisplayLabels} from "@/helpers/PriorityHelper";

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
      default: 'task'
    },
    typeList: {
      type: String,
      required: true,
      default: 'task'
    }
  },
  data() {
    return {
      form: false,
      dialog: false,
      selectedListItemUuid: '',
      task: {
        uuid: '',
        description: '',
        priority: '',
        dueDate: '',
        done: false,
        situation: 'pending'
      },
      priority: getDisplayLabels(),
      tasksList: [],
      rules: {
        required: (value) => !!value || 'Campo obrigatório!'
      },
      titleList: this.typeList == "task" ? "Tarefa" : "Pendência",
    }
  },
  methods: {
    async onSubmit(taskUuid) {
      try {
        if (taskUuid) {
          this.editListItem(this.task)
        } else {
          this.addListItem(this.task)
        }
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
      this.clearListItem()
    },
    clearListItem() {
      this.task = {
        uuid: '',
        description: '',
        priority: '',
        done: false,
        situation: 'pending'
      }
    },
    addListItem(task) {
      // POST
      this.updateList(task)
    },
    editListItem(task) {
      // PUT
      this.updateList(task)
    },
    taskDone(task) {
      task.done = true
      // PUT
      this.updateList(task)
    },
    openListItemEditDialog(task) {
      this.dialog = true
      this.task = task
    },
    updateList() {
      this.$emit('updateList');
    },
  },
  components: {
    ListItem
  },
}
</script>

<style scoped></style>
