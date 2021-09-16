<template>
  <header id="header">
    <nav class="nav">
      <router-link class="nav__item" to="/">
        <app-logo />
      </router-link>
      <div class="nav__links">
        <router-link class="nav__item" to="/">{{
          $t("header.home")
        }}</router-link>
        <router-link class="nav__item" to="/about">{{
          $t("header.about")
        }}</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoVue from "../ui/Logo.vue";

export default defineComponent({
  components: {
    appLogo: LogoVue,
  },
});
</script>

<style scoped>
#header {
  min-height: 3rem;
}

.nav {
  display: flex;
  justify-content: center;
}

.nav__links {
  flex: 1;
  display: flex;
}

.nav__item {
  font-size: 1.5rem;
  color: cadetblue;
  padding: 0.5rem 2rem;
}
</style>
