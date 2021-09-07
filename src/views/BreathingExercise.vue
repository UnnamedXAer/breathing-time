<template>
  <div class="breathing_exercise">
    <h1>Breathing Exercise</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BreathingExercise",
});
</script>

<style scoped>
.breathing_exercise {
  flex: 1;

  display: flex;
  flex-direction: column;
}
</style>
