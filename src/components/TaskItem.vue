<template>
  <div>
    <Feedback :isHovering="isHovering" :feature="feature" @feedbackAdded="feedbackAdded" />
    <v-card class="mt-8" :draggable="previewMode === 'kanban'" @dragstart="dragStart($event, task)">
      <div class="h-100 d-flex align-center justify-space-between pa-6">
        <div class="h-100 d-flex align-center">
          <v-radio v-if="previewMode === 'taskList'" class="mr-6" @click="done()" color="#4e6c80">
            <v-tooltip activator="parent" location="top">
              Marcar como concluído
            </v-tooltip>
          </v-radio>
          <div>
            <v-card-item class="pa-0" style="white-space: pre-line">
              <v-card-text class="pa-0">
                <p>{{ task.description }}</p>
              </v-card-text>
            </v-card-item>
            <PriorityChip :value="task.priority"></PriorityChip>
          </div>
        </div>
        <div>
          <v-btn class="ma-0" variant="text" @click="turnIntoEvent()" :disabled="task.done === true">
            <v-icon color="grey">mdi-calendar-clock</v-icon>
            <v-tooltip
                activator="parent"
                location="top"
            >
              Criar um agendamento para essa tarefa!
            </v-tooltip>
          </v-btn>
          <v-btn class="ma-0" variant="text" @click="edit()" :disabled="task.done === true">
            <v-icon color="grey">mdi-pencil</v-icon>
            <v-tooltip
                activator="parent"
                location="top"
            >
              Editar
            </v-tooltip>
          </v-btn>
        </div>

      </div>
    </v-card>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import * as md from '@mdi/js'
import PriorityChip from "@/components/PriorityChip.vue";
import Feedback from '@/components/Feedback.vue';

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    },
    previewMode: {
      type: String,
      required: true,
      default: 'taskList'
    },
    typeList: {
      type: String,
      default: 'taskList'
    },
    feature: {
      type: String,
    }
  },
  data() {
    return {
      pathEdit: md.mdiPencil,
      taskUsed: this.task,
      isHovering: false
    }
  },
  methods: {
    done() {
      this.isHovering = true
    },
    edit() {
      this.$emit('taskEdit', this.taskUsed)
    },
    dragStart(event, task) {
      event.dataTransfer.setData('task', JSON.stringify(task))
    },
    feedbackAdded() {
      this.isHovering = false
      this.taskUsed.done = true
      this.$emit('taskDone', this.taskUsed)
    },
    turnIntoEvent() {
      this.$emit('createEvent', this.taskUsed)
    }
  },
  components: {
    PriorityChip,
    Feedback,
    SvgIcon
  },
}
</script>

<style scoped></style>
