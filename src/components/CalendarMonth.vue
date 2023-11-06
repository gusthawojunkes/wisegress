<template>
    <div class="text-center section w-100">
        <v-calendar class="custom-calendar" locale="pt-BR" :view="view" :masks="masks" :attributes="attributes" expanded>
            <template v-slot:day-content="{ day, attributes }">
                <div class="h-100 pa-1 border" style="min-height: 12vh">
                    <div class="h-100" @dragover.prevent @drop="dragEnd($event, day)">
                        <a>{{ day.day }}</a>
                        <v-card class="task mb-1" v-for="(attr, a) in attributes" :key="attr.key" draggable="true"
                            @dragstart="dragStart($event, this.tasks[a])">
                            {{ attr.customData.title }}
                        </v-card>
                    </div>
                </div>
            </template>
        </v-calendar>
    </div>
</template>
  
<script>
export default {
    name: 'CalendarMonth',
    props: {
        tasks: {
            type: Array,
            required: true,
            default: () => [],
        },
        view: {
            type: String,
            required: true,
            default: 'monthly',
        },
        masks: {
            type: Object,
            required: true,
            default: () => ({}),
        }
    },
    data() {
        return {
            attributes: this.getTasksForCalendar(this.tasks),
        }
    },
    methods: {
        dragStart(event, task) {
            event.dataTransfer.setData('taskCalendar', JSON.stringify(task))
        },
        dragEnd(event, day) {
            event.preventDefault();
            const task = event.dataTransfer.getData("taskCalendar");
            this.changeTaskData(task, day)
        },
        changeTaskData(task, day) {
            task = JSON.parse(task)
            const index = this.attributes.findIndex((attr) => attr.key == task.uuid)
            console.log(index)
            this.attributes[index].dates = new Date(day.id);
        },

        getTasksForCalendar(tasks) {
            return tasks.map((task) => {
                return {
                    key: task.uuid,
                    customData: {
                        title: task.description,
                        class: 'mb-1',
                    },
                    dates: task.doneDate,
                };
            })
        }
    },
}
</script>
  
<style scoped>
.task {
    background-color: #47667B;
    color: white;
}
</style>

<!-- <template>
    <v-container class="h-screen d-flex align-center">
        <v-col>
            <v-row class="d-flex justify-center">
                <ButtonToggle :options="optionsCalendar" />
                <div class="text-center section">
                    <v-calendar class="custom-calendar max-w-full" locale="pt-BR" :view="view" :masks="masks"
                        :attributes="attributes" disable-page-swipe expanded>
                        <template v-slot:day-content="{ day, attributes }">
                            <div class="flex flex-col h-full z-10 overflow-hidden">
                                <span class="day-label text-sm">{{ day.day }}</span>
                                <div class="flex-grow overflow-y-auto overflow-x-auto">
                                    <p v-for="attr in attributes" :key="attr.key"
                                        class="text-xs leading-tight rounded-sm p-1 ma-4" :class="attr.customData.class">
                                        {{ attr.customData.title }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </v-calendar>
                </div>
            </v-row>
        </v-col>
    </v-container>
</template>
  
<script>
import ButtonToggle from '@/components/ButtonToggle.vue';

export default {
    name: 'Calendar',
    components: {
        ButtonToggle,
    },
    data() {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        return {
            optionsCalendar: [
                {
                    id: 'monthly',
                    name: 'Mês',
                },
                {
                    id: 'weekly',
                    name: 'Semana',
                },
                {
                    id: 'daily',
                    name: 'Dia',
                },
            ],
            view: 'monthly',
            masks: {
                weekdays: 'WWW',
            },
            attributes: [
                {
                    key: 1,
                    customData: {
                        title: 'Lunch with mom.',
                    },
                    dates: new Date(year, month, 1),
                },
                {
                    key: 2,
                    customData: {
                        title: 'Take Noah to basketball practice',
                    },
                    dates: new Date(year, month, 2),
                },
                {
                    key: 3,
                    customData: {
                        title: "Noah's basketball game.",
                    },
                    dates: new Date(year, month, 5),
                },
                {
                    key: 4,
                    customData: {
                        title: 'Take car to the shop',
                    },
                    dates: new Date(year, month, 5),
                },
                {
                    key: 4,
                    customData: {
                        title: 'Meeting with new client.',
                    },
                    dates: new Date(year, month, 7),
                },
                {
                    key: 5,
                    customData: {
                        title: "Mia's gymnastics practice.",
                    },
                    dates: new Date(year, month, 11),
                },
                {
                    key: 6,
                    customData: {
                        title: 'Cookout with friends.',
                    },
                    dates: { months: 5, ordinalWeekdays: { 2: 1 } },
                },
                {
                    key: 7,
                    customData: {
                        title: "Mia's gymnastics recital.",
                    },
                    dates: new Date(year, month, 22),
                },
                {
                    key: 8,
                    customData: {
                        title: 'Visit great grandma.',
                    },
                    dates: new Date(year, month, 25),
                },
            ],
        };
    },
};
</script>
   -->


   <!-- <template>
    <v-container class="h-screen d-flex align-center">
        <v-col class="w-50">
            <v-row class="d-flex justify-center">
                <ButtonToggle :options="viewCalendar" :selected="selectedView()" />
                <CalendarDay v-if="viewCalendarSelected == 'daily'" />
                <CalendarMonth v-else :tasks="tasks" :view="viewCalendarSelected" :masks="masks" />
            </v-row>
        </v-col>
    </v-container>
</template>
  
<script>
import ButtonToggle from '@/components/ButtonToggle.vue';
import CalendarMonth from '@/components/CalendarMonth.vue';
import CalendarDay from '@/components/CalendarDay.vue';

export default {
    name: 'Calendar',
    data() {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        return {
            viewCalendar: [
                {
                    id: 'monthly',
                    name: 'Mês',
                },
                {
                    id: 'weekly',
                    name: 'Semana',
                },
                {
                    id: 'daily',
                    name: 'Dia',
                },
            ],
            viewCalendarSelected: 'monthly',
            masks: {
                weekdays: 'WWW',
            },
            tasks: [
                {
                    key: 1,
                    customData: {
                        title: 'Lunch with mom.',
                    },
                    dates: new Date(year, month, 1),
                },
                {
                    key: 2,
                    customData: {
                        title: 'Take Noah to basketball practice',
                    },
                    dates: new Date(year, month, 2),
                },
                {
                    key: 3,
                    customData: {
                        title: "Noah's basketball game.",
                    },
                    dates: new Date(year, month, 5),
                },
                {
                    key: 4,
                    customData: {
                        title: 'Take car to the shop',
                    },
                    dates: new Date(year, month, 5),
                },
                {
                    key: 4,
                    customData: {
                        title: 'Meeting with new client.',
                    },
                    dates: new Date(year, month, 7),
                },
                {
                    key: 5,
                    customData: {
                        title: "Mia's gymnastics practice.",
                    },
                    dates: new Date(year, month, 11),
                },
                {
                    key: 6,
                    customData: {
                        title: 'Cookout with friends.',
                    },
                    dates: { months: 5, ordinalWeekdays: { 2: 1 } },
                },
                {
                    key: 7,
                    customData: {
                        title: "Mia's gymnastics recital.",
                    },
                    dates: new Date(year, month, 22),
                },
                {
                    key: 8,
                    customData: {
                        title: 'Visit great grandma.',
                    },
                    dates: new Date(year, month, 25),
                },
            ],
        };
    },
    methods: {
        selectedView(viewCalendar) {
            this.viewCalendarSelected = viewCalendar;
        },
    },
    components: {
        CalendarMonth,
        CalendarDay,
        ButtonToggle
    },
};
</script>
   -->