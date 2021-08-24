<template>
  <section class="counter">
    <div v-if="!finished">
      <app-lungs
        :breathNum="breathCount"
        :animate="currentRoundState === 'Breathing'"
        :animationDuration="breathTime"
      ></app-lungs>

      <div class="counter__time">
        breaht # <time>{{ breathCount }}</time>
        <br />
        holding: <time>{{ breathOutSeconds }} s</time>
        <br />
        holding in: <time>{{ breathInTime }} s</time>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LungsVue from "./Lungs.vue";

export default defineComponent({
  components: {
    appLungs: LungsVue,
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
  margin: 3rem auto;
  font-size: 3rem;
  font-family: fantasy;
}
</style>
