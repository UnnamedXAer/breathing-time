<template>
  <section class="exercise__start">
    <section style="display: flex; justify-content: center; margin: 3rem auto">
      <app-button
        @click="startExercise"
        v-if="counter === countdountTime"
        style="padding-left: 3rem; padding-right: 3rem"
        >START</app-button
      >
      <div v-else class="exercise__start__get_ready">
        <p>Get Ready!</p>
        <p>{{ counter > 0 ? counter : "Go" }}</p>
      </div>
    </section>
    <hr v-if="counter === countdountTime" />
    <app-exercise-instructions v-if="counter === countdountTime" />
  </section>
  <teleport to="body">
    <app-modal
      v-if="showModal"
      content="Cancel exercise?"
      title="Warning!"
      :dismiss="rejectCancelExercise"
      :actions="[
        {
          label: 'Yes',
          handler: confirmCancelExercise,
        },
        {
          label: 'No',
          handler: rejectCancelExercise,
        },
      ]"
    />
  </teleport>
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";
import ModalVue from "../modal/Modal.vue";
import ExerciseInstructionsVue from "./ExerciseInstructions.vue";
import { RouteRecordName } from "vue-router";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Start",
  components: {
    appButton: ButtonVue,
    appExerciseInstructions: ExerciseInstructionsVue,
    appModal: ModalVue,
  },
  data() {
    const countdountTime = 4;
    return {
      countdountTime,
      counter: countdountTime,
      showModal: false,
      allowNavigation: false,
      routeToNavigate: null as RouteRecordName | null,
    };
  },

  watch: {
    allowNavigation(val: boolean) {
      if (val && this.routeToNavigate) {
        this.$router.replace({
          name: this.routeToNavigate,
          params: {
            allowNavigation: 1,
          },
        });
      }
    },
  },

  methods: {
    startExercise() {
      this.counter--;

      interval = setInterval(() => {
        if (this.counter === 0) {
          clearInterval(interval);
          interval = void 0;
          this.$store.commit(
            namespaceName("exercise", ExerciseMutations.Start)
          );
          console.log(this.$store.state.exercise.started);
          this.$router.replace({
            name: "BreathingExercise-Breathing",
          });

          return;
        }
        this.counter--;
      }, 1000);
    },
    askBeforeLeave(routeName: RouteRecordName | null) {
      this.routeToNavigate = routeName;
      this.showModal = true;
    },
    confirmCancelExercise() {
      console.log("confirming");
      this.allowNavigation = true;
    },
    rejectCancelExercise() {
      console.log("rejecting");
      this.allowNavigation = false;
      this.routeToNavigate = null;
      this.showModal = false;
      this.startExercise();
    },
  },
  beforeRouteLeave(to) {
    console.log("beforeRouteLeave");
    if (to.name === "BreathingExercise-Breathing") {
      clearInterval(interval);
      interval = void 0;
      return;
    }

    if (to.params.allowNavigation) {
      return true;
    }

    if (this.counter < this.countdountTime) {
      clearInterval(interval);
      interval = void 0;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.askBeforeLeave(to.name!);

      return false;
    }
  },
});
</script>

<style scoped>
.exercise__start__get_ready {
  text-align: center;
  font-variant: small-caps;
  font-size: 10vh;
}
</style>
