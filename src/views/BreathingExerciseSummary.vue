<template>
  <article class="summary">
    <h2 v-if="!fromHoldingIn">
      Go to
      <router-link :to="{ name: 'BreathingExercise-Start' }"
        >Breathing Exercise</router-link
      >
      and start your breathing.
    </h2>
    <h2 v-else-if="holdTimes.length === rounds">
      Congrats you finished your breathing!
    </h2>
    <h2 v-else-if="holdTimes.length === 0">You did not finish any rounds.</h2>
    <h2 v-else>Breathing finished.</h2>
    <table>
      <tr v-for="(time, idx) in holdTimes" :key="idx">
        <th>Round {{ idx + 1 }}</th>
        <td>{{ time }} s</td>
      </tr>
    </table>
  </article>
</template>

<script lang="ts">
import { namespaceName, StoreState } from "@/store";
import {
  ExerciseModuleMap,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { defineComponent } from "vue";
import { mapState } from "vuex";

const exerciseStateProps = ["holdTimes", "maxRounds"] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

export default defineComponent({
  name: "BreathingExercise-Summary",
  props: {
    fromHoldingIn: Number,
  },
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
  },
  mounted() {
    console.log("fromHoldingIn", this.fromHoldingIn);
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.Stopped
    );
  },
});
</script>
