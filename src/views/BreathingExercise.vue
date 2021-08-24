<template>
  <div class="breathing_exercise">
    <h1>Breathing Exercise</h1>
    <app-counter></app-counter>
    <app-actions
      :roundState="currentRoundState"
      @start="startBreathingExercise"
      @next="finishRound"
      @stop="stopBreathingExercise"
    ></app-actions>
  </div>
</template>

<script lang="ts">
import ActionsVue from "@/components/BreathingExercise/Actions.vue";
import CounterVue from "@/components/BreathingExercise/counter/Counter.vue";
import { RoundState } from "@/types/breath";
import { TimeoutReturn } from "@/types/timeout";
import { defineComponent } from "vue";

let holdOutInterval: TimeoutReturn = null;
let holdInTimeout: TimeoutReturn = null;
let breathTiemout: TimeoutReturn = null;

export default defineComponent({
  name: "BreathingExercise",
  components: {
    appCounter: CounterVue,
    appActions: ActionsVue,
  },

  data() {
    return {
      finished: false,
      rounds: 3,
      breathsInRound: 3,
      breathInAfterRoundTime: 7,
      currentRound: 0,
      currentRoundState: RoundState.Stopped,
      breathCount: 0,
      breathTime: 1.4 * 1000,
      breathOutTime: 0,
      breathOutSeconds: 0,
      breathInTime: 7,
      holdTimes: [] as number[],
    };
  },

  watch: {
    finished() {
      this.$nextTick(() => {
        console.log(holdOutInterval, holdInTimeout, breathTiemout);
      });
    },
  },

  methods: {
    startBreathingExercise() {
      console.log("start exercise");
      this.holdTimes = [];
      this.breathOutTime = 0;
      this.currentRound = 0;
      this.breathCount = 0;

      this.startBreathing();
    },
    stopBreathingExercise() {
      console.log("stop exercise");
      if (holdInTimeout) {
        clearTimeout(holdInTimeout);
        holdInTimeout = null;
      } else if (breathTiemout) {
        clearTimeout(breathTiemout);
        breathTiemout = null;
      }

      if (this.currentRoundState === RoundState.HoldingOut) {
        this.holdTimes.push((Date.now() - this.breathOutTime) / 1000);
      }

      this.finished = true;
      this.$router.replace({
        name: "BreathingExerciseSummary",
      });
    },
    startBreathing() {
      console.log("start Breathing");

      this.currentRound++;
      this.currentRoundState = RoundState.Breathing;
      this.breathCount = 0;

      setTimeout(this.breath, this.breathTime);
    },
    breath() {
      this.breathCount++;
      if (this.breathCount < this.breathsInRound) {
        breathTiemout = setTimeout(this.breath, this.breathTime);
        return;
      }

      this.startHoldingOut();
    },
    startHoldingOut() {
      console.log("start Holding Out");

      this.breathOutTime = Date.now();
      this.currentRoundState = RoundState.HoldingOut;
      this.breathOutSeconds = 0;

      holdOutInterval = setInterval(() => {
        this.breathOutSeconds++;
      }, 1000);
    },
    startHoldingIn() {
      console.log("start Holding In");

      this.currentRoundState = RoundState.HoldingIn;
      this.breathInTime = this.breathInAfterRoundTime;
      const holdInCallback = () => {
        if (this.breathInTime === 0) {
          if (this.holdTimes.length < this.rounds) {
            this.startBreathing();
            return;
          }
          this.stopBreathingExercise();
          return;
        }
        this.breathInTime--;
        holdInTimeout = setTimeout(holdInCallback, 1000);
      };
      holdInTimeout = setTimeout(holdInCallback, 1000);
    },
    finishRound() {
      console.log("finish round #", this.holdTimes.length + 1);

      if (holdOutInterval) {
        clearInterval(holdOutInterval);
        holdOutInterval = null;
      }

      this.holdTimes.push((Date.now() - this.breathOutTime) / 1000);
      this.startHoldingIn();
    },
  },
});
</script>
