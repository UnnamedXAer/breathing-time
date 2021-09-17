<template>
  <article class="round_phases">
    <h2>{{ $t("ex.phases.title") }}</h2>
    <ol style="line-height: 2em">
      <li>{{ $t("ex.phases.breathing", { breathsPerRound }) }}</li>
      <li>{{ $t("ex.phases.hold") }}</li>
      <li>{{ $t("ex.phases.hold", { recoveryTime }) }}</li>
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
