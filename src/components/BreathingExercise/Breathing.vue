<template>
  <code>{{ JSON.stringify($store.state.exercise, null, 2) }}</code>
  <app-lungs
    :breathNum="breathsCount"
    :animate="currentRoundState === 'Breathing'"
    :animationDuration="breathTime"
  ></app-lungs>
  <hr />
</template>

<script lang="ts">
import store, { StoreState } from "@/store";
import { ExerciseModuleMap } from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import LungsVue from "./counter/Lungs.vue";

const exerciseStateProps = [
  "finished",
  "currentRoundState",
  "currentRound",
] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

export default defineComponent({
  components: {
    appLungs: LungsVue,
  },
  name: "BreathingExercise-Breathing",
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
  },

  methods: {},
  beforeRouteEnter(to, from) {
    console.log("'BreathingExercise-Breathing' - beforeRouteEnter");
    if (
      from.name !== "BreathingExercise-Start" ||
      !(store.state as StoreState).exercise.started
    ) {
      return {
        name: "BreathingExercise-Start",
      };
    }
  },
  beforeRouteLeave(to) {
    console.log("'BreathingExercise-Breathing' - beforeRouteLeave");
    if (to.name !== "BreathingExercise-HoldingOut") {
      return false;
    }
  },
});
</script>
