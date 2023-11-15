<template>
  <v-card>
    <v-card-title>Próximos Eventos</v-card-title>
    <v-list>
      <div v-if="events.length > 0">
        <v-list-item
            v-for="(event, index) in events"
            :key="event.id"
        >
          <v-list-item-title>
            <v-icon v-if="index === 0" icon="mdi-star" color="yellow"></v-icon>
            {{ event.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(event.date) }}</v-list-item-subtitle>
          <v-tooltip
              v-if="index === 0"
              activator="parent"
              location="start"
          >
            Nós recomendamos que você priorize esse agendamento!
          </v-tooltip>
        </v-list-item>
      </div>
      <v-list-item v-else>
        <span>Nenhum agendamento futuro.</span>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import EventService from "@/services/event.service";

export default {
  name: "NextEvents",
  mounted() {
    this.findEvents();
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    formatDate(dateString) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    async findEvents() {
      this.events = await EventService.findAll();
      if (this.events.length > 3) {
        this.events.length = 3;
      }
    }
  },
};
</script>
