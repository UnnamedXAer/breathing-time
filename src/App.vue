<template>
  <app-header></app-header>
  <router-view />
  <app-footer></app-footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "./components/header/Header.vue";
import FooterVue from "./components/footer/Footer.vue";

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
