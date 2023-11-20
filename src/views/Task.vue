<template>
    <v-row class="d-flex justify-end mx-12 mt-12">
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn class="btn-positive-action" v-bind="props" prepend-icon="mdi-tune" append-icon="mdi-information" >
                    <p class="mx-4">
                        Visualização
                    </p>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in viewItems" :key="index">
                    <v-list-item-title @click="setViewType(item.viewType)">
                        <v-btn variant="plain">
                            <v-icon v-if="item.recomendation" color="yellow" icon="mdi-star"></v-icon>
                            &nbsp;
                            {{ item.title }}

                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-row>
    <KanbanBoard v-if="viewType === 'kanban'" />
    <TaskListView v-if="viewType === 'list'" />
</template>

<script>
import KanbanBoard from './KanbanBoard.vue';
import TaskListView from './TaskListView.vue';

import * as md from '@mdi/js';

export default {
    name: 'Task',
    data() {
        return {
            viewItems: [
                {
                    title: 'Kanban',
                    icon: 'mdiViewDashboard',
                    viewType: 'kanban',
                    recomendation: true,
                },
                {
                    title: 'Lista',
                    icon: 'mdiViewList',
                    viewType: 'list',
                    recomendation: false,
                }
            ],
            viewType: 'list',
            pathViewIcon: md.mdiTune,
        }
    },
    methods: {
        setViewType(viewType) {
            this.viewType = viewType;
        }
    },
    components: {
        KanbanBoard,
        TaskListView
    }
}
</script>

<style scoped></style>
