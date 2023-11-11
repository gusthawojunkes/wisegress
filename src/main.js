import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import './assets/main.css'
import axios from "axios";

import { ProCalendar } from "vue-pro-calendar";

const vuetify = createVuetify({
    components,
    directives,
})

axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(ProCalendar);

app.mount('#app')
