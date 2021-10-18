<template>
  <section class="exercise__start">
    <section style="display: flex; justify-content: center; margin: 3rem auto">
      <app-button
        data-test="ex-start-start-btn"
        @click="startExercise"
        v-if="counter === countdownTime"
        style="padding-left: 3rem; padding-right: 3rem"
        >{{ $t("ex.start.start") }}</app-button
      >
      <div
        v-else
        class="exercise__start__get_ready"
        data-test="ex-start-counter"
      >
        <p>{{ $t("ex.start.get_ready") }}</p>
        <p>{{ counter > 0 ? counter : $t("ex.start.go") }}</p>
      </div>
    </section>
    <hr v-if="counter === countdownTime" />

    <template v-if="counter === countdownTime">
      <app-warning-note data-test="ex-start-warning-note" />
      <app-round-phases data-test="ex-start-round-phases" />

      <app-button
        data-test="ex-start-see-instr-btn"
        style="margin-top: 2rem"
        variant="outlined"
        @click="
          $router.push({
            name: 'BreathingExerciseInstructions',
          })
        "
      >
        {{ $t("ex.start.see_instructions") }}
      </app-button>
    </template>
  </section>
</template>

<script lang="ts">
import { namespaceName } from "@/store/createStore";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { defineComponent, ref } from "vue";
import ButtonVue from "../ui/Button.vue";
import RoundPhasesVue from "./RoundPhases.vue";
import WarningNoteVue from "./WarningNote.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Start",
  components: {
    appButton: ButtonVue,
    appWarningNote: WarningNoteVue,
    appRoundPhases: RoundPhasesVue,
  },

  setup() {
    const countdownTime = process.env.NODE_ENV === "development" ? 0 : 3 + 1;
    const counter = ref(countdownTime);

    return {
      countdownTime,
      counter,
    };
  },

  methods: {
    startExercise() {
      this.counter--;

      interval = setInterval(this.descrease, 1000);
    },

    descrease() {
      if (this.counter > 0) {
        this.counter--;
        return;
      }
      clearInterval(interval);
      interval = void 0;
      this.$store.commit(namespaceName("exercise", ExerciseMutations.Start));
      this.$router.replace({
        name: "BreathingExercise-Breathing",
      });
    },
  },

  beforeRouteLeave() {
    if (interval) {
      clearInterval(interval);
      interval = void 0;
    }
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
