<template>
  <header id="header">
    <nav class="nav">
      <router-link class="nav__item" to="/">Home</router-link> |
      <router-link class="nav__item" to="/about">About</router-link>
    </nav>
  </header>
</template>

<style scoped>
#header {
  min-height: 3rem;
}

.nav__item {
  font-size: 1.5rem;
  color: cadetblue;
  padding: 0.5rem 2rem;
}
</style>
