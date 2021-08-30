<template>
  <div class="breathing_exercise">
    <h1>Breathing Exercise</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BreathingExercise",

  methods: {
    // startBreathingExercise() {
    //   console.log("start exercise");
    //   this.$router.push({
    //     replace: true,
    //     name: "Exercise-Breathing",
    //   });
    //   this.holdTimes = [];
    //   this.breathOutTime = 0;
    //   this.currentRound = 0;
    //   this.breathCount = 0;
    //   this.startBreathing();
    // },
    // stopBreathingExercise() {
    //   console.log("stop exercise");
    //   if (holdInTimeout) {
    //     clearTimeout(holdInTimeout);
    //     holdInTimeout = null;
    //   } else if (breathTiemout) {
    //     clearTimeout(breathTiemout);
    //     breathTiemout = null;
    //   }
    //   if (this.currentRoundState === RoundState.HoldingOut) {
    //     this.holdTimes.push((Date.now() - this.breathOutTime) / 1000);
    //   }
    //   this.finished = true;
    //   this.$router.replace({
    //     name: "BreathingExerciseSummary",
    //   });
    // },
    // startBreathing() {
    //   console.log("start Breathing");
    //   this.currentRound++;
    //   this.currentRoundState = RoundState.Breathing;
    //   this.breathCount = 0;
    //   setTimeout(this.breath, this.breathTime);
    // },
    // breath() {
    //   this.breathCount++;
    //   if (this.breathCount < this.breathsInRound) {
    //     breathTiemout = setTimeout(this.breath, this.breathTime);
    //     return;
    //   }
    //   this.startHoldingOut();
    // },
    // startHoldingOut() {
    //   console.log("start Holding Out");
    //   this.breathOutTime = Date.now();
    //   this.currentRoundState = RoundState.HoldingOut;
    //   this.breathOutSeconds = 0;
    //   holdOutInterval = setInterval(() => {
    //     this.breathOutSeconds++;
    //   }, 1000);
    // },
    // startHoldingIn() {
    //   console.log("start Holding In");
    //   this.currentRoundState = RoundState.HoldingIn;
    //   this.breathInTime = this.breathInAfterRoundTime;
    //   const holdInCallback = () => {
    //     if (this.breathInTime === 0) {
    //       if (this.holdTimes.length < this.rounds) {
    //         this.startBreathing();
    //         return;
    //       }
    //       this.stopBreathingExercise();
    //       return;
    //     }
    //     this.breathInTime--;
    //     holdInTimeout = setTimeout(holdInCallback, 1000);
    //   };
    //   holdInTimeout = setTimeout(holdInCallback, 1000);
    // },
    // finishRound() {
    //   console.log("finish round #", this.holdTimes.length + 1);
    //   if (holdOutInterval) {
    //     clearInterval(holdOutInterval);
    //     holdOutInterval = null;
    //   }
    //   this.holdTimes.push((Date.now() - this.breathOutTime) / 1000);
    //   this.startHoldingIn();
    // },
  },
});
</script>
