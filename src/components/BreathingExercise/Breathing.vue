<template>
  <app-lungs
    :animate="currentRoundState === 'Breathing'"
    :animationDuration="breathTime"
    :disableAnimation="disableAnimation"
  />
  <app-counter :number="breathNum" />
  <app-leave-exercise-confirm
    v-if="showModal"
    :onCancel="preventCancelExercise"
    :onConfirm="confirmCancelExercise"
  />
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
import { RouteRecordName } from "vue-router";
import { mapState } from "vuex";
import CounterVue from "./counter/Counter.vue";
import LungsVue from "./counter/Lungs.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";

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
  mixins: [MixinLeaveExerciseVue],
  components: {
    appLungs: LungsVue,
    appCounter: CounterVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
  },
  data() {
    return {
      breathNum: 0,
      disableAnimation: true,
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

    _confirmCancelExercise() {
      this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
      this.confirmCancelExercise();
    },
  },
  beforeRouteLeave(to) {
    if (to.name === "BreathingExercise-HoldingOut") {
      clearTimeout(breathTiemout);
      breathTiemout = void 0;
      return true;
    }
    if (to.params.allowNavigation) {
      return true;
    }
    this.askBeforeLeave(to.name as RouteRecordName);

    return false;
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
