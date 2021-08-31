<template>
  <section class="exercise__houl_out">
    <p v-if="isLastRound">
      This is last round. Don't forget to about 15 second recover phase.
    </p>
    <app-alert v-if="showAreYouThere" mode="warning" :dismiss="dismissAlert"
      >Are you still there?</app-alert
    >
    <app-counter :number="counter" />
    <app-button @click="nextRound">{{
      isLastRound ? "FINISH" : "NEXT Round"
    }}</app-button>
  </section>
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import AlertVue from "../ui/Alert.vue";
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-HouldingOut",
  components: {
    appCounter: CounterVue,
    appButton: ButtonVue,
    appAlert: AlertVue,
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
        this.$store.state.exercise.maxRounds
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
    stopAndStore() {
      if (interval !== void 0) {
        clearInterval(interval);
        interval = void 0;
      }
      this.$store.commit(
        namespaceName("exercise", ExerciseMutations.AddHoldTime),
        (Date.now() - this.startTime) / 1000
      );
    },
    nextRound() {
      this.$router.replace({
        name: "BreathingExercise-HoldingIn",
      });
    },
    dismissAlert() {
      this.showAreYouThere = false;
      this.showAreYouThere = true;
    },
  },
  beforeRouteLeave(to) {
    console.log("beforeRouteLeave - 'Holding Out'");
    if (to.name === "BreathingExercise-HoldingIn") {
      this.stopAndStore();
      return true;
    }

    const ok = confirm("Cancel exercise?");
    if (ok) {
      this.$store.dispatch(namespaceName("exercise", ExerciseMutations.Cancel));
      if (interval !== void 0) {
        clearInterval(interval);
        interval = void 0;
      }
    }

    return ok;
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
