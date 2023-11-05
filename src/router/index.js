import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ProfileRegister from '../views/ProfileRegister.vue'
import TaskListView from '../views/TaskListView.vue'
import Pomodoro from '../views/Pomodoro.vue'
import KanbanBoard from '../views/KanbanBoard.vue'
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
      name: 'TaskListView',
      component: TaskListView,
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
    {
      path: '/kanban',
      name: 'KanbanBoard',
      component: KanbanBoard,
      icon: 'mdiDeveloperBoard',
      meta: {
        showSidebar: true
      }
    }
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
