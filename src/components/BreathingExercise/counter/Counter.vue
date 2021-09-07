<template>
  <section class="counter">
    <div class="counter__time">
      {{ number }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    number: { type: Number, required: true },
  },
});
</script>
<style scoped>
.counter {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.counter__time {
  margin: 1rem auto;
  font-size: 15vh;
  text-shadow: 6px 6px 8px rgb(0 0 0 / 80%);
  font-weight: 600;
}
</style>
