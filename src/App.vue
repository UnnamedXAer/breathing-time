<template>
  <app-header />
  <router-view />
  <app-footer />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "./components/header/Header.vue";
import FooterVue from "./components/footer/Footer.vue";
import "./assets/fonts/fonts.module.css";

export default defineComponent({
  components: {
    appHeader: HeaderVue,
    appFooter: FooterVue,
  },
});
</script>

<style scoped>
.app {
  margin-bottom: 1rem;
}
</style>
