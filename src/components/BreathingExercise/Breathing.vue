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
import { defineComponent } from "vue";
import { mapState } from "vuex";
import LungsVue from "./counter/Lungs.vue";

// type MState = (state: unknown, key: keyof StoreState) => StoreState[keyof StoreState]

// const mState: MState = (state, key) =>(state as StoreState)[key];
// const mState = (state: unknown, key: keyof StoreState) => {
//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   return (state as StoreState)[key]!;
// };

// let x = mState({ exercise: "asd", error: null }, "exercise");
type TypeStoreState = (s: unknown) => StoreState;
const ts: TypeStoreState = (s) => s as StoreState;

export default defineComponent({
  components: {
    appLungs: LungsVue,
  },
  name: "BreathingExercise-Breathing",
  computed: {
    // ...mapState<
    //   StoreState,
    //   {
    //     started: (s: StoreState) => typeof s.exercise["started"];
    //     finished: (s: StoreState) => typeof s.exercise["started"];
    //   }
    //   //
    //   //
    // >({
    //   started: (state) => state.exercise.started,
    //   finished: (state) => state.exercise.finished,
    // }),
    ...mapState({
      started: (s) => ts(s).exercise.started,
      er: (s) => ts(s).error,
    }),
    ...mapState("exercise", {
      finished: "finished",
      currentRoundState: "currentRoundState",
      currentRound: "currentRound",
      breathsCount: "breathsCount",
    }),
  },
  methods: {
    x() {
      const xx = this.started;
      const xx2 = this.finished;
      const ee = this.er;
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
