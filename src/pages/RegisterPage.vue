<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

const registerUser = async () => {
  message.value = ''
  error.value = ''

  try {
    loading.value = true

    const response = await api.post('/users/register', {
      email: email.value,
      password: password.value,
    })

    message.value = 'Registration successful!'

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container min-vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" style="width: 400px">
      <h2 class="text-center mb-4">Create Account</h2>

      <form @submit.prevent="registerUser">
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

        <p v-if="message" class="text-success">{{ message }}</p>
        <p v-if="error" class="text-danger">{{ error }}</p>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-3 mb-0">
        Already have an account?
        <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
