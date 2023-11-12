<template>
  <div>
    <v-card class="mt-4" :draggable="previewMode === 'kanban'" @dragstart="dragStart($event, task)">
      <div class="h-100 d-flex align-center justify-space-between pa-6">
        <div class="h-100 d-flex align-center">
          <v-radio v-if="previewMode === 'taskList'" class="mr-6" :value="one" @click="done()" color="#4e6c80">
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
        <v-btn class="ma-0" variant="plain" @click="edit()">
          <svg-icon :path="pathEdit" color="#47667B" float="rigth" size="25" type="mdi"></svg-icon>
          <v-tooltip activator="parent" location="top">
            Editar
          </v-tooltip>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import * as md from '@mdi/js'
import PriorityChip from "@/components/PriorityChip.vue";

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
    }
  },
  components: {
    PriorityChip,
    SvgIcon
  },
  data() {
    return {
      pathEdit: md.mdiPencil,
      taskUsed: this.task
    }
  },
  methods: {
    done() {
      this.taskUsed.done = true
      this.$emit('taskDone', this.taskUsed)
    },
    edit() {
      this.$emit('taskEdit', this.taskUsed)
    },
    dragStart(event, task) {
      event.dataTransfer.setData('task', JSON.stringify(task))
    }
  }
}
</script>

<style scoped></style>
