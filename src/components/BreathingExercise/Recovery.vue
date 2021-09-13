<template>
  <section class="exercise__recovery">
    <app-exercise-header> Recovery </app-exercise-header>

    <app-counter :number="counter" />

    <app-button variant="link" @click="nextScreen">
      Skip to the {{ isLastRound ? "Summary screen" : "next phase" }}
    </app-button>

    <app-exercise-footer>
      Take one deep breath and hold for {{ recoveryTime }} seconds.
    </app-exercise-footer>
  </section>

  <app-leave-exercise-confirm
    v-if="showModal"
    :onCancel="preventCancelExercise"
    :onConfirm="confirmCancelExercise"
  />
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";
import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";
import MixinLeaveExerciseVue from "./MixinLeaveExercise.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Recovery",
  mixins: [MixinLeaveExerciseVue],
  components: {
    appCounter: CounterVue,
    appExerciseFooter: FooterVue,
    appExerciseHeader: HeaderVue,
    appButton: ButtonVue,
    appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
  },
  data() {
    return {
      counter: 0,
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
      console.log(this.counter);
      if (this.counter < this.recoveryTime) {
        this.counter++;
        return;
      }

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
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.Recovery
    );
    interval = setInterval(this.count, 1000);
  },
  unmounted() {
    if (interval !== void 0) {
      clearInterval(interval);
      interval = void 0;
    }
  },
});
</script>

<style scoped>
.exercise__recovery {
  text-align: center;
}
</style>
