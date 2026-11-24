<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const movie = ref({})
const comments = ref([])
const newComment = ref('')
const error = ref('')
const loading = ref(false)

const getMovie = async () => {
  try {
    loading.value = true

    const response = await api.get(`/movies/getMovie/${route.params.id}`)

    console.log('Movie details:', response.data)

    movie.value = response.data.movie || response.data

    // Get comments directly from the movie details
    comments.value = movie.value.comments || []
  } catch (err) {
    error.value = 'Failed to load movie details.'
    console.log(err)
  } finally {
    loading.value = false
  }
}

const getComments = async () => {
  try {
    const response = await api.get(`/movies/getComments/${route.params.id}`)

    console.log('Comments:', response.data)

    const result = response.data

    comments.value = Array.isArray(result) ? result : result.comments || result.data || []
  } catch (err) {
    console.log('Failed to load comments:', err)
  }
}

const addComment = async () => {
  if (!newComment.value.trim()) return

  try {
    await api.post(`/movies/addComment/${route.params.id}`, {
      comment: newComment.value,
    })

    newComment.value = ''

    // Reload movie details, including its comments
    await getMovie()

    alert('Comment added successfully!')
  } catch (err) {
    alert('Failed to add comment.')
    console.log(err)
  }
}

onMounted(() => {
  getMovie()
})
</script>

<template>
  <div class="container py-4">
    <button class="btn btn-secondary mb-4" @click="router.push('/movies')">Back to Movies</button>

    <div v-if="loading">Loading movie details...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="card shadow p-4">
      <h2>{{ movie.title }}</h2>

      <hr />

      <p><strong>Director:</strong> {{ movie.director }}</p>
      <p><strong>Year:</strong> {{ movie.year }}</p>
      <p><strong>Genre:</strong> {{ movie.genre }}</p>
      <p><strong>Description:</strong> {{ movie.description }}</p>

      <hr />

      <h4>Comments</h4>

      <div v-if="comments.length === 0">No comments yet.</div>

      <div
        v-for="(comment, index) in comments"
        :key="comment._id || index"
        class="border rounded p-2 mb-2"
      >
        {{ comment.comment || comment }}
      </div>

      <div v-if="localStorage"></div>

      <form class="mt-3" @submit.prevent="addComment">
        <label class="form-label">Add a Comment</label>

        <textarea
          v-model="newComment"
          class="form-control mb-2"
          rows="3"
          placeholder="Write your comment..."
          required
        ></textarea>

        <button id="addComment" class="btn btn-primary" type="submit">Submit Comment</button>
      </form>
    </div>
  </div>
</template>
