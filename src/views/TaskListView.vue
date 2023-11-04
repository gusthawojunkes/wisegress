<template>
  <v-container class="w-50 pt-12">
    <TaskList :previewMode="previewMode" :tasks="tasks" @updateTaskList="updateTaskList" />
  </v-container>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
export default {
  name: 'TaskListView',
  data() {
    return {
      previewMode: 'taskList',
      tasks: this.getTasks()
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
    updateTaskList() {
      this.tasks = this.getTasks() // GET
    }
  },
  components: {
    TaskList
  }
}
</script>

<style></style>
