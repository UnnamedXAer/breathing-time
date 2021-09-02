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
  <!-- <app-leave-exercise-confirm
    v-if="showModal"
    :onCancel="preventCancelExercise"
    :onConfirm="confirmCancelExercise"
  /> -->
</template>

<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { defineComponent } from "vue";
import ButtonVue from "../ui/Button.vue";
import ExerciseInstructionsVue from "./ExerciseInstructions.vue";
// import { RouteRecordName } from "vue-router";
// import LeaveExerciseConfirmVue from "./LeaveExerciseConfirm.vue";

let interval: import("@/types/timeout").TimeoutReturn = void 0;
export default defineComponent({
  name: "BreathingExercise-Start",
  components: {
    appButton: ButtonVue,
    appExerciseInstructions: ExerciseInstructionsVue,
    // appLeaveExerciseConfirm: LeaveExerciseConfirmVue,
  },
  data() {
    const countdountTime = 0;
    return {
      countdountTime,
      counter: countdountTime,
      //   showModal: false,
      //   allowNavigation: false,
      //   routeToNavigate: null as RouteRecordName | null,
    };
  },

  //   watch: {
  //     allowNavigation(val: boolean) {
  //       if (val && this.routeToNavigate) {
  //         this.$router.replace({
  //           name: this.routeToNavigate,
  //           params: {
  //             allowNavigation: 1,
  //           },
  //         });
  //       }
  //     },
  //   },

  methods: {
    startExercise() {
      this.counter--;

      interval = setInterval(() => {
        if (this.counter <= 0) {
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
    // askBeforeLeave(routeName: RouteRecordName | null) {
    //   this.routeToNavigate = routeName;
    //   this.showModal = true;
    // },
    // confirmCancelExercise() {
    //   this.allowNavigation = true;
    // },
    // preventCancelExercise() {
    //   this.allowNavigation = false;
    //   this.routeToNavigate = null;
    //   this.showModal = false;
    //   this.startExercise();
    // },
  },
  //   beforeRouteLeave(to) {
  //     if (to.name === "BreathingExercise-Breathing") {
  //       clearInterval(interval);
  //       interval = void 0;
  //       return;
  //     }

  //     if (to.params.allowNavigation) {
  //       return true;
  //     }

  //     if (this.counter < this.countdountTime) {
  //       clearInterval(interval);
  //       interval = void 0;

  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       this.askBeforeLeave(to.name!);

  //       return false;
  //     }
  //   },
});
</script>

<style scoped>
.exercise__start__get_ready {
  text-align: center;
  font-variant: small-caps;
  font-size: 10vh;
}
</style>
