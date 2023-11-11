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
                <v-btn
                    class="w-50 btn-positive-action"
                    size="large"
                    :text="timeStopped ? `Começar` : `Parar`"
                    @click="switchTime()"
                ></v-btn>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-restart-alt" @click="restart()"></v-btn>
            </v-row>
        </v-col>
        <v-col cols="8" class="ml-12">
            <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList"  type-list="todo"/>
        </v-col>
    </v-container>
</template>

<script>
import List from '@/components/List.vue';
import UserService from "@/services/user.service";
import Time from "@/helpers/Time";
import TodoService from "@/services/todo.service";
export default {
    name: 'Pomodoro',
    data() {
        return {
            time: 1500,
            timeFocus: 1500,
            shortBreakTime: 300,
            longBreakTime: 900,
            timeStopped: true,
            isBreak: false,
            numberBreakTime: 0,
            numberShortStops: 2,
            numberForLongStop: 3,
            previewMode: 'task',
            tasks: []
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
        async getTasks() {
            return TodoService.findAll();
        },
        updateList() {
            this.tasks = this.getTasks();
        },
        restart() {
          this.timeStopped = true;
          this.time = this.timeFocus;
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
    async mounted() {
        setInterval(this.updateTime, 1000);
        this.tasks = await this.getTasks();
        const { duration, shortbreakDuration, longbreakDuration } = UserService.getPomodoroConfiguration();
        this.time = Time.minutesToSeconds(duration);
        this.timeFocus = Time.minutesToSeconds(duration);
        this.shortBreakTime = Time.minutesToSeconds(shortbreakDuration);
        this.longBreakTime = Time.minutesToSeconds(longbreakDuration);
    },
    components: {
        List,
    },
};
</script>

<style scoped>
.col-switch {
    display: flex;
    justify-content: center;
}
</style>
