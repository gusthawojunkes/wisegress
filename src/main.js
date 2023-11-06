import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'
import axios from "axios";

import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import { ProCalendar } from "vue-pro-calendar";
import "vue-pro-calendar/style";

const vuetify = createVuetify({
    components,
    directives,
})

axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.use(ProCalendar);

app.mount('#app')
