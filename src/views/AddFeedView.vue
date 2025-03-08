<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const link = ref('')

const saveFeed = () => {
  const feeds = JSON.parse(localStorage.getItem('feeds')) || []
  feeds.push({ id: Date.now(), title: title.value, link: link.value })
  localStorage.setItem('feeds', JSON.stringify(feeds))

  router.push('/')
}
</script>

<template>
  <div>
    <h1>Ajouter un flux RSS</h1>
    <form @submit.prevent="saveFeed">
      <input type="text" v-model="title" placeholder="Nom du flux" required />
      <input type="url" v-model="link" placeholder="Lien du flux" required />
      <div class="button-container">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
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
