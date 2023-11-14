import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ProfileRegister from '@/views/ProfileRegister.vue'
import Task from '@/views/Task.vue'
import KanbanBoard from '@/views/KanbanBoard.vue'
import Dashboard from "@/views/Dashboard.vue";
import UserService from "@/services/user.service";
import Calendar from "@/views/Calendar.vue";
import TodoListView from "@/views/TodoListView.vue";
import Configuration from "@/views/Configuration.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      icon: 'mdi-home',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register,
      icon: 'mdi-account-circle',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      icon: 'mdi-login',
      meta: {
        showSidebar: false,
        hideFixedTodos: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      icon: 'mdi-dashboard',
      meta: {
        showSidebar: true,
        hideFixedTodos: true
      }
    },
    {
      path: '/cadastro-perfil',
      name: 'ProfileRegister',
      component: ProfileRegister,
      icon: 'mdi-account-file-text',
      meta: {
        showSidebar: false
      }
    },
    {
      path: '/tasks',
      name: 'Task',
      component: Task,
      icon: 'mdi-list-box-outline',
      meta: {
        showSidebar: true
      }
    },
    {
      path: '/kanban',
      name: 'KanbanBoard',
      component: KanbanBoard,
      icon: 'mdi-developer-board',
      meta: {
        showSidebar: true
      }
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Calendar,
      icon: 'mdi-calendar-month',
      meta: {
        showSidebar: true
      }
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoListView,
      icon: 'mdi-flag-checkered',
      meta: {
        showSidebar: true,
        hideFixedTodos: true
      }
    },
    {
      path: "/configurations",
      name: "Configurações",
      component: Configuration,
      icon: "mdi-cog",
      meta: {
        showSidebar: true,
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
