<template>
  <div>
    <v-card class="mt-4" :draggable="previewMode === 'kanban'" @dragstart="dragStart($event, task)">
      <div class="h-100 d-flex align-center justify-space-between pa-6">
        <div class="h-100 d-flex align-center">
          <v-hover v-if="previewMode === 'taskList'">
            <template v-slot:default="{ isHovering, props }">
              <v-btn class="ml-6 mr-6 btn-positive-action" variant="outlined" v-bind="props"
                :text="isHovering ? '✔' : undefined" @click="done()">
              </v-btn>
            </template>
          </v-hover>
          <div>
            <v-card-item class="pa-0" style="white-space: pre-line">
              <v-card-text class="pa-0">
                <p>{{ typeList === 'todo' ? task.content : task.description }}</p>
              </v-card-text>
            </v-card-item>
            <PriorityChip :value="task.priority"></PriorityChip>
          </div>
        </div>
        <v-btn class="ma-0" variant="plain" @click="edit()">
          <svg-icon type="mdi" :path="pathEdit" size="25" color="#47667B" float="rigth"></svg-icon>
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
  name: 'ListItem',
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
      required: true,
      default: 'task'
    }
  },
  components: {
    PriorityChip,
    SvgIcon
  },
  data() {
    return {
      isHovering: false,
      custom: false,
      pathEdit: md.mdiPencil,
      isChecked: false,
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
