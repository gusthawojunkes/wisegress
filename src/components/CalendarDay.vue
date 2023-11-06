<template>
    <v-col>
        <div class=" d-flex flex-row">
            <v-chip color="#6D8B89" size="x-large" class="mb-4">{{ getFormatCurrentDay() }}</v-chip>
        </div>
        <v-card>
            <div v-for="hour in 96" :key="hour">
                <div>
                    <div v-if="hour % 4 === 0" class="d-flex flex-row align-center">
                        <p class="ma-2">{{ (getHour(hour)).toString().padStart(2, '0') }}:00</p>
                        <v-divider class="ma-2"></v-divider>
                    </div>
                    <div v-else>a</div>
                    <v-card class="mx-16">
                        {{ getDescriptionTask(hour) }}
                    </v-card>
                </div>
            </div>
        </v-card>
    </v-col>
</template>
  
<script>
// draggable="true" @dragstart="dragStart($event, this.tasks[a])" @dragover.prevent
//                     @drop="dragEnd($event, day)"
export default {
    name: 'CalendarDay',
    data() {
        return {
            tasks: this.getTasks(),
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
        getHour(hour) {
            return hour / 4;
        },
        getMinutes(hour) {
            return (hour % 4) * 15;
        },
        getCurrentDate() {
            return new Date();
        },
        getFormatCurrentDay() {
            const date = this.getCurrentDate()
            return `${date.getDate()} de ${date.toLocaleString('pt-BR', { month: 'long' })}`;
        },
        getTaskByDateAndHour(hour, minutes) {
            const date = this.getCurrentDate()
            const day = date.getDate();
            const mouth = date.getMonth();
            const year = date.getFullYear();
            // console.log(`${year}-${mouth}-${day} ${hour}:${minutes}`)
            const dateTask = new Date(year, mouth, day, hour, minutes);
            const timestamp = dateTask.getTime();

            const task = this.tasks.find(task => {
                return task.doneDate == timestamp;
            });

            console.log(task)

            return task;
        },
        getDescriptionTask(hour) {
            const task = this.getTaskByDateAndHour(this.getHour(hour), this.getMinutes(hour))
            if (task) {
                return task.description;
            }
        },
        getTasks() {
            const date = new Date(2023, 10, 6, 1, 0);
            const timestamp = date.getTime();
            return [
                {
                    uuid: '1',
                    description: 'Tarefa 1',
                    priority: 'Alta',
                    done: false,
                    doneDate: timestamp
                },
                {
                    uuid: '2',
                    description: 'Tarefa 2',
                    priority: 'Média',
                    done: false,
                    doneDate: timestamp
                },
                {
                    uuid: '3',
                    description: 'Tarefa 3',
                    priority: 'Baixa',
                    done: true,
                    doneDate: timestamp
                }
            ]
        },
    },
}
</script>
  
<style scoped></style>