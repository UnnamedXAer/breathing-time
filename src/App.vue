<template>
  <app-mobile-banner />
  <app-header />
  <main class="main">
    <router-view data-test="app-router" />
  </main>
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "./components/header/Header.vue";
import FooterVue from "./components/footer/Footer.vue";
import "./assets/fonts/fonts.module.css";
import { ExerciseActions } from "./store/modules/exercise/types";
import { namespaceName } from "./store/createStore";
import MobileBannerVue from "./components/ui/MobileBanner.vue";

export default defineComponent({
  components: {
    appMobileBanner: MobileBannerVue,
    appHeader: HeaderVue,
    appFooter: FooterVue,
  },

  mounted() {
    this.$store.dispatch(
      namespaceName("exercise", ExerciseActions.ReadCachedPreferences)
    );
  },
});
</script>

<style scoped>
.main {
  flex: 1;
  padding-left: 0.3em;
  padding-right: 0.3em;

  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 540px) {
  .main {
    padding-left: 1em;
    padding-right: 1em;
  }
}
</style>
