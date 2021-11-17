<template>
  <article class="summary">
    <h2 v-if="!fromRecovery">
      {{ $t("ex.summary.go_to") }}
      <router-link :to="{ name: 'BreathingExercise-Start' }">
        {{ $t("ex.title") }}
      </router-link>
      {{ $t("ex.summary.and_start_breathing") }}
    </h2>
    <h2 v-else-if="holdTimes.length === numberOfRounds">
      {{ $t("ex.summary.congrats_finished") }}
    </h2>
    <h2 v-else-if="holdTimes.length === 0">
      {{ $t("ex.summary.no_rounds_finished") }}
    </h2>
    <h2 v-else>
      {{ $t("ex.summary.breathing_finished") }}
    </h2>
    <div v-if="holdTimes.length > 0">
      <div v-if="canShare" class="share_btn__wrapper">
        <button
          @click="share"
          ref="shareBtn"
          class="share_btn"
          :title="$t('ex.summary.share_results')"
        >
          <app-share-svg />
        </button>
      </div>
      <table class="summary__results_table" data-test="summary-results-table">
        <tr v-for="(time, idx) in holdTimes" :key="idx">
          <th>
            {{ $t("ex.summary.round_with_num", [idx + 1]) }}
          </th>
          <td>{{ time }} s</td>
        </tr>
      </table>
    </div>
    <p
      class="average"
      v-if="holdTimes.length > 1"
      v-html="$t('ex.summary.averageTime', [averageTime])"
    />
  </article>
</template>

<script lang="ts">
import {
  ExerciseModuleMap,
  ExerciseMutations,
} from "@/store/modules/exercise/types";
import ShareSvgVue from "../components/svg/ShareSvg.vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { StoreState } from "@/store/types";
import { namespaceName } from "@/store/createStore";

const exerciseStateProps = ["holdTimes", "numberOfRounds"] as const;

type ComputedTypes = ExerciseModuleMap<typeof exerciseStateProps>;

export default defineComponent({
  name: "BreathingExercise-Summary",
  components: {
    appShareSvg: ShareSvgVue,
  },

  props: {
    fromRecovery: Boolean,
  },

  data() {
    return {
      canShare: !!navigator.clipboard || !!navigator.share,
      copiedResults: false,
    };
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

  watch: {
    copiedResults() {
      (this.$refs.shareBtn as HTMLButtonElement).classList.remove("animation");
      void (this.$refs.shareBtn as HTMLButtonElement).offsetWidth;
      (this.$refs.shareBtn as HTMLButtonElement).classList.add("animation");
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
        console.info(
          "Sharing API is not available in your browser. We will copy your results to clipboard."
        );
        const url = document.location.protocol + "//" + document.location.host;
        text = "Breathing Exercise Results\n\n" + text;
        text += "\n\nTry yourself on " + url;

        navigator.clipboard
          .writeText(text)
          .then(() => {
            this.copiedResults = !this.copiedResults;
          })
          .catch((err: Error) => {
            console.log("Could not insert text to your clipboard due to:", err);
            console.log("You may copy it from below:\n");
            console.log(text);
          });
      }
    },
  },

  mounted() {
    this.$store.commit(namespaceName("exercise", ExerciseMutations.Finish));
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

.average strong {
  font-size: 1.1em;
}

.share_btn__wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
}

.share_btn {
  padding: 1px;
  width: 2rem;
  height: 2rem;
  background-color: inherit;
  border: rgba(var(--dark-rgb), 0.6) 1px solid;
  border-radius: 10%;
  opacity: 0.4;
  cursor: pointer;
  position: relative;
}

.share_btn svg {
  width: 100%;
  height: 100%;
}

.share_btn:hover,
.share_btn:active {
  opacity: 0.9;
}

.share_btn {
  transition: opacity 200ms;
}

.share_btn.animation {
  animation: copied 800ms;
}

@keyframes copied {
  from {
    opacity: 0.9;
  }
  to {
    opacity: 0.9;
  }
}

.share_btn.animation::before {
  content: "Copied";
  position: absolute;
  bottom: -1rem;
  right: 0;
  opacity: 0;
  animation: copied 800ms;
}

@keyframes copied {
  0% {
    color: rgb(219, 248, 185);
    opacity: 0.7;
  }

  30% {
    opacity: 1;
    color: green;
  }

  80% {
    opacity: 1;
    color: green;
  }

  100% {
    color: rgb(219, 248, 185);
    opacity: 0.7;
  }
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
