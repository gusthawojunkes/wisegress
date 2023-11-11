<template>
  <v-container class="w-50 pt-12">
    <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList" :typeList="typeList" />
  </v-container>
</template>

<script>
import List from '@/components/List.vue'
import TaskService from '@/services/task.service'

export default {
  name: 'TaskListView',
  data() {
    return {
      previewMode: 'task',
      typeList: 'task',
      tasks: this.getTasks()
    }
  },
  methods: {
    getTasks() {
      return [{
        uuid: '8849f9cb-8d2c-413d-85d0-ffec4c6cc4ea',
        description: 'tche',
        priority: 'HIGHEST',
        situation: 'PENDING',
        dueDate: '2024-12-12 01:01:00.000',
        done: false,
      }]
    },
    updateList() {
      this.tasks = this.getTasks() // GET
    }
  },
  components: {
    List
  }
}
</script>

<style></style>
