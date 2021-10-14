<template>
  <header id="header" data-test="header">
    <nav class="nav" data-test="nav">
      <router-link class="nav__item" to="/">
        <app-logo />
      </router-link>
      <div class="nav__links">
        <router-link class="nav__item" to="/" data-test="home-link">{{
          $t("header.home")
        }}</router-link>
        <router-link class="nav__item" to="/about">{{
          $t("header.about")
        }}</router-link>
      </div>
      <div class="languages_container">
        <select
          data-test="languages"
          class="languages"
          :class="$i18n.locale"
          v-model="$i18n.locale"
        >
          <option
            class="languages__option"
            v-for="lang in languages"
            :key="lang"
            :value="lang"
            :selected="lang === $i18n.locale"
          >
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { languages } from "@/i18n";
import { defineComponent } from "vue";
import LogoVue from "../ui/Logo.vue";

export default defineComponent({
  components: {
    appLogo: LogoVue,
  },

  watch: {
    "$i18n.locale"(val) {
      localStorage.setItem("locale", val);
    },
  },

  data() {
    return { languages: [...languages] };
  },
});
</script>

<style scoped>
#header {
  min-height: 3rem;
  box-shadow: 0 1px 4px #ccc;
}

.nav {
  display: flex;
}

.nav__links {
  flex: 1;
  display: flex;
}

.nav__item {
  font-size: 1.3rem;
  color: cadetblue;
  padding: 0.5rem 0.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

@media screen and (min-width: 540px) {
  .nav__item {
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
  }
}

.languages_container {
  display: flex;
  align-items: center;
}

.languages {
  font-size: 1rem;
  height: 40px;
  width: 66px;
  text-transform: uppercase;
  user-select: none;
  margin: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  background-color: var(--dark);
}

.languages.pl {
  appearance: none;
  background: url("../../assets/icons/pl.png") 91% / 30% no-repeat var(--light);
}

.languages.en {
  appearance: none;
  background: url("../../assets/icons/en.png") 91% / 30% no-repeat var(--light);
}

.languages * {
  text-transform: uppercase;
  background-color: var(--light);
}
</style>
