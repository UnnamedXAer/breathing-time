<template>
  <div class="home">
    <h1>home</h1>
    <hr />
    <app-counter></app-counter>
  </div>
</template>

<script lang="ts">
import CounterVue from "@/components/counter/Counter.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    appCounter: CounterVue,
  },
});
</script>
