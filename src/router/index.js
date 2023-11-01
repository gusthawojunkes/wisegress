import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ProfileRegister from '../views/ProfileRegister.vue'
import TodoListView from '../views/TodoListView.vue'
import Pomodoro from '../views/Pomodoro.vue'
import UserService from "@/services/user.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      icon: 'mdiHome',
      meta: {
        showSidebar: false
      }
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register,
      icon: 'mdiAccountCircle',
      meta: {
        showSidebar: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      icon: 'mdiLogin',
      meta: {
        showSidebar: false
      }
    },
    {
      path: '/cadastro-perfil',
      name: 'ProfileRegister',
      component: ProfileRegister,
      icon: 'mdiAccountFileText',
      meta: {
        showSidebar: false
      }
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: TodoListView,
      icon: 'mdiListBoxOutline',
      meta: {
        showSidebar: true
      }
    },
    {
      path: '/pomodoro',
      name: 'Pomodoro',
      component: Pomodoro,
      icon: 'mdiClockOutline',
      meta: {
        showSidebar: true
      }
    },
    // {
    //   path: '/objetivos',
    //   name: 'Goal',
    //   component: Goal,
    //   icon: 'mdiFlagCheckered',
    // meta: {
    //   showSidebar: true
    // }
    // },
    // {
    //   path: '/agenda',
    //   name: 'Agenda',
    //   component: Schedule,
    //   icon: 'mdiCalendarMonth',
    // meta: {
    //   showSidebar: true
    // }
    // },
    // {
    //   path: 'kanban',
    //   name: 'Kanban',
    //   component: Kanban,
    //   icon: 'mdiDeveloperBoard',
    // meta: {
    //   showSidebar: true
    // }
    // }
  ]
})

const isAuthenticated = UserService.isAuthenticated();
const publicRoutes = ['Welcome', 'Register', 'Login']
// GOOD
router.beforeEach((to, from, next) => {
  if (!publicRoutes.includes(to.name) && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
