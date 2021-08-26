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
// import { TExerciseModuleMap } from "@/store/modules/exercise/types";
import { ModuleStateProps } from "@/store/types";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import LungsVue from "./counter/Lungs.vue";

// const exerciseStateProps: ModuleStateProps<"exercise"> = [
const exerciseStateProps = [
  "finished",
  "currentRoundState",
  "currentRound",
  "XD",
] as const;

type GetUnion<U, T> = T extends U ? T : never;

type ComputedKeys = GetUnion<
  ModuleStateProps<"exercise">[number],
  typeof exerciseStateProps[number]
>;

type ExerciseKeys = keyof StoreState["exercise"];

type TExerciseModuleMap<CKeys extends Readonly<string[]>> = {
  [key in CKeys[number]]: key extends ExerciseKeys
    ? () => StoreState["exercise"][key]
    : never;
};

type ComputedTypes = TExerciseModuleMap<typeof exerciseStateProps>;

export default defineComponent({
  components: {
    appLungs: LungsVue,
  },
  name: "BreathingExercise-Breathing",
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
  },

  methods: {
    do() {
      const d = this.finished;
      const currentRoundState = this.currentRoundState;
      const xs = this.XD;
      const x = this.holdInTime;
    },
  },
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
