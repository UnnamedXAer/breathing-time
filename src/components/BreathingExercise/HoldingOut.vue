<template>
  <section class="exercise__houl_out">
    <app-alert v-if="showAreYouThere" mode="warning" :dismiss="dismissAlert"
      >Are you still there?</app-alert
    >
    <app-counter :number="counter" />
    <app-button @click="stop">NEXT Round</app-button>
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
    };
  },
  methods: {
    count() {
      if (this.counter > 600) {
        this.showAreYouThere = true;
      }

      this.counter++;
    },
    stop() {
      clearInterval(interval);
      interval = void 0;
      this.$store.commit(
        namespaceName("exercise", ExerciseMutations.AddHoldTime),
        this.counter
      );
      this.$router.replace({
        name: "BreathingExercise-HouldingIn",
      });
    },
    dismissAlert() {
      this.showAreYouThere = false;
    },
  },
  beforeRouteLeave(to) {
    console.log("beforeRouteLeave");
    if (to.name === "BreathingExercise-HouldingIn") {
      this.stop();
      return;
    }

    const ok = confirm("Cancel exercise?");
    if (!ok) {
      console.log("'holding out' - decided to stay :)");
    } else {
      clearInterval(interval);
      interval = void 0;
    }

    return ok;
  },
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.HoldingOut
    );
    interval = setInterval(this.count, 1000);
  },
});
</script>
