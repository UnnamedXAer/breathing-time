<template>
  <section class="exercise__recovery">
    <app-exercise-header>
      {{ $t("ex.recovery.title") }}
    </app-exercise-header>

    <app-start-tip v-if="showStartTip">
      {{ $t("ex.recovery.start_tip") }}
    </app-start-tip>
    <template v-else>
      <app-counter :number="counter" />

      <app-button
        variant="link"
        @click="nextScreen"
        data-test="recovery-next-screen-btn"
      >
        {{ $t("ex.recovery.skip_to_" + (isLastRound ? "summary" : "next")) }}
      </app-button>

      <app-exercise-footer>
        {{ $t("ex.recovery.footer_tip", [recoveryTime]) }}
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
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";
import StartTipVue from "./StartTip.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";
import { namespaceName } from "@/store/createStore";

let interval: TimeoutReturn = void 0;
let startTipTimeout: TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Recovery",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appCounter: CounterVue,
    appExerciseFooter: FooterVue,
    appExerciseHeader: HeaderVue,
    appButton: ButtonVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
    appStartTip: StartTipVue,
  },
  data() {
    return {
      counter: 0,
      showStartTip: true,
    };
  },

  computed: {
    recoveryTime() {
      return this.$store.state.exercise.recoveryTime;
    },
    isLastRound() {
      return (
        this.$store.state.exercise.holdTimes.length >=
        this.$store.state.exercise.numberOfRounds
      );
    },
  },

  methods: {
    count() {
      if (this.counter < this.recoveryTime) {
        this.counter++;
        return;
      }

      // @TODO: #8 screen does not change after the canceling before leave dialog if counter already finished
      this.nextScreen();
    },

    nextScreen() {
      clearInterval(interval);
      interval = void 0;
      let routeName = "BreathingExercise-Breathing";
      if (this.isLastRound) {
        routeName = "BreathingExercise-Summary";
      }
      this.$router.replace({
        name: routeName,
        params: {
          fromRecovery: 1,
        },
      });
    },
  },
  beforeRouteLeave(to) {
    if (this.showModal && !this.allowNavigation) {
      return false;
    }

    if (
      to.name === "BreathingExercise-Breathing" ||
      to.name === "BreathingExercise-Summary"
    ) {
      if (interval !== void 0) {
        clearInterval(interval);
        interval = void 0;
      }

      return true;
    }

    if (to.params.allowNavigation) {
      clearInterval(interval);
      interval = void 0;
      return true;
    }
    this.askBeforeLeave(to.name as RouteRecordName);

    return false;
  },
  beforeMount() {
    this.showStartTip = !this.$store.state.exercise.disableStartTips;
  },
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.Recovery
    );

    startTipTimeout = setTimeout(
      () => {
        startTipTimeout = void 0;
        this.showStartTip = false;
        interval = setInterval(
          this.count,
          process.env.NODE_ENV === "test" ? 0 : 1000
        );
      },
      this.showStartTip ? this.$store.state.exercise.breathTime : 0
    );
  },
  beforeUnmount() {
    if (startTipTimeout) {
      clearTimeout(startTipTimeout);
      startTipTimeout = void 0;
    }
    if (interval) {
      clearInterval(interval);
      interval = void 0;
    }
  },
});
</script>

<style scoped>
.exercise__recovery {
  text-align: center;
  position: relative;
  flex: 1;
}
</style>
