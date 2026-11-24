<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const loginUser = async () => {
  error.value = ''

  try {
    loading.value = true

    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value,
    })

    // Save the token
    localStorage.setItem('token', response.data.access)

    // Save the user's information and role
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Redirect based on the actual user role
    if (response.data.user.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/movies')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container min-vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" style="width: 400px">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <p v-if="error" class="text-danger">{{ error }}</p>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-3 mb-0">
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </div>
  </div>
</template>
