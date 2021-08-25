<template>
  <app-button @click="startExercise" v-if="counter === 4">START</app-button>
  <div v-else>
    <h1>{{ counter }}</h1>
  </div>
</template>

<script lang="ts">
import { ExerciseStoreMutations } from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Start",
  components: { appButton: ButtonVue },
  data() {
    return {
      counter: 4,
    };
  },
  methods: {
    startExercise() {
      this.counter--;

      interval = setInterval(() => {
        if (this.counter === 1) {
          clearInterval(interval);
          interval = void 0;
          console.log("about to replace");
          this.$store.commit(ExerciseStoreMutations.StartExercise);
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
        this.startExercise();
      }
      return ok;
    }
  },
});
</script>
