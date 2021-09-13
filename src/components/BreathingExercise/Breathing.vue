<template>
  <app-lungs
    :animate="currentRoundState === 'Breathing'"
    :animationDuration="breathTime"
    :disableAnimation="disableAnimation"
  />
  <app-counter :number="breathNum" />
  <app-button variant="link" @click="nextScreen">
    Skip to the next phase
  </app-button>

  <app-exercise-footer>
    Inhale deeply and exhale as counter changes.
  </app-exercise-footer>

  <app-leave-exercise-confirm
    v-if="showModal"
    :onCancel="preventCancelExercise"
    :onConfirm="_confirmCancelExercise"
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
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import LungsVue from "./counter/Lungs.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";

const exerciseStateProps = [
  "currentRoundState",
  "breathTime",
  "breathsPerRound",
  "started",
  "disableAnimation",
] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

let breathTiemout: TimeoutReturn;

export default defineComponent({
  name: "BreathingExercise-Breathing",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appButton: ButtonVue,
    appLungs: LungsVue,
    appCounter: CounterVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
    appExerciseFooter: FooterVue,
  },
  data() {
    return {
      breathNum: 0,
      countingFinished: false,
    };
  },
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
  },

  watch: {
    showModal(val) {
      if (!val && this.countingFinished) {
        this.$router.replace({
          name: "BreathingExercise-BreathHold",
        });
      }
    },
  },

  methods: {
    breath() {
      this.breathNum++;
      if (this.breathNum < this.breathsPerRound) {
        breathTiemout = setTimeout(this.breath, this.breathTime);
        return;
      }
      this.nextScreen();
    },

    _confirmCancelExercise() {
      this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
      this.confirmCancelExercise();
    },

    nextScreen() {
      if (breathTiemout) {
        clearTimeout(breathTiemout);
        breathTiemout = void 0;
      }
      this.countingFinished = true;
      this.$router.replace({
        name: "BreathingExercise-BreathHold",
      });
    },
  },
  beforeRouteLeave(to) {
    if (this.showModal && !this.allowNavigation) {
      return false;
    }

    if (to.name === "BreathingExercise-BreathHold") {
      clearTimeout(breathTiemout);
      breathTiemout = void 0;
      return true;
    }
    if (to.params.allowNavigation) {
      clearTimeout(breathTiemout);
      breathTiemout = void 0;
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
