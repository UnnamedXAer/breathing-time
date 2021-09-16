<template>
  <article class="round_phases">
    <h2>Round phases</h2>
    <ol style="line-height: 2em">
      <li>Breathing - take {{ breathsPerRound }} deep breaths.</li>
      <li>
        Breath hold - exhale then stop breathing until you feel urge to inhale.
      </li>
      <li>
        Recovery - inhale deeply and hold breath for {{ recoveryTime }} seconds.
      </li>
    </ol>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    breathsPerRound() {
      return this.$store.state.exercise.breathsPerRound;
    },
    recoveryTime() {
      return this.$store.state.exercise.recoveryTime;
    },
  },
});
</script>
