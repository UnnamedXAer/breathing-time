<template>
  <section class="exercise__hould_out">
    <app-exercise-header>
      {{ $t("ex.hold.title") }}
      <template v-slot:additional>
        <app-alert
          v-if="showAreYouThere"
          mode="warning"
          :dismiss="dismissAlert"
        >
          {{ $t("ex.hold.are_you_still_there") }}
        </app-alert>
      </template>
    </app-exercise-header>

    <app-start-tip v-if="showStartTip">
      {{ $t("ex.hold.start_tip") }}
    </app-start-tip>
    <template v-else>
      <app-counter :number="counter" />
      <section>
        <app-exercise-action-btn @click="nextScreen">
          {{ $t("ex.hold.skip_to_next") }}
        </app-exercise-action-btn>
      </section>
      <app-exercise-footer>
        {{ $t("ex.hold.footer_tip") }}

        <small class="last_round_info" v-if="isLastRound">
          {{ $t("ex.hold.last_round_tip") }}
        </small>
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
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";
import AlertVue from "../ui/Alert.vue";
import ActionBtnVue from "./ActionBtn.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";
import StartTipVue from "./StartTip.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";

let interval: TimeoutReturn = void 0;
let startTipTimeout: TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-BreathHold",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appCounter: CounterVue,
    appExerciseActionBtn: ActionBtnVue,
    appAlert: AlertVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
    appExerciseFooter: FooterVue,
    appExerciseHeader: HeaderVue,
    appStartTip: StartTipVue,
  },
  data() {
    return {
      counter: 0,
      showAreYouThere: false,
      warningDismissed: false,
      startTime: 0,
      showStartTip: true,
    };
  },
  computed: {
    isLastRound() {
      return (
        this.$store.state.exercise.holdTimes.length + 1 ===
        this.$store.state.exercise.numberOfRounds
      );
    },
  },
  methods: {
    count() {
      if (
        this.counter > 600 &&
        !this.warningDismissed &&
        !this.showAreYouThere
      ) {
        this.showAreYouThere = true;
      }

      this.counter++;
    },
    stopAndStoreResults() {
      if (interval !== void 0) {
        clearInterval(interval);
        interval = void 0;
      }

      const holdTime = (Date.now() - this.startTime) / 1000;
      this.$store.commit(
        namespaceName("exercise", ExerciseMutations.AddHoldTime),
        holdTime
      );
    },
    nextScreen() {
      this.stopAndStoreResults();

      this.$router.replace({
        name: "BreathingExercise-Recovery",
      });
    },
    dismissAlert() {
      this.showAreYouThere = false;
      this.warningDismissed = true;
    },
  },
  beforeRouteLeave(to) {
    if (to.name === "BreathingExercise-Recovery") {
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
      RoundState.BreathHold
    );
    startTipTimeout = setTimeout(
      () => {
        startTipTimeout = void 0;
        this.showStartTip = false;
        this.startTime = Date.now();
        interval = setInterval(this.count, 1000);
      },
      this.showStartTip ? this.$store.state.exercise.breathTime : 0
    );
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
.exercise__hould_out {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
}

.exercise__hould_out .content {
  margin-bottom: 1.5rem;
}

.last_round_info {
  display: block;
  margin-top: 0.3em;
}
</style>
