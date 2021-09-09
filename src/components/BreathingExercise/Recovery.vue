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
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";
import CounterVue from "./counter/Counter.vue";
import FooterVue from "./Footer.vue";
import HeaderVue from "./Header.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Recovery",
  components: {
    appCounter: CounterVue,
    appExerciseFooter: FooterVue,
    appExerciseHeader: HeaderVue,
    appButton: ButtonVue,
  },
  data() {
    return {
      counter: 0,
    };
  },

  computed: {
    holdTime() {
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
      if (this.counter < this.holdTime) {
        this.counter++;
        return;
      }

      //   clearInterval(interval);
      //   interval = void 0;
      //   let routeName = "BreathingExercise-Breathing";
      //   if (this.isLastRound) {
      //     routeName = "BreathingExercise-Summary";
      //   }
      //   this.$router.replace({
      //     name: routeName,
      //     params: {
      //       fromRecovery: 1,
      //     },
      //   });
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
