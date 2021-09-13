<template>
  <article class="summary">
    <h2 v-if="!fromRecovery">
      Go to
      <router-link :to="{ name: 'BreathingExercise-Start' }"
        >Breathing Exercise</router-link
      >
      and start your breathing.
    </h2>
    <h2 v-else-if="holdTimes.length === numberOfRounds">
      Congrats you finished your breathing!
    </h2>
    <h2 v-else-if="holdTimes.length === 0">You did not finish any rounds.</h2>
    <h2 v-else>Breathing finished.</h2>
    <table class="summary__results_table">
      <tr v-for="(time, idx) in holdTimes" :key="idx">
        <th>Round {{ idx + 1 }}</th>
        <td>{{ time }} s</td>
      </tr>
    </table>
    <p v-if="holdTimes.length > 1 && fromRecovery">
      Average Time:
      <strong style="font-size: 1.1em">{{ averageTime }}</strong> seconds.
    </p>
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

const exerciseStateProps = ["holdTimes", "numberOfRounds"] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

export default defineComponent({
  name: "BreathingExercise-Summary",
  props: {
    fromRecovery: Boolean,
  },
  computed: {
    ...(mapState<StoreState>("exercise", exerciseStateProps) as ComputedTypes),
    averageTime() {
      if (this.holdTimes.length === 0) {
        return 0;
      }

      return (
        this.holdTimes.reduce((pv, v) => pv + v) / this.holdTimes.length
      ).toFixed(3);
    },
  },
  mounted() {
    this.$store.commit(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.Stopped
    );
  },
});
</script>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary__results_table {
  font-size: 1.3em;
  border-spacing: 0;
}

.summary__results_table th {
  padding: 0.5rem 3rem;
}

.summary__results_table td {
  padding-right: 3rem;
}

.summary__results_table tr:nth-child(even) {
  background-color: rgb(240, 240, 240);
}
</style>
