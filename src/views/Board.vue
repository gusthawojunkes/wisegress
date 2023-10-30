<template>
    <div class="board">
      <column v-for="(column, c) in columns" :key="c" :title="column.title" :cards="column.cards" />
    </div>
  </template>
  
  <script>
  import Column from '@/components/Column.vue';
  
  export default {
    components: {
      Column,
    },
    data() {
      return {
        columns: [
          {
            title: 'A fazer',
            cards: [
              { title: 'Tarefa 1', description: 'Descrição da tarefa 1' },
              { title: 'Tarefa 2', description: 'Descrição da tarefa 2' },
            ],
          },
          {
            title: 'Em progresso',
            cards: [
              { title: 'Tarefa 3', description: 'Descrição da tarefa 3' },
            ],
          },
          {
            title: 'Concluído',
            cards: [
              { title: 'Tarefa 4', description: 'Descrição da tarefa 4' },
              { title: 'Tarefa 5', description: 'Descrição da tarefa 5' },
            ],
          },
        ],
      };
    },
    methods: {
      addCard(columnIndex, card) {
        this.columns[columnIndex].cards.push(card);
      },
    deleteCard(columnIndex, cardTitle) {
      const cardIndex = this.columns[columnIndex].cards.findIndex(card => card.title === cardTitle);
      this.columns[columnIndex].cards.splice(cardIndex, 1);
    },
    editCard(columnIndex, cardTitle, newTitle, newDescription) {
      const cardIndex = this.columns[columnIndex].cards.findIndex(card => card.title === cardTitle);
      const card = this.columns[columnIndex].cards[cardIndex];
      card.title = newTitle;
      card.description = newDescription;
    },
    moveCard(sourceColumnIndex, destinationColumnIndex, cardTitle) {
      const cardIndex = this.columns[sourceColumnIndex].cards.findIndex(card => card.title === cardTitle);
      const card = this.columns[sourceColumnIndex].cards[cardIndex];
      this.columns[sourceColumnIndex].cards.splice(cardIndex, 1);
      this.columns[destinationColumnIndex].cards.push(card);
    },
    moveColumn(sourceIndex, destinationIndex) {
      const column = this.columns[sourceIndex];
      this.columns.splice(sourceIndex, 1);
      this.columns.splice(destinationIndex, 0, column);
    }, // this.moveColumn(2, 0); this.addColumn('Testes');
    },
  };
  </script>