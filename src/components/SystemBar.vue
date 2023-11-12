<template>
  <v-layout style="height: 50px">
    <v-system-bar color="#47667b" class="pa-4">
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-timer" variant="text" class="ms-2" v-bind="props">
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <Pomodoro></Pomodoro>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon="mdi-cog" variant="text" class="ms-2"></v-btn>
    </v-system-bar>
  </v-layout>
</template>

<script>
import Pomodoro from "@/views/Pomodoro.vue";

export default {
  components: {
    Pomodoro
  },
  data: () => ({}),
}
</script>
