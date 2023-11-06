<template>
  <v-col cols="3">
    <v-card class="h-100 pa-4 d-flex flex-column" color="#47667b">
      <v-card-title class="my-4">{{ title }}</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList" />
    </v-card>
  </v-col>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'Column',
  props: {
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      previewMode: 'kanban',
    }
  },
  methods: {
    getTasks() {
      return [
        {
          uuid: '1',
          description: 'Tarefa 1',
          priority: 'Alta',
          done: false
        },
        {
          uuid: '2',
          description: 'Tarefa 2',
          priority: 'Média',
          done: false
        },
        {
          uuid: '3',
          description: 'Tarefa 3',
          priority: 'Baixa',
          done: true
        }
      ]
    },
    updateList() {
      this.$emit('updateList');
    },
  },
  components: {
    List
  }
}
</script>

<style scoped>
h2 {
  color: white;
}
</style>
