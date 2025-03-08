<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const title = ref('')
const link = ref('')
const error = ref('')
const feedId = ref(null)

onMounted(() => {
  const feeds = JSON.parse(localStorage.getItem('feeds')) || []
  const feed = feeds.find((f) => f.id == route.params.id)

  if (!feed) {
    error.value = 'Flux non trouvé.'
    return
  }

  feedId.value = feed.id
  title.value = feed.title
  link.value = feed.link
})

const updateFeed = () => {
  let feeds = JSON.parse(localStorage.getItem('feeds')) || []
  feeds = feeds.map((f) =>
    f.id === feedId.value ? { ...f, title: title.value, link: link.value } : f,
  )
  localStorage.setItem('feeds', JSON.stringify(feeds))

  router.push('/')
}
</script>

<template>
  <div>
    <h1>Modifier le flux RSS</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form v-if="!error" @submit.prevent="updateFeed">
      <input type="text" v-model="title" placeholder="Nom du flux" required />
      <input type="url" v-model="link" placeholder="Lien du flux" required />
      <div class="button-container">
        <button type="submit">Mettre à jour</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 10px;
}
.error {
  color: red;
  margin-bottom: 10px;
}
input {
  display: block;
  margin-bottom: 15px;
  border-radius: 10px;
  width: 100%;
}
button {
  border-radius: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
}
</style>
