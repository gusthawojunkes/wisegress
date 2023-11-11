<template>
    <v-container>
        <pro-calendar :show-close-button="false" ref="calendar" :events="events" :config="cfg" view="month">
          <template #closeButton>
            <!-- da pra botar o botão de novo evento aqui -->
          </template>
        </pro-calendar>
    </v-container>
</template>

<script>
import "vue-pro-calendar/style";
import EventService from "@/services/event.service";
export default {
    name: "Calendar",
    async mounted() {
      this.events = await this.getEvents();
    },
    data() {
          return {
              cfg: {
                  viewEvent: undefined,
                  reportEvent: undefined,
                  searchPlaceholder: "",
                  eventName: "",
                  closeText: "",
                  nativeDatepicker: false,
                  todayButton: true
              },
            events: [],
          }
      },
      methods: {
          async getEvents() {
              return await EventService.findAll();
          },
      },
}
</script>
