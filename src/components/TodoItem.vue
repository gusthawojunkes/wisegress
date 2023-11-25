<template>
  <div>
    <Feedback :isHovering="isHovering" :feature="feature" @feedbackAdded="feedbackAdded" />
    <v-card class="mt-4">
      <div class="h-100 d-flex align-center justify-space-between pa-6">
        <div class="h-100 d-flex align-center">
          <div>
            <v-card-item class="pa-0" style="white-space: pre-line">
              <v-card-text class="pa-0">
                <p :class="{ 'text-decoration-line-through': todo.done }">{{ todo.content }}</p>
              </v-card-text>
            </v-card-item>
            <PriorityChip :value="todo.priority"></PriorityChip>
          </div>
        </div>
        <div>
          <v-btn class="ma-0" variant="text" @click="remove()" :disabled="todo.done === true">
            <v-icon color="red">mdi-delete</v-icon>
            <v-tooltip activator="parent" location="top">
              Excluir
            </v-tooltip>
          </v-btn>
          <v-btn class="ma-0" variant="text" @click="done()">
            <v-icon :color="todo.done === true ? 'red' : 'green'">{{ todo.done === true ? "mdi-undo" : "mdi-check"
            }}</v-icon>
            <v-tooltip activator="parent" location="top">
              {{ todo.done === true ? "Marcar como incompleto" : "Marcar como concluído" }}
            </v-tooltip>
          </v-btn>
          <v-btn class="ma-0" variant="text" @click="edit()" :disabled="todo.done === true">
            <v-icon color="grey">mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">
              Editar
            </v-tooltip>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import * as md from '@mdi/js'
import PriorityChip from "@/components/PriorityChip.vue";
import Feedback from '@/components/Feedback.vue';

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
  },
  components: {
    PriorityChip,
    Feedback,
  },
  data() {
    return {
      feature: 'TODO',
      isHovering: false,
      pathEdit: md.mdiPencil
    }
  },
  methods: {
    feedbackAdded() {
      this.isHovering = false;
      this.$emit('done', this.todo);
    },
    done() {
      if (this.todo.done === true) {
        this.$emit('done', this.todo);
      } else {
        this.isHovering = true;
      }
    },
    edit() {
      this.$emit('edit', this.todo);
    },
    remove() {
      this.$emit('remove', this.todo);
    }
  }
}
</script>

<style scoped></style>
