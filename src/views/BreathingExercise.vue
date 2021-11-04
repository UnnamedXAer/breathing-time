<template>
  <div class="breathing_exercise">
    <h1 class="breathing_exercise__header" data-test="ex-title">
      {{ $t("ex.title") }}
    </h1>
    <router-view data-test="ex-router"></router-view>
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
  margin-block-end: 0.2em;
  margin-block-start: 0.2em;
}

@media screen and (min-height: 650px) {
  .breathing_exercise__header {
    margin-block-end: revert;
    margin-block-start: revert;
  }
}
</style>
