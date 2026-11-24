<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const movies = ref([])
const loading = ref(false)
const error = ref('')

const isLoggedIn = !!localStorage.getItem('user')

const getMovies = async () => {
    try {
        loading.value = true

        const response = await api.get('/movies/getMovies')

        console.log('Movies response:', response.data)

        const result = response.data

        movies.value = Array.isArray(result)
            ? result
            : result.movies || result.data || []

    } catch (err) {
        error.value = 'Failed to load movies.'
        console.log(err)
    } finally {
        loading.value = false
    }
}

const viewMovie = (id) => {
    router.push(`/movies/${id}`)
}

onMounted(() => {
    getMovies()
})
</script>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Movie Catalog</h1>

            <div>
                <RouterLink to="/login" class="btn btn-outline-primary me-2">
                    Login
                </RouterLink>

                <RouterLink to="/register" class="btn btn-primary">
                    Register
                </RouterLink>
            </div>
        </div>

        <div v-if="loading" class="text-center">
            <p>Loading movies...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger">
            {{ error }}
            <button class="btn btn-sm btn-outline-danger ms-2" @click="getMovies">
                Retry
            </button>
        </div>

        <div v-else-if="movies.length === 0" class="alert alert-info">
            No movies available.
        </div>

        <div v-else class="row g-4">
            <div
                v-for="movie in movies"
                :key="movie._id || movie.id"
                class="col-12 col-md-6 col-lg-4"
            >
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.title }}</h5>

                        <p class="card-text">
                            <strong>Director:</strong> {{ movie.director }}
                        </p>

                        <p class="card-text">
                            <strong>Year:</strong> {{ movie.year }}
                        </p>

                        <p class="card-text">
                            <strong>Genre:</strong> {{ movie.genre }}
                        </p>

                        <p class="card-text">
                            {{ movie.description }}
                        </p>

                        <button
                            v-if="isLoggedIn"
                            class="btn btn-primary"
                            @click="viewMovie(movie._id || movie.id)"
                        >
                            View Movie
                        </button>

                        <p v-else class="text-muted">
                            Login to view movie details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
