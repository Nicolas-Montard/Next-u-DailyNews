<script setup>
import { ref } from 'vue';

defineProps({
  articles: Array
})

const favorites = ref([]);

const emit = defineEmits(['update-favorites']);

if (localStorage.getItem('favorites')) {
  try {
    favorites.value = JSON.parse(localStorage.getItem('favorites'));
  } catch (e) {
    console.error(e);
    favorites.value = [];
  }
} else {
  favorites.value = [];
}

const changeStatusFavorites = (news) => {
  let tempFavorites = favorites.value
  if (!tempFavorites.some(fav => fav.title === news.title)) {
    tempFavorites.push(news);
  } else {
    tempFavorites = tempFavorites.filter(fav => fav.title !== news.title);
  }
  localStorage.setItem('favorites', JSON.stringify(tempFavorites));
  favorites.value = tempFavorites
  emit('update-favorites', tempFavorites);
}

const isFavorite = (news) => {
  return favorites.value.some(fav => fav.title === news.title);
};
</script>

<template>
  <div class="articles">
    <div v-for="article in articles" :key="article.link" class="card">
      <img :src="article.image" alt="Image de l'article" class="card-img">
      <div class="card-content">
        <div class="text-container">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </div>
        <div class="button-container">
          <a :href="article.link" target="_blank">Lire l'article</a>
          <button @click="changeStatusFavorites(article)" v-if="!isFavorite(article)">
            Ajouter aux préférences
          </button>
          <button @click="changeStatusFavorites(article)" v-else>
            Enlever des préférences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.card {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 10px;

}

.card-content .text-container {
  overflow: hidden;
  height: 210px;
}

.card-content h2 {
  font-size: 1.1em;
  line-height: 1.4;
  margin-bottom: 7.5px;
}

.card-content p {
  font-size: 0.9em;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button-container a, .button-container button {
  text-decoration: none;
  background: #73a0fa;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
