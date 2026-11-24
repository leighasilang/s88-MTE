<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const movies = ref([])
const loading = ref(false)
const error = ref('')

const editingMovie = ref(null)

const editForm = ref({
  title: '',
  director: '',
  year: '',
  genre: '',
  description: '',
})

const getMovies = async () => {
  try {
    loading.value = true

    const response = await api.get('/movies/getMovies')

    const result = response.data

    movies.value = Array.isArray(result) ? result : result.movies || result.data || []
  } catch (err) {
    error.value = 'Failed to load movies.'
    console.log(err)
  } finally {
    loading.value = false
  }
}

const updateMovie = (movie) => {
  editingMovie.value = movie._id || movie.id

  editForm.value = {
    title: movie.title,
    director: movie.director,
    year: movie.year,
    genre: movie.genre,
    description: movie.description,
  }
}

const saveMovie = async () => {
  try {
    await api.patch(`/movies/updateMovie/${editingMovie.value}`, {
      ...editForm.value,
      year: Number(editForm.value.year),
    })

    alert('Movie updated successfully!')

    editingMovie.value = null
    await getMovies()
  } catch (err) {
    alert('Failed to update movie.')
    console.log(err)
  }
}

const cancelUpdate = () => {
  editingMovie.value = null
}

const deleteMovie = async (id) => {
  if (!confirm('Are you sure you want to delete this movie?')) return

  try {
    await api.delete(`/movies/deleteMovie/${id}`)

    alert('Movie deleted successfully!')
    getMovies()
  } catch (err) {
    alert('Failed to delete movie.')
    console.log(err)
  }
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (user.isAdmin !== true) {
    router.push('/login')
  }

  getMovies()
})
</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Admin Dashboard</h1>

      <div>
        <button class="btn btn-primary me-2" @click="router.push('/addMovie')">+ Add Movie</button>

        <button class="btn btn-outline-danger" @click="logout">Logout</button>
      </div>
    </div>

    <h5 class="mb-3">Movie Management</h5>

    <div v-if="editingMovie" class="card shadow-sm p-4 mb-4">
      <h5 class="mb-3">Update Movie</h5>

      <form @submit.prevent="saveMovie">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input v-model="editForm.title" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Director</label>
          <input v-model="editForm.director" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Year</label>
          <input v-model="editForm.year" type="number" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Genre</label>
          <input v-model="editForm.genre" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            v-model="editForm.description"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary me-2">Save Changes</button>

        <button type="button" class="btn btn-secondary" @click="cancelUpdate">Cancel</button>
      </form>
    </div>

    <div v-if="loading" class="text-center">Loading movies...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="movie in movies" :key="movie._id || movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.director }}</td>
            <td>{{ movie.year }}</td>
            <td>{{ movie.genre }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="updateMovie(movie)">
                Update
              </button>

              <button class="btn btn-sm btn-danger" @click="deleteMovie(movie._id || movie.id)">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="movies.length === 0">
            <td colspan="5" class="text-center">No movies available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
