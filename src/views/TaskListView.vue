<template>
  <v-container class="w-50 pt-12">
    <List :previewMode="previewMode" :tasks="getUndoneTasks()" @updateList="updateList" :typeList="typeList"
      :feature="feature" />
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
      previewMode: 'taskList',
      typeList: 'task',
      feature: 'LIST',
      tasks: [],
      task: {}
    }
  },
  methods: {
    async getTasks() {
      return await TaskService.findAll();
    },
    async updateList() {
      this.tasks = await this.getTasks();
    },
    getUndoneTasks() {
      return this.tasks.filter(task => task.done !== true);
    }
  },
  components: {
    List
  }
}
</script>

<style></style>
