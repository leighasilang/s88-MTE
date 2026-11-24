<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const title = ref('')
const director = ref('')
const year = ref('')
const description = ref('')
const genre = ref('')
const error = ref('')
const loading = ref(false)

const addMovie = async () => {
  error.value = ''

  try {
    loading.value = true

    await api.post('/movies/addMovie', {
      title: title.value,
      director: director.value,
      year: Number(year.value),
      description: description.value,
      genre: genre.value,
    })

    alert('Movie added successfully!')

    router.push('/admin')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add movie.'
    console.log(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (user.isAdmin !== true) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="container py-4">
    <div class="card shadow p-4 mx-auto" style="max-width: 600px">
      <h2 class="mb-4">Add New Movie</h2>

      <form @submit.prevent="addMovie">
        <div class="mb-3">
          <label class="form-label">Movie Title</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="Enter movie title"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Director</label>
          <input
            v-model="director"
            type="text"
            class="form-control"
            placeholder="Enter director"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Year</label>
          <input
            v-model="year"
            type="number"
            class="form-control"
            placeholder="Enter release year"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            v-model="description"
            class="form-control"
            rows="4"
            placeholder="Enter movie description"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Genre</label>
          <input
            v-model="genre"
            type="text"
            class="form-control"
            placeholder="Enter genre"
            required
          />
        </div>

        <p v-if="error" class="text-danger">{{ error }}</p>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary flex-grow-1" :disabled="loading">
            {{ loading ? 'Adding...' : 'Add Movie' }}
          </button>

          <button type="button" class="btn btn-secondary" @click="router.push('/admin')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
