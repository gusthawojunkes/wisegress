import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ProfileRegister from '../views/ProfileRegister.vue'
import TodoListView from '../views/TodoListView.vue'
import Pomodoro from '../views/Pomodoro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      icon: 'mdiHome'
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register,
      icon: 'mdiAccountCircle'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      icon: 'mdiLogin'
    },
    {
      path: '/cadastro-perfil',
      name: 'ProfileRegister',
      component: ProfileRegister,
      icon: 'mdiAccountFileText'
    },
    {
      path: '/lista-tarefas',
      name: 'TodoList',
      component: TodoListView,
      icon: 'mdiListBoxOutline'
    },
    {
      path: '/pomodoro',
      name: 'Pomodoro',
      component: Pomodoro,
      icon: 'mdiClockOutline'
    },
    // {
    //   path: 'kanban',
    //   name: 'Kanban',
    //   component: Kanban,
    //   icon: 'mdiDeveloperBoard'
    // }
  ]
})

export default router
