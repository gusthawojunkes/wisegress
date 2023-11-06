<template>
    <v-container class="w-75">
        <pro-calendar ref="calendar" :events="evts" :config="cfg" view="month" />
    </v-container>
</template>

<script>
export default {
    name: "Calendar",
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
            evts: this.getTasksFormated(),
        }
    },
    methods: {
        getTasksFormated() {
            return this.getTasks().map((task) => {
                return {
                    date: this.getDateFormated(task.doneDate),
                    comment: '',
                    id: task.id,
                    keywords: '',
                    name: task.description,
                }
            })
        },
        getDateFormated(timestamp) {
            const date = new Date(timestamp)
            return date.toISOString()
        },
        getTasks() { // GET, TODO substituir pela API
            return [
                {
                    uuid: '1',
                    description: 'Tarefa 1',
                    priority: 'Alta',
                    done: false,
                    situation: 'pending',
                    doneDate: 1699295658538
                },
                {
                    uuid: '2',
                    description: 'Tarefa 2',
                    priority: 'Média',
                    done: false,
                    situation: 'in_progress',
                    doneDate: 1699295658538
                },
                {
                    uuid: '3',
                    description: 'Tarefa 3',
                    priority: 'Baixa',
                    done: true,
                    situation: 'done',
                    doneDate: 1699295658538
                }
            ]
        },
    },
}
</script>