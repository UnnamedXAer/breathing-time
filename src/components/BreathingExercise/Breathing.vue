<template>
  <section class="exercise__breath">
    <app-exercise-header>{{ $t("ex.breathing.title") }}</app-exercise-header>

    <app-start-tip v-if="showStartTip">
      {{ $t("ex.breathing.start_tip") }}
    </app-start-tip>
    <template v-else>
      <app-lungs
        :animationDuration="breathTime"
        :disableAnimation="disableAnimation"
        :counter="counter"
      />
      <app-counter :number="counter" />
      <app-button variant="link" @click="nextScreen">
        {{ $t("ex.breathing.skip_to_next") }}
      </app-button>

      <app-exercise-footer>
        {{ $t("ex.breathing.footer_tip") }}
      </app-exercise-footer>
    </template>
  </section>
  <app-leave-exercise-confirm
    v-if="showModal"
    :cancelHandler="preventCancelExercise"
    :confirmHandler="confirmCancelExercise"
  />
</template>

<script lang="ts">
import { namespaceName, StoreState } from "@/store";
import {
  ExerciseModuleMap,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";
import { mapState } from "vuex";
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";
import LungsVue from "./counter/Lungs.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";
import StartTipVue from "./StartTip.vue";

const exerciseStateProps = [
  "breathTime",
  "breathsPerRound",
  "started",
  "disableAnimation",
  "disableStartTips",
] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

let breathTiemout: TimeoutReturn;
let startTipTimeout: TimeoutReturn = void 0;

export default defineComponent({
  name: "BreathingExercise-Breathing",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appButton: ButtonVue,
    appLungs: LungsVue,
    appCounter: CounterVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
    appExerciseHeader: HeaderVue,
    appExerciseFooter: FooterVue,
    appStartTip: StartTipVue,
  },
  data() {
    return {
      counter: 1,
      countingFinished: false,
      showStartTip: true,
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
    count() {
      breathTiemout = setTimeout(this.breath, this.breathTime);
    },
    breath() {
      this.counter++;
      if (this.counter <= this.breathsPerRound) {
        breathTiemout = setTimeout(this.breath, this.breathTime);
        return;
      }
      this.nextScreen();
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
    this.showStartTip = !this.disableStartTips;
    if (!this.started) {
      this.$store.commit(namespaceName("exercise", ExerciseMutations.Start));
    }
  },
  mounted() {
    if (!this.showStartTip) {
      this.count();
      return;
    }

    startTipTimeout = setTimeout(() => {
      startTipTimeout = void 0;
      this.showStartTip = false;
      this.count();
    }, 1400);
  },
  beforeUnmount() {
    if (startTipTimeout) {
      clearTimeout(startTipTimeout);
      startTipTimeout = void 0;
    }
  },
});
</script>

<style scoped>
.exercise__breath {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
}
</style>
