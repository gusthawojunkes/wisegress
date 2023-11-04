<template>
  <v-container>
    <v-row class="d-flex justify-center h-100">
      <Column v-for="column in columns" :key="column.id" @dragover.prevent @drop="dragEnd($event, column)"
        :title="column.title" :tasks="filterTasks(column.id)" :updateTaskList="updateTaskList" />
    </v-row>
  </v-container>
</template>

<script>
import Column from '@/components/Column.vue'

export default {
  name: 'KanbanBoard',
  components: {
    Column
  },
  data() {
    return {
      columns: [
        {
          id: 'pending',
          title: 'À Fazer'
        },
        {
          id: 'in_progress',
          title: 'Em Progresso'
        },
        {
          id: 'done',
          title: 'Feito'
        }
      ],
      tasks: this.getTasks()
    }
  },
  methods: {
    filterTasks(situation) {
      return this.tasks.filter((task) => task.situation === situation)
    },
    dragEnd(event, column) {
      const draggedTaskData = event.dataTransfer.getData('task')
      const draggedTask = JSON.parse(draggedTaskData)
      const columnSituation = column.id
      draggedTask.situation = columnSituation

      console.log(JSON.stringify(draggedTask))

      // PUT para atualizar a situação da tarefa

      this.tasks = this.getTasks() // GET
    },
    getTasks() { // GET, TODO substituir pela API
      return [
        {
          uuid: '1',
          description: 'Tarefa 1',
          priority: 'Alta',
          done: false,
          situation: 'pending'
        },
        {
          uuid: '2',
          description: 'Tarefa 2',
          priority: 'Média',
          done: false,
          situation: 'in_progress'
        },
        {
          uuid: '3',
          description: 'Tarefa 3',
          priority: 'Baixa',
          done: true,
          situation: 'done'
        }
      ]
    },
    updateTaskList() {
      this.tasks = this.getTasks() // GET
    }
  }
}
</script>

<style scoped></style>
