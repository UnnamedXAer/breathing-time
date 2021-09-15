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
    <button @click="share">share</button>
    <table class="summary__results_table">
      <tr v-for="(time, idx) in holdTimes" :key="idx">
        <th>Round {{ idx + 1 }}</th>
        <td>{{ time }} s</td>
      </tr>
    </table>
    <p class="average" v-if="holdTimes.length > 1 && fromRecovery">
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
        return "0";
      }

      return (this.holdTimes.reduce((pv, v) => pv + v) / this.holdTimes.length)
        .toFixed(3)
        .replace(/((\.0+)|(0+))$/g, "");
    },
  },

  methods: {
    share() {
      let text = "";
      this.holdTimes.forEach((v, idx) => {
        if (idx > 0) {
          text += "\n";
        }
        text += `Round ${idx + 1}:\t${v} s`;
      });

      if (this.holdTimes.length > 1) {
        text += `\n\nAverage time: ${this.averageTime} seconds.`;
      }
      if (navigator.share) {
        navigator
          .share({
            url: "/",
            title: "Breathing Exercise Results",
            text,
          })
          .catch((err: Error) => {
            console.log("sharing failed", err);
          });
      } else {
        console.info("sharing API is not available in your browser");
        const url = document.location.protocol + "//" + document.location.host;
        text = "Breathing Exerciese Results\n\n" + text;
        text += "\n\nTry yourself on " + url;

        console.log(text);
        navigator.clipboard
          .writeText(text)
          .then((args) => {
            console.log("copied", args);
          })
          .catch((err: Error) => {
            console.log("could not insert text to your clipboard", err);
          });
      }
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

.summary h2,
.average {
  text-align: center;
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

@media screen and (max-width: 350px) {
  .summary__results_table th {
    padding-left: 1rem;
  }
  .summary__results_table td {
    padding-right: 1rem;
  }
}
</style>
