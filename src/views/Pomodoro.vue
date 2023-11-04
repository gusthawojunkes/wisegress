<template>
    <v-container class="h-screen d-flex align-center w-50">
        <v-col cols="4" class="text-center">
            <v-row class="d-flex align-center justify-center mb-6">
                <h1 class="text-h1">{{ minutes }}:{{ seconds }}</h1>
            </v-row>
            <v-row class="d-flex align-center justify-center">
                <v-col>Foco</v-col>
                <v-col>
                    <v-switch class="col-switch" :model-value="isBreak" hide-details color="#F8F4C4"></v-switch>
                </v-col>
                <v-col>Pausa</v-col>
            </v-row>
            <v-row class=" d-flex align-center justify-center mt-6">
                <v-btn class="w-50 btn-positive-action" size="large" :text="timeStopped ? `Começar` : `Parar`"
                    @click="switchTime()"></v-btn>
            </v-row>
        </v-col>
        <v-col cols="8" class="ml-12">
            <TaskList :previewMode="previewMode" :tasks="tasks" @updateTaskList="updateTaskList" />
        </v-col>
    </v-container>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
export default {
    name: 'Pomodoro',
    data() {
        return {
            time: 1500,
            timeFocus: 1500, // Tempo em segundos (25 minutos)
            shortBreakTime: 300, // Tempo em segundos (5 minutos)
            longBreakTime: 900, // Tempo em segundos (15 minutos)
            timeStopped: true,
            isBreak: false,
            numberBreakTime: 0,
            numberShortStops: 2,
            numberForLongStop: 3,
            previewMode: 'taskList',
            tasks: this.getTasks()
        };
    },
    methods: {
        updateTime() {
            if (this.timeStopped) return this.time;

            if (this.time > 0) {
                return this.time--;
            } else {
                this.numberBreakTime++;

                if (this.numberBreakTime <= this.numberShortStops) {
                    this.time = this.shortBreakTime;
                    this.switchTime()
                    this.isBreak = true;

                } else if (this.numberBreakTime == this.numberForLongStop) {
                    this.time = this.longBreakTime;
                    this.switchTime()
                    this.isBreak = true;

                } else if (this.numberBreakTime > this.numberForLongStop) {
                    this.time = this.timeFocus
                    this.numberBreakTime = 0;
                    this.switchTime()
                    this.isBreak = false;
                }
            }
        },
        switchTime() {
            this.timeStopped = !this.timeStopped;
        },
        getTasks() {
            return [
                {
                    uuid: '1',
                    description: 'Tarefa 1',
                    priority: 'Alta',
                    done: false
                },
                {
                    uuid: '2',
                    description: 'Tarefa 2',
                    priority: 'Média',
                    done: false
                },
                {
                    uuid: '3',
                    description: 'Tarefa 3',
                    priority: 'Baixa',
                    done: true
                }
            ]
        },
        updateTaskList() {
            this.tasks = this.getTasks() // GET
        }
    },
    computed: {
        minutes() {
            return Math.floor(this.time / 60);
        },
        seconds() {
            return this.time % 60;
        },
    },
    mounted() {
        setInterval(this.updateTime, 1000);
    },
    components: {
        TaskList,
    },
};
</script>

<style scoped>
.col-switch {
    display: flex;
    justify-content: center;
}
</style>