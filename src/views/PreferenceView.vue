<script setup>
import Articles from '@/components/Articles.vue'
import { ref, computed } from 'vue';

const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const searchQuery = ref('');

const filteredFavorites = computed(() => {
  if (searchQuery.value == '') {
    return favorites.value
  }
  return favorites.value.filter(article =>
    article.title.includes(searchQuery.value) ||
    article.description.includes(searchQuery.value)
  );
});

const updateFavorites = (tempFavorites) => {
  favorites.value = tempFavorites;
};

</script>
<template>
  <div class="container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher une préférence"
      class="search-bar"
    />
    <div class="news-container">
      <div v-if="filteredFavorites.length === 0">
        <p>Vous n'avez pas de préférences</p>
      </div>
      <div v-else>
        <Articles :articles="filteredFavorites" @update-favorites="updateFavorites"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 750px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 40px;
}
.container{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.news-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
p{
  margin-bottom: 150px;
}
</style>
