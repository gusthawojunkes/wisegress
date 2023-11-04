<template>
  <v-container>
    <v-row class="d-flex justify-center h-100">
      <v-col
        v-for="column in columns"
        :key="column.id"
        cols="3"
        @dragover.prevent
        @drop="dragEnd($event, column)"
      >
        <v-card class="h-100 pa-4" color="#47667b">
          <Column :title="column.title" :cards="filterTasks(column.id)" />
        </v-card>
      </v-col>
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
      tasks: [
        {
          uuid: 'dwadawdadawda',
          description: 'Tarefa 1',
          priority: 'Prioridade Alta',
          done: false,
          situation: 'pending'
        },
        {
          uuid: 'diajdioawhdio',
          description: 'Tarefa 2',
          priority: 'Prioridade Baixa',
          done: false,
          situation: 'pending'
        },
        {
          uuid: '89d9ahwdjbbbd',
          description: 'Tarefa 3',
          priority: 'Prioridade Alta',
          done: false,
          situation: 'in_progress'
        },
        {
          uuid: 'aw98hdawdndnd',
          description: 'Tarefa 4',
          priority: 'Prioridade Alta',
          done: true,
          situation: 'done'
        },
        {
          uuid: 'ia0jd9a8wjdjd',
          description: 'Tarefa 5',
          priority: 'Prioridade Alta',
          done: true,
          situation: 'done'
        }
      ]
    }
  },
  methods: {
    filterTasks(situation) {
      return this.tasks.filter((task) => task.situation === situation)
    },
    dragEnd(event, column) {
      const cardData = event.dataTransfer.getData('card')
      const card = JSON.parse(cardData)
      const columnSituation = column.id

      const taskIndex = this.tasks.findIndex((task) => task.uuid === card.uuid)
      if (taskIndex >= 0) {
        this.tasks[taskIndex].situation = columnSituation
      }
    }
  }
}
</script>

<style scoped></style>
