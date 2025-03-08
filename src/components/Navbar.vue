<template>
  <nav class="navbar">
    <div class="link-container">
      <router-link to="/">Liste des flux</router-link>
      <router-link to="/addfeed">Enregistrer un flux</router-link>
      <router-link to="/preferences">Préférence</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: gray;
}
.link-container {
  margin-left: 10px;
}
.link-container > * {
  margin-left: 20px;
  color: white;
  text-decoration: none;
}
</style>
