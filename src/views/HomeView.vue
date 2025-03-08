<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const feeds = ref([]);

onMounted(() => {
  const savedFeeds = JSON.parse(localStorage.getItem('feeds')) || [];
  feeds.value = savedFeeds;
});

const removeFeed = (id) => {
  feeds.value = feeds.value.filter(feed => feed.id !== id);
  localStorage.setItem('feeds', JSON.stringify(feeds.value));
};

</script>

<template>
  <div class="feeds">
    <h1>Liste des flux RSS</h1>
    <div v-for="feed in feeds" :key="feed.id">
      <div class="feed">
      <router-link :to="{ name: 'showFeed', params: { id: feed.id } }"> {{ feed.title }} </router-link>
        <div>
          <button @click="removeFeed(feed.id); $event.stopPropagation()">❌</button>
          <router-link :to="{ name: 'editFeed', params: { id: feed.id } }"><button @click="$event.stopPropagation()">✏️</button></router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.feed{
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12.5px;
  border-radius: 20px;
  margin-top: 7.5px;
  justify-content: space-between;
}
.feed button{
  background-color: white;
  border: none;
  padding: 2.5px;
  cursor: pointer;
  margin-right: 7.5px;
}
.feed a{
  flex-grow: 1;
}
.feeds{
  width: 600px;
}
h1{
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
