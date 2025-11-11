import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import ClientesView from '../views/ClientesView.vue'
import auth from '../services/auth' // Para proteger rutas

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView, // 🔹 Layout principal del dashboard
    meta: { requiresAuth: true }, // 🔐 Protegido por autenticación
    children: [
      {
        path: '', // /dashboard
        name: 'dashboard',
        component: ProductView
      },
      {
        path: 'productos', // /dashboard/productos
        name: 'productos',
        component: ProductView
      },
      {
        path: 'clientes', // ✅ Nueva ruta activa
        name: 'clientes',
        component: ClientesView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 Guardia de autenticación global
router.beforeEach((to, from, next) => {
  const loggedIn = auth.isAuthenticated()

  if (to.meta.requiresAuth && !loggedIn) {
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
