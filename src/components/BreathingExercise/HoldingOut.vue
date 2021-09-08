<template>
  <section class="exercise__hould_out">
    <app-exercise-header>
      Breath Hold
      <template v-slot:additional>
        <app-alert
          v-if="showAreYouThere"
          mode="warning"
          :dismiss="dismissAlert"
        >
          Are you still there?
        </app-alert>
      </template>
    </app-exercise-header>
    <app-counter :number="counter" />
    <section>
      <app-exercise-action-btn @click="nextScreen">
        Next Phase
      </app-exercise-action-btn>
    </section>
    <app-exercise-footer>
      Exhale and stop breathing until you feel urge to inhale.
      <p v-if="isLastRound">
        "This is last round. Don't forget about recover phase.
      </p>
    </app-exercise-footer>
  </section>

  <app-leave-exercise-confirm
    v-if="showModal"
    :onCancel="preventCancelExercise"
    :onConfirm="_confirmCancelExercise"
  />
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import {
  ExerciseActions,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";
import AlertVue from "../ui/Alert.vue";
import ActionBtnVue from "./ActionBtn.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-HouldingOut",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appCounter: CounterVue,
    appExerciseActionBtn: ActionBtnVue,
    appAlert: AlertVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
    appExerciseFooter: FooterVue,
    appExerciseHeader: HeaderVue,
  },
  data() {
    return {
      counter: 0,
      showAreYouThere: false,
      warningDismissed: false,
      startTime: 0,
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
      this.$store.commit(
        namespaceName("exercise", ExerciseMutations.AddHoldTime),
        (Date.now() - this.startTime) / 1000
      );
    },
    nextScreen() {
      this.$router.replace({
        name: "BreathingExercise-HoldingIn",
      });
    },
    dismissAlert() {
      this.showAreYouThere = false;
      this.warningDismissed = true;
    },

    _confirmCancelExercise() {
      this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
      this.confirmCancelExercise();
    },
  },
  beforeRouteLeave(to) {
    if (to.name === "BreathingExercise-HoldingIn") {
      this.stopAndStoreResults();
      return true;
    }

    if (to.params.allowNavigation) {
      clearInterval();
      interval = void 0;
      return true;
    }
    this.askBeforeLeave(to.name as RouteRecordName);

    return false;
  },
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.HoldingOut
    );
    this.startTime = Date.now();
    interval = setInterval(this.count, 1000);
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
}

.exercise__hould_out .content {
  margin-bottom: 1.5rem;
}
</style>
