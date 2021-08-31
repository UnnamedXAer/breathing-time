<template>
  <app-lungs
    :animate="currentRoundState === 'Breathing'"
    :animationDuration="breathTime"
    :disableAnimation="disableAnimation"
  />
  <app-counter :number="breathNum" />
</template>

<script lang="ts">
import { namespaceName, StoreState } from "@/store";
import {
  ExerciseActions,
  ExerciseModuleMap,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import CounterVue from "./counter/Counter.vue";
import LungsVue from "./counter/Lungs.vue";

const exerciseStateProps = [
  "currentRoundState",
  "breathTime",
  "breathsPerRound",
  "started",
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

      this.$router.replace({
        name: "BreathingExercise-HoldingOut",
      });
    },
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
    if (!this.started) {
      this.$store.commit(namespaceName("exercise", ExerciseMutations.Start));
    }
  },
  mounted() {
    window.addEventListener("unload", unloadHander);
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.Breathing
    );
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
