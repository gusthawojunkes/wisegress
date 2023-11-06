<template>
    <v-card style='z-index:20001;'>
        <v-layout>
            <v-navigation-drawer expand-on-hover rail color="#47667B">
                <v-list>
                    <v-list-item title="Wisegress"></v-list-item>
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
import * as md from '@mdi/js';
export default {
    name: 'SideBar',
    data() {
        return {
            items: [
                {
                  title: 'Dashboard',
                  path: '/dashboard',
                  icon: 'mdiDashboard'
                },
                {
                    title: 'Lista de Farefas',
                    path: '/todo',
                    icon: 'mdiListBoxOutline'
                },
                {
                    title: 'Pomodoro',
                    path: '/pomodoro',
                    icon: 'mdiClockOutline'
                },
                {
                    title: 'Kanban',
                    path: 'kanban',
                    icon: 'mdiDeveloperBoard'
                },
                {
                    title: 'Agenda',
                    path: '/agenda',
                    icon: 'mdiCalendarMonth'
                },
            ]
        }
    },
    methods: {
    },
    computed: {
        md() {
            return md;
        },
    },
}
</script>

<style scoped>
.router-link-custom {
    text-decoration: none;
    color: white;
}
</style>
