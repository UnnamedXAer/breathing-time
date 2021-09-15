<template>
  <div class="breathing_exercise">
    <h1 class="breathing_exercise__header">Breathing Exercise</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

function beforeWindowUnloadHander(ev: Event) {
  ev.preventDefault();
  ev.returnValue = true;
  return true;
}

export default defineComponent({
  name: "BreathingExercise",

  watch: {
    "$store.state.exercise.started"(val) {
      console.log(val);
      if (val) {
        window.addEventListener("beforeunload", beforeWindowUnloadHander);
      } else {
        window.removeEventListener("beforeunload", beforeWindowUnloadHander);
      }
    },
  },
});
</script>

<style scoped>
.breathing_exercise {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.breathing_exercise__header {
  text-align: center;
}
</style>
