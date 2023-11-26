<template>
  <v-container>
    <Feedback :isHovering="isHovering" :feature="feature" @feedbackAdded="feedbackAdded" />
    <v-col class="text-center d-flex flex-column justify-start" style="width: 75vh; height: 40vh;">
      <v-row class="d-flex align-center justify-center mb-6">
        <h1 class="text-h1">{{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}</h1>
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
        <v-spacer></v-spacer>
        <v-btn icon="mdi-refresh" @click="restart()"></v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import UserService from "@/services/user.service";
import Time from "@/helpers/Time";
import Feedback from "@/components/Feedback.vue";

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
      isHovering: false,
      feature: 'POMODORO',
      currentTime: 'focusTime'
    };
  },
  methods: {
    updateTime() {
      if (this.timeStopped) {
        Time.savePomodoroGlobalTime(this.time);
        return this.time;
      }

      if (this.time > 0) {
        this.time--;
        Time.savePomodoroGlobalTime(this.time);
        return this.time;
      } else {

        if (this.numberBreakTime === this.numberShortStops) {
          this.time = this.longBreakTime;
          Time.savePomodoroGlobalTime(this.time);
          this.switchTime()
          this.isBreak = true;

          this.setFeedBack(this.currentTime)
          this.currentTime = 'longTime'
          this.numberBreakTime = -1;

        } else if (this.currentTime == 'focusTime') {
          this.time = this.shortBreakTime;
          Time.savePomodoroGlobalTime(this.time);
          this.switchTime()
          this.isBreak = true;

          this.setFeedBack(this.currentTime)
          this.currentTime = 'lowTime'

        } else {
          this.time = this.timeFocus
          Time.savePomodoroGlobalTime(this.time);
          this.switchTime()
          this.isBreak = false;

          this.setFeedBack(this.currentTime)
          this.currentTime = 'focusTime'
          this.numberBreakTime++;
        }
      }
    },
    switchTime() {
      this.timeStopped = !this.timeStopped;
    },
    restart() {
      this.timeStopped = true;
      this.time = this.timeFocus;
    },
    feedbackAdded() {
      this.isHovering = false;
    },
    setFeedBack(timeType) {
      let focusGlobalTime = Time.getFocusGlobalTime()
      let lowBreakGlobalTime = Time.getLowBreakGlobalTime()

      if ((focusGlobalTime == 3) && (lowBreakGlobalTime == 2)) {
        this.isHovering = true;

        Time.saveFocusGlobalTime(0)
        Time.saveLowBreakGlobalTime(0)
      } else {
        if (timeType == 'focusTime') {
          focusGlobalTime = focusGlobalTime + 1
          Time.saveFocusGlobalTime(focusGlobalTime)
        }
        if (timeType == 'lowTime') {
          lowBreakGlobalTime = lowBreakGlobalTime + 1
          Time.saveLowBreakGlobalTime(lowBreakGlobalTime)
        }
        this.isHovering = false;
      }
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
    // this.time = Time.getPomodoroActualTime();
    setInterval(this.updateTime, 1000);
    const { duration, shortbreakDuration, longbreakDuration } = UserService.getPomodoroConfiguration();
    if (!this.time) {
      this.time = Time.minutesToSeconds(duration);
    }

    this.timeFocus = Time.minutesToSeconds(duration);
    this.shortBreakTime = Time.minutesToSeconds(shortbreakDuration);
    this.longBreakTime = Time.minutesToSeconds(longbreakDuration);
  },

  beforeUnmount() {
    if (!this.timeStopped) {
      Time.saveUnmountTimestamp();
    }
    Time.savePomodoroGlobalTime(this.time);
  },

  components: {
    Feedback
  }
};
</script>

<style scoped>
.col-switch {
  display: flex;
  justify-content: center;
}
</style>
