<template>
  <app-lungs
    :animate="currentRoundState === 'Breathing'"
    :animationDuration="breathTime"
    :disableAnimation="disableAnimation"
  />
  <app-counter :number="breathNum" />
</template>

<script lang="ts">
import store, { namespaceName, StoreState } from "@/store";
import {
  ExerciseActions,
  ExerciseModuleMap,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import CounterVue from "./counter/Counter.vue";
import LungsVue from "./counter/Lungs.vue";

const exerciseStateProps = [
  "currentRoundState",
  "breathTime",
  "breathsPerRound",
] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

let breathTiemout: TimeoutReturn;

export default defineComponent({
  name: "BreathingExercise-Breathing",
  components: {
    appLungs: LungsVue,
    appCounter: CounterVue,
  },
  data() {
    return {
      breathNum: 0,
      disableAnimation: false,
    };
  },
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
  },

  methods: {
    breath() {
      this.breathNum++;
      if (this.breathNum < this.breathsPerRound) {
        breathTiemout = setTimeout(this.breath, this.breathTime);
        return;
      }
      breathTiemout = void 0;

      console.log("completed");
      this.$router.replace({
        name: "BreathingExercise-HoldingOut",
      });
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
      const ok = confirm("wanna leave breathing?");
      if (ok) {
        clearTimeout(breathTiemout);
        breathTiemout = void 0;

        this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
      }
      return ok;
    }
    return true;
  },
  beforeMount() {
    this.$store.commit(namespaceName("exercise", ExerciseMutations.Start));
  },
  mounted() {
    console.log("'BreathingExercise-Breathing' - mounted");
    window.addEventListener("unload", unloadHander);

    this.breath();
  },
  unmounted() {
    window.removeEventListener("unload", unloadHander);
  },
});

function unloadHander(ev: Event) {
  console.log("unload", ev.target);
  if (confirm("wanna leave breathing?")) {
    return;
  }
  ev.preventDefault();
}
</script>
