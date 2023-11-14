<template>
  <v-card style='z-index:20001;'>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail color="#47667B">
        <v-list>
          <v-list-item :title="username"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <router-link class="router-link-custom" v-for="(item, i) in items" :key="i" :to="item.path">
            <v-list-item :prepend-icon="item.icon" :title="item.title"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: 'SideBar',
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          path: '/dashboard',
          icon: 'mdi-home'
        },
        {
          title: 'Caixa de entrada',
          path: '/todo',
          icon: 'mdi-inbox',
        },
        {
          title: 'Tarefas',
          path: '/tasks',
          icon: 'mdi-list-box-outline'
        },
        {
          title: 'Agenda',
          path: '/agenda',
          icon: 'mdi-calendar-month'
        },
      ],
      username: UserService.getUser().name,
    }
  },

}
</script>

<style scoped>
.router-link-custom {
  text-decoration: none;
  color: white;
}
</style>
