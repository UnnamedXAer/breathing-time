<template>
  <section class="exercise__houl_out">
    <p>Inhale deeply and stop breathing for {{ holdTime }} s.</p>
    <app-counter :number="counter" />
  </section>
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import CounterVue from "./counter/Counter.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-HouldingIn",
  components: {
    appCounter: CounterVue,
  },
  data() {
    return {
      counter: 0,
    };
  },

  computed: {
    holdTime() {
      return this.$store.state.exercise.holdInTime;
    },
    isLastRound() {
      return (
        this.$store.state.exercise.holdTimes.length >=
        this.$store.state.exercise.maxRounds
      );
    },
  },

  methods: {
    count() {
      if (this.counter < this.holdTime) {
        this.counter++;
        return;
      }

      clearInterval(interval);
      interval = void 0;
      let routeName = "BreathingExercise-Breathing";
      if (this.isLastRound) {
        routeName = "BreathingExercise-Summary";
      }
      this.$router.replace({
        name: routeName,
        params: {
          fromHoldingIn: 1,
        },
      });
    },
  },
  beforeRouteLeave(to) {
    console.log("beforeRouteLeave - 'Holding In'");
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
      RoundState.HoldingIn
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
.exercise__houl_out {
  text-align: center;
}
</style>
