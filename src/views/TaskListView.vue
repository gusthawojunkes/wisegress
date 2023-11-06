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
          done: false,
          dueDate: '2022-03-10T12:15:50'
        },
        {
          uuid: '2',
          description: 'Tarefa 2',
          priority: 'Média',
          done: false,
          dueDate: '2022-03-10T12:15:50'
        },
        {
          uuid: '3',
          description: 'Tarefa 3',
          priority: 'Baixa',
          done: true,
          dueDate: '2022-03-10T12:15:50'
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
