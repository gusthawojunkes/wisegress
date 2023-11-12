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
  async mounted() {
    await this.updateList();
  },
  data() {
    return {
      previewMode: 'task',
      typeList: 'task',
      tasks: []
    }
  },
  methods: {
    async getTasks() {
      return await TaskService.findAll();
    },
    async updateList() {
      this.tasks = await this.getTasks();
    }
  },
  components: {
    List
  }
}
</script>

<style></style>
