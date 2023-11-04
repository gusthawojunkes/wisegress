<template>
  <v-card class="my-6" draggable="true" @dragstart="dragStart($event, card)" @dragend="dragEnd">
    <v-card-item style="white-space: pre-line">
      <v-card-text class="pa-0">
        <p>{{ card.description }}</p>
      </v-card-text>
    </v-card-item>

    <v-card-text>
      <v-chip color="#6D8B89" size="x-small">{{ card.priority }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    dragStart(event, card) {
      event.dataTransfer.setData('card', JSON.stringify(card))
    }
  }
}
</script>

<style scoped></style>
