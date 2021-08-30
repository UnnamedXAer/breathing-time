<template>
  <section class="exercise__houl_out">
    <app-counter :number="15" />
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
      counter: 15,
    };
  },
  methods: {
    count() {
      this.counter--;

      interval = setInterval(() => {
        if (this.counter === 0) {
          clearInterval(interval);
          interval = void 0;
          //   this.$store.commit(
          //     namespaceName("exercise", ExerciseMutations.Start)
          //   );
          //   console.log(this.$store.state.exercise.started);
          this.$router.replace({
            name: "BreathingExercise-Breathing",
          });

          return;
        }
        this.counter--;
      }, 1000);
    },
  },
  beforeRouteLeave(to) {
    console.log("beforeRouteLeave");
    if (to.name === "BreathingExercise-Breathing") {
      clearInterval(interval);
      interval = void 0;
      return;
    }

    if (this.counter < 4) {
      clearInterval(interval);
      interval = void 0;
      const ok = confirm("Cancel exercise?");
      if (!ok) {
        console.log("'START' - prevented from leaving");
        this.count();
      }
      return ok;
    }
  },
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.HoldingIn
    );
    interval = setInterval(this.count, 1000);
  },
});
</script>
