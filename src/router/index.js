import { createRouter, createWebHistory } from 'vue-router'

import RegisterPage from '../pages/RegisterPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import MoviesPage from '../pages/MoviesPage.vue'
import MovieDetailsPage from '../pages/MovieDetailsPage.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AddMoviePage from '../pages/AddMoviePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/movies',
    component: MoviesPage,
  },
  {
    path: '/movies/:id',
    component: MovieDetailsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: '/addMovie',
    component: AddMoviePage,
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  if (to.meta.requiresAdmin && user?.isAdmin !== true) {
    return '/login'
  }

  return true
})

export default router
