<template>
  <section class="exercise__start">
    <section style="display: flex; justify-content: center; margin: 3rem auto">
      <app-button
        @click="startExercise"
        v-if="counter === countdountTime"
        style="padding-left: 3rem; padding-right: 3rem"
        >START</app-button
      >
      <div v-else class="exercise__start__get_ready">
        <p>Get Ready!</p>
        <p>{{ counter > 0 ? counter : "Go" }}</p>
      </div>
    </section>
    <hr v-if="counter === countdountTime" />
    <app-exercise-instructions v-if="counter === countdountTime" />
  </section>
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";
import ExerciseInstructionsVue from "./ExerciseInstructions.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Start",
  components: {
    appButton: ButtonVue,
    appExerciseInstructions: ExerciseInstructionsVue,
  },
  data() {
    const countdountTime = 0;
    return {
      countdountTime,
      counter: countdountTime,
    };
  },

  methods: {
    startExercise() {
      this.counter--;

      interval = setInterval(() => {
        if (this.counter <= 0) {
          clearInterval(interval);
          interval = void 0;
          this.$store.commit(
            namespaceName("exercise", ExerciseMutations.Start)
          );
          this.$router.replace({
            name: "BreathingExercise-Breathing",
          });

          return;
        }
        this.counter--;
      }, 1000);
    },
  },
});
</script>

<style scoped>
.exercise__start__get_ready {
  text-align: center;
  font-variant: small-caps;
  font-size: 10vh;
}
</style>
