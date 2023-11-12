<template>
  <v-container>
    <v-row class="d-flex justify-center h-100">
      <Column v-for="column in columns" :key="column.id" @dragover.prevent @drop="dragEnd($event, column)"
        :title="column.title" :tasks="filterTasks(column.id)" :filterSituation="column.id == 'DONE' ? false : true"
        :taskSituation="column.id" @updateList="updateList" />
    </v-row>
  </v-container>
</template>

<script>
import Column from '@/components/Column.vue'
import TaskService from "@/services/task.service";
import UserService from "@/services/user.service";
import { getPriorityCode } from "@/helpers/PriorityHelper";

export default {
  name: 'KanbanBoard',
  async mounted() {
    await this.updateList();
  },
  data() {
    return {
      columns: [
        {
          id: 'PENDING',
          title: 'À Fazer'
        },
        {
          id: 'IN_PROGRESS',
          title: 'Em Progresso'
        },
        {
          id: 'DONE',
          title: 'Feito'
        }
      ],
      tasks: []
    }
  },
  methods: {
    filterTasks(situation) {
      let list = []
      if (this.tasks) {
        list = this.tasks.filter((task) => task.situation === situation.toUpperCase())
      }
      return list
    },
    async dragEnd(event, column) {
      const draggedTaskData = event.dataTransfer.getData('task')
      const draggedTask = JSON.parse(draggedTaskData)
      const columnSituation = column.id
      draggedTask.situation = columnSituation

      let itemToEdit = {
        uuid: draggedTask.uuid,
        userUuid: UserService.getUserUuid(),
        description: draggedTask.description,
        done: draggedTask.done,
        dueDate: draggedTask.dueDate,
        priority: getPriorityCode(draggedTask.priority),
        situation: draggedTask.situation.toUpperCase()
      }

      if (itemToEdit.situation == 'DONE') {
        itemToEdit.done = true
      }
      await TaskService.update(itemToEdit)

      await this.updateList();
      console.log(this.tasks)
    },
    async getTasks() {
      return await TaskService.findAll();
    },
    async updateList() {
      this.tasks = await this.getTasks();
    },
  },
  components: {
    Column
  },
}
</script>

<style scoped></style>
