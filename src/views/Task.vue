<template>
    <v-row class="d-flex justify-end mx-12 mt-12">
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn class="btn-positive-action" v-bind="props">
                    <svg-icon type="mdi" :path="pathViewIcon"></svg-icon>
                    <p class="mx-4">
                        Visualização
                    </p>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in viewItems" :key="index">
                    <v-list-item-title @click="setViewType(item.viewType)">
                        <v-btn variant="plain">
                            {{ item.title }}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-row>
    <KanbanBoard v-if="viewType == 'kanban'" />
    <TaskListView v-if="viewType == 'list'" />
</template>
  
<script>
import KanbanBoard from './KanbanBoard.vue';
import TaskListView from './TaskListView.vue';

import SvgIcon from '@jamescoyle/vue-icon';
import * as md from '@mdi/js';

export default {
    name: 'Task',
    data() {
        return {
            viewItems: [
                {
                    title: 'Kanban',
                    icon: 'mdiViewDashboard',
                    viewType: 'kanban'
                },
                {
                    title: 'Lista',
                    icon: 'mdiViewList',
                    viewType: 'list'
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
        TaskListView,
        SvgIcon
    }
}
</script>
  
<style scoped></style>