<script setup>
import Articles from '@/components/Articles.vue'
import router from '@/router'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const feed = ref(null)
const articles = ref([])
const limit = ref(10)

onMounted(async () => {
  const feeds = JSON.parse(localStorage.getItem('feeds'))
  feed.value = feeds.find((f) => f.id == route.params.id)

  if (!feed.value){
    router.push('/notfound')
  }

  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(feed.value.link)}`,
  )
  const data = await response.json()
  const text = data.contents
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')

  articles.value = Array.from(xml.querySelectorAll('item')).map((item) => ({
    title: item.querySelector('title')?.textContent || 'Sans titre',
    link: item.querySelector('link')?.textContent || '#',
    description: item.querySelector('description')?.textContent || 'Aucune description',
    image:
      item.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url') ||
      item.querySelector('media\\:content, content')?.getAttribute('url')
  }))
})

const limitedArticles = computed(() => {
  if (limit.value == 'all') {
    return articles.value
  } else {
    return articles.value.slice(0, parseInt(limit.value))
  }
})
</script>

<template>
  <div v-if="feed">
    <h1 class="title">Articles de {{ feed.title }}</h1>

    <div class="number-selector">
      <label for="limit"></label>
      <select v-model="limit">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">Tout</option>
      </select>
    </div>
    <Articles :articles="limitedArticles" />
  </div>

  <div v-else>
    <p>Flux introuvable.</p>
  </div>
</template>

<style scoped>
.number-selector {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
}
h1 {
  text-align: center;
}
</style>
