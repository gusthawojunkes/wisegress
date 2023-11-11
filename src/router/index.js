import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ProfileRegister from '@/views/ProfileRegister.vue'
import Task from '@/views/Task.vue'
import Pomodoro from '@/views/Pomodoro.vue'
import KanbanBoard from '@/views/KanbanBoard.vue'
import Dashboard from "@/views/Dashboard.vue";
import UserService from "@/services/user.service";
import Calendar from "@/views/Calendar.vue";
import TodoListView from "@/views/TodoListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      icon: 'mdiHome',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register,
      icon: 'mdiAccountCircle',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      icon: 'mdiLogin',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      icon: 'mdiDashboard',
      meta: {
        showSidebar: true,
        hideFixedTodos: true
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
      path: '/tasks',
      name: 'Task',
      component: Task,
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
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Calendar,
      icon: 'mdiCalendarMonth',
      meta: {
        showSidebar: true
      }
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoListView,
      icon: 'mdiFlagCheckered',
      meta: {
        showSidebar: true,
        hideFixedTodos: true
      }
    },
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
